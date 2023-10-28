import { Document, Schema, model } from "mongoose";
import { IEntity } from "./common";

export interface IDocument extends IEntity {
  title: string;
  body: string;
  vector_openai: number[];
  openai_version: string;
}

const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  vector_openai: { type: [Number], required: true },
  openai_version: { type: String, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

export const DocumentsModel = model<IDocument>("document", DocumentSchema);
export type DocumentDoc = IDocument & Document;
