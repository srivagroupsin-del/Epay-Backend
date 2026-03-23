import { Router } from "express";
import * as ctrl from "./category.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

/* ================= GET ================= */

router.get("/", ctrl.getCategories);
router.get("/primary", ctrl.getPrimaryCategories);
router.get("/secondary/:parentId", ctrl.getSecondaryCategories);
router.get("/unselected/:primaryId", ctrl.getUnselectedSecondaryCategories);

/* ================= CATEGORY TAX ================= */

router.post("/tax/create", ctrl.createCategoryTax);
router.get("/tax", ctrl.getCategoryTax);
router.get("/tax/:id", ctrl.getCategoryTaxById);
router.put("/tax/:id", ctrl.updateCategoryTax);
router.delete("/tax/:id", ctrl.deleteCategoryTax);

/* ================= CREATE ================= */

router.post("/", uploadTo("categories").single("image"), ctrl.createCategory);

/* ================= BULK OPERATIONS ================= */

router.put("/bulk/make-secondary", ctrl.bulkToSecondary);
router.put("/bulk/make-primary", ctrl.bulkToPrimary);
router.put("/bulk/remap-secondary", ctrl.bulkRemapSecondary);

/* ================= DYNAMIC ROUTES (LAST) ================= */

router.put("/:id", uploadTo("categories").single("image"), ctrl.updateCategory);
router.delete("/:id", ctrl.deleteCategory);
router.put("/:id/make-secondary", ctrl.convertToSecondary);
router.put("/:id/make-primary", ctrl.convertToPrimary);

export default router;