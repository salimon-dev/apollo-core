import { Request, Response } from "express";
import * as yup from "yup";
import { DocumentsModel } from "../../models/document";

const validationSchema = yup.object({
  page: yup.number().optional().default(1),
  pageSize: yup.number().optional().default(15),
});

export default async function search(req: Request, res: Response) {
  try {
    const { page, pageSize } = validationSchema.validateSync(req.query, { abortEarly: false });
    const offset = (page - 1) * pageSize;
    const data = await DocumentsModel.find({}).skip(offset).limit(pageSize);
    const count = await DocumentsModel.count({});
    res.send({
      data,
      meta: { count, page, pageSize },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "some error" });
  }
}
