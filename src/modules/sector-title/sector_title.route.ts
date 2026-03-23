import { Router } from "express";
import {
  createSectorTitle,
  getSectorTitles,
  getSectorTitleById,
  deleteSectorTitle,
  updateSectorTitle,
} from "./sector_title.controller";
import { uploadTo } from "../../config/multer";

const router = Router();

router.post("/", uploadTo("sector-titles").single("image"), createSectorTitle);
router.get("/", getSectorTitles);
router.get("/:id", getSectorTitleById);
router.put("/:id", uploadTo("sector-titles").single("image"), updateSectorTitle);
router.delete("/:id", deleteSectorTitle);

export default router;
