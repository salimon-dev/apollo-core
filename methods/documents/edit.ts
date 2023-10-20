import { Request, Response } from "express";
import { DocumentsModel } from "../../models/document";
import { now } from "../../utils/time";
import * as yup from "yup";

function validate(req: Request, res: Response) {
  const validationSchema = yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
  });
  try {
    const body = validationSchema.validateSync(req.body, { abortEarly: false });
    return body;
  } catch (e) {
    const error = e as yup.ValidationError;
    res.status(400).send(error.inner.map((item) => ({ path: item.path, message: item.message })));
  }
}
export default async function edit(req: Request, res: Response) {
  const body = validate(req, res);
  if (!body) return; // validations error
  const { id } = req.params as { id: string };
  const record = await DocumentsModel.findById(id);
  if (!record) {
    res.status(404).send({ message: "entity not found" });
    return;
  }
  record.set({ ...body, updatedAt: now() });
  await record.save();
  res.send(record);
}
