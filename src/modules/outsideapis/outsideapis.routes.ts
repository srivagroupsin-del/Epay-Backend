import { Router } from "express";
import * as ctrl from "./outsideapis.controller";

const router = Router();

router.get("/products", ctrl.getProducts);
router.get("/mappings", ctrl.getProductMappings);
router.get("/products/:id", ctrl.getProductById);

// 🔑 Get Product Keys
router.get("/product/keys", ctrl.getProductKeys);

router.put("/products/:id/mrp", ctrl.updateMRP);

export default router;
