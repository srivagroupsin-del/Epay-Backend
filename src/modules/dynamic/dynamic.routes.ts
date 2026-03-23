import { Router } from "express";
import * as ctrl from "./dynamic.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

/* ================= PAGE ================= */
router.post("/pages", ctrl.createPage);
router.get("/pages", ctrl.getPages);
router.put("/pages/:id", ctrl.updatePage);
router.delete("/pages/:id", ctrl.deletePage);

/* ================= TABLE ================= */
router.post("/tables", ctrl.createTable);
router.get("/tables/page/:pageId", ctrl.getTablesByPage);
router.put("/tables/:id", ctrl.updateTable);
router.delete("/tables/:id", ctrl.deleteTable);

/* ================= FIELD ================= */
router.post("/fields", ctrl.createField);
router.get("/fields/table/:tableId", ctrl.getFieldsByTable);
router.put("/fields/:id", ctrl.updateField);
router.delete("/fields/:id", ctrl.deleteField);

/* ================= OPTIONS ================= */
router.post("/options", ctrl.addOption);
router.get("/options/field/:fieldId", ctrl.getOptionsByField);
router.put("/options/:id", ctrl.updateOption);
router.delete("/options/:id", ctrl.deleteOption);

/* ================= RECORDS ================= */
router.post("/records/:tableId", ctrl.submitRecord);
router.get("/records/table/:tableId", ctrl.getRecordsByTable);
router.put("/records/:id", ctrl.updateRecord);
router.delete("/records/:id", ctrl.deleteRecord);

export default router;
