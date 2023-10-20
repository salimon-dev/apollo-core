import { Document, Schema, model } from "mongoose";
import { IEntity } from "./common";

export interface IDocument extends IEntity {
  title: string;
  body: string;
  vector: number[];
  vector_method: string;
}

const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  vector: { type: [Number], required: true },
  vector_method: { type: String, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

export const DocumentsModel = model<IDocument>("document", DocumentSchema);
export type DocumentDoc = IDocument & Document;
