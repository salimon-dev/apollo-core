import { Request, Response } from "express";
import { DocumentsModel } from "../../models/document";
export default async function remove(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const record = await DocumentsModel.findById(id);
  if (!record) {
    res.status(404).send({ message: "entity not found" });
    return;
  }
  await record.deleteOne();
  res.send(record);
}
