import { Router } from "express";
import * as ctrl from "./outsideapis.controller";

const router = Router();

router.get("/products", ctrl.getProducts);
router.get("/products/:id", ctrl.getProductById);

export default router;
