import { Router } from "express";
import * as ctrl from "./sector.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

router.get("/", ctrl.getSectors);
router.post("/", uploadTo("sectors").single("image"), ctrl.createSector);
router.put("/:id", uploadTo("sectors").single("image"), ctrl.updateSector);
router.delete("/:id", ctrl.deleteSector);

export default router;
