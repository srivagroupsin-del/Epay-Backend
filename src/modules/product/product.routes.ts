import { Router } from "express";
import * as ctrl from "./product.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

router.put("/bulk/mappings", ctrl.bulkUpdateProductMapping);

router.get("/mappings", ctrl.getProductMappings);

router.post("/tax/create", ctrl.createProductTax);
router.get("/tax", ctrl.getProductTax);
router.get("/tax/:id", ctrl.getProductTaxById);
router.put("/tax/:id", ctrl.updateProductTax);
router.delete("/tax/:id", ctrl.deleteProductTax);

router.get("/", ctrl.getProducts);

router.post(
  "/",
  uploadTo("products").single("image"),
  ctrl.createProduct
);

router.get("/:id/qr-pdf", ctrl.generateProductQrPdf);
router.put("/:id/mappings", ctrl.updateProductMappings);
router.put("/:id/mrp", ctrl.updateMRP);


router.get("/:id", ctrl.getProductById);

router.put(
  "/:id",
  uploadTo("products").single("image"),
  ctrl.updateProduct
);

router.delete("/:id", ctrl.deleteProduct);

export default router;