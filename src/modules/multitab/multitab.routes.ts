import { Router } from "express";
import * as ctrl from "./multitab.controller";
import { uploadTo, uploadMultitabFiles } from "../../config/multer";

const router = Router();

/* ================= MENUS ================= */
router.get("/menus", ctrl.getMenus);
router.get("/menus/:id", ctrl.getMenuById);
router.post("/menus", ctrl.createMenu);
router.put("/menus/:id", ctrl.updateMenu);
router.delete("/menus/:id", ctrl.deleteMenu);

/* ================= TABS ================= */
router.get("/tabs", ctrl.getTabs);
router.get("/tabs/:id", ctrl.getTabById);
router.post("/tabs", uploadTo("multitab/tabs").single("image"), ctrl.createTab);
router.put("/tabs/:id", uploadTo("multitab/tabs").single("image"), ctrl.updateTab);
router.delete("/tabs/:id", ctrl.deleteTab);

/* ================= CHECKBOXES ================= */
router.get("/checkboxes", ctrl.getCheckboxes);
router.get("/checkboxes/:id", ctrl.getCheckboxById);
router.post("/checkboxes", uploadMultitabFiles().array("files", 20), ctrl.createCheckbox);
router.put("/checkboxes/:id", uploadMultitabFiles().array("files", 20), ctrl.updateCheckbox);
router.delete("/checkboxes/:id", ctrl.deleteCheckbox);

/* ================= MAPPINGS ================= */
router.get("/mappings", ctrl.getMappings);
router.get("/mappings/tab/:tabId", ctrl.getMappingsByTabId);
router.post("/mappings", ctrl.updateTabMappings);

/* ================= PREVIEW ================= */
router.get("/preview", ctrl.getPreviewData);

/* ================= ASSOCIATIONS ================= */
router.get("/associations", ctrl.getMenuAssociations);
router.post("/associations", ctrl.saveMenuAssociations);

export default router;
