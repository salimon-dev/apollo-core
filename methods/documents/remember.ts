import { Request, Response } from "express";
import * as yup from "yup";
import { openAiEmbed } from "../../utils/openai";
import { MongoClient } from "mongodb";

function validate(req: Request, res: Response) {
  const validationSchema = yup.object({
    limit: yup.number().optional().default(6),
    term: yup.string().required(),
  });
  try {
    const body = validationSchema.validateSync(req.query, { abortEarly: false });
    return body;
  } catch (e) {
    const error = e as yup.ValidationError;
    res.status(400).send(error.inner.map((item) => ({ path: item.path, message: item.message })));
  }
}
export default async function remember(req: Request, res: Response) {
  const client = new MongoClient(process.env["MONGO_URI"] || "");
  const query = validate(req, res);
  if (!query) return; // validations error
  const vector = await openAiEmbed(query.term);
  await client.connect();
  const db = client.db(process.env["DB_NAME"] || "");
  const collection = db.collection("documents");
  const records = await collection
    .aggregate([
      {
        $vectorSearch: {
          queryVector: vector,
          path: "vector_openai",
          numCandidates: 100,
          limit: query.limit,
          index: "openai",
        },
      },
    ])
    .toArray();
  await client.close();
  res.send({
    records,
  });
}
