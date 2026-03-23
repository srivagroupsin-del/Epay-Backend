import { Router } from "express";
import * as ctrl from "./brand.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

router.get("/", ctrl.getBrands);
router.post("/", uploadTo("brands").single("image"), ctrl.createBrand);
router.get("/:id", ctrl.getBrandById);
router.put("/:id", uploadTo("brands").single("image"), ctrl.updateBrand);
router.delete("/:id", ctrl.deleteBrand);

export default router;
