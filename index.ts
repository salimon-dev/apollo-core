import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
import documents from "./methods/documents/routes";
import { now } from "./utils/time";

mongoose.connect(`${process.env["MONGO_URI"] || "none"}/${process.env["DB_NAME"] || "none"}`).then(() => {
  console.log("connected to the database");
});

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send({
    name: "apollo",
    version: 1,
    time: now(),
  });
});

app.use("/documents", documents);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
