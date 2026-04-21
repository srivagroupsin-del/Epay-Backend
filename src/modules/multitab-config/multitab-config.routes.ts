import { Router } from "express";
import * as c from "./multitab-config.controller";

const r = Router();

/* CONFIG */
r.post("/", c.createConfig);
r.get("/", c.getConfigs);

/* 🔥 MAIN */
r.get("/fields", c.getFieldsByHierarchy);

r.get("/:id", c.getConfigById);
r.put("/:id", c.updateConfig);
r.delete("/:id", c.deleteConfig);

export default r;
