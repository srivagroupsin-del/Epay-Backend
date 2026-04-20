import { Router } from "express";
import * as f from "./multitab-fields.controller";

const r = Router();

/* FIELDS */
r.post("/multitab-fields", f.createField);
r.get("/multitab-fields", f.getFields);
r.get("/multitab-fields/:id", f.getFieldById);
r.put("/multitab-fields/:id", f.updateField);
r.delete("/multitab-fields/:id", f.deleteField);

export default r;
