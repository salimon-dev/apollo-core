import { MongoClient, Document, Db } from "mongodb";

export async function getClient() {
  const client = new MongoClient(process.env["MONGO_URI"] || "");
  await client.connect();
  return client;
}

export async function getDB() {
  const client = await getClient();
  return { db: client.db(process.env["DB_NAME"] || ""), client };
}

export async function getCollection<T>(name: string, db: Db) {
  return db.collection<T & Document>(name);
}
