import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
import documents from "./methods/documents/routes";

mongoose.connect(process.env["MONGO_URI"] || "none").then(() => {
  console.log("connected to the database");
});

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/documents", documents);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
