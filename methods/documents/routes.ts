import express from "express";
import create from "./create";
import edit from "./edit";
import search from "./search";
import get from "./get";
import remove from "./remove";

const routes = express.Router();

routes.post("/", create);
routes.post("/:id", edit);
routes.get("/", search);
routes.get("/:id", get);
routes.delete("/:id", remove);

export default routes;
