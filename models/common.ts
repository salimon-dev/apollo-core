import { ObjectId } from "mongodb";

export interface IEntity {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
}
