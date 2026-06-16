import { Router } from "express";
import * as ctrl from "./product.controller";
import { uploadTo } from "../../config/multer";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

router.get("/qrc/:barcode", ctrl.getQrCodeImage);
router.get("/view/:barcode", ctrl.viewProductInfo);
router.get("/public/barcode/:barcode", ctrl.getProductByBarcode);
router.get("/barcode/:barcode", authMiddleware, ctrl.getProductByBarcode);
router.get("/qr/:barcode", authMiddleware, ctrl.getProductByBarcode);

router.put("/bulk/mappings", ctrl.bulkUpdateProductMapping);

router.get("/mappings", ctrl.getProductMappings);
router.get("/structure", ctrl.getProductStructure);

router.post("/tax/create", ctrl.createProductTax);
router.get("/tax", ctrl.getProductTax);
router.get("/tax/:id", ctrl.getProductTaxById);
router.put("/tax/:id", ctrl.updateProductTax);
router.delete("/tax/:id", ctrl.deleteProductTax);

router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProductById);

router.post("/", uploadTo("products").single("image"), ctrl.createProduct);

router.get("/:id/qr-pdf", ctrl.generateProductQrPdf);
router.post("/:id/generate-barcode", authMiddleware, ctrl.generateProductBarcode);
router.put("/:id/mappings", ctrl.updateProductMappings);
router.put("/:id/mrp", ctrl.updateMRP);

router.put("/:id", uploadTo("products").single("image"), ctrl.updateProduct);

router.delete("/:id", ctrl.deleteProduct);

export default router;
