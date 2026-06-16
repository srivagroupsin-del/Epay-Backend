import { Router } from "express";
import { taxController } from "./tax.controller";

const router = Router();

/* ================== TAX ================== */
router.post("/", taxController.createTax);
router.get("/", taxController.getAllTaxes);
router.get("/:id", taxController.getTaxById);
router.put("/:id", taxController.updateTax);
router.delete("/:id", taxController.deleteTax);

/* ================== TAX FIELDS ================== */
router.post("/fields", taxController.createTaxField);
router.get("/fields", taxController.getTaxFields);
router.get("/fields/:id", taxController.getTaxFieldById);
router.put("/fields/:id", taxController.updateTaxField);
router.delete("/fields/:id", taxController.deleteTaxField);

/* ================== TAX ASSIGNMENTS ================== */
router.post("/assignments", taxController.createTaxAssignment);
router.get("/assignments", taxController.getTaxAssignments);
router.delete("/assignments/:id", taxController.deleteTaxAssignment);

/* ================== TAX VALUES ================== */
router.post("/values", taxController.createTaxValue);
router.get("/values", taxController.getTaxValues);

/* ================== PRODUCT TAX PREFILL ================== */
router.get("/prefill/product", taxController.getProductTaxPrefill);

export default router;
