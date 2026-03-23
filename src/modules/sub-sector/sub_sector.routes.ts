import { Router } from "express";
import * as ctrl from "./sub_sector.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

router.get("/", ctrl.getSubSectors);
router.post("/", uploadTo("sub-sectors").single("image"), ctrl.createSubSector);
router.put("/map-to-sector", ctrl.mapSubSectorsToSector);
router.put("/:id", uploadTo("sub-sectors").single("image"), ctrl.updateSubSector);
router.delete("/:id", ctrl.deleteSubSector);


export default router;
