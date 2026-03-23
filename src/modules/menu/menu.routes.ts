import { Router } from "express";
import * as ctrl from "./menu.controller";

const router = Router();

/* ================= MENU TITLE ================= */
router.post("/titles", ctrl.createMenuTitle);
router.get("/titles", ctrl.getMenuTitles);
router.put("/titles/:id", ctrl.updateMenuTitle);
router.put("/titles/:id/status", ctrl.updateMenuTitleStatus);
router.delete("/titles/:id", ctrl.deleteMenuTitle);

/* ================= MENU FIELD ================= */
router.post("/fields", ctrl.createMenuField);
router.get("/fields", ctrl.getAllMenuFields);
router.put("/fields/:id", ctrl.updateMenuField);
router.delete("/fields/:id", ctrl.deleteMenuField);

/* ================= MENU PAGE ================= */
router.post("/pages", ctrl.createMenuPage);
router.get("/pages", ctrl.getMenuPages);
router.put("/pages/:id", ctrl.updateMenuPage);
router.delete("/pages/:id", ctrl.deleteMenuPage);

/* ================= MENU MAPPING ================= */
router.post("/mapping", ctrl.mapMenuFieldToTitle);
router.get("/mapping/:menuTitleId", ctrl.getMappedMenuFields);
router.put("/mapping/:id", ctrl.updateMenuMapping);
router.delete("/mapping/:id", ctrl.deleteMenuMapping);

export default router;
