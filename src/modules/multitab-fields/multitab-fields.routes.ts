import { Router } from "express";
import * as f from "./multitab-fields.controller";

const r = Router();

/* FIELDS */
r.get("/ui", f.getFieldsForUI);
r.post("/", f.createField);
r.get("/", f.getFields);
r.get("/:id", f.getFieldById);
r.put("/:id", f.updateField);
r.delete("/:id", f.deleteField);

export default r;
