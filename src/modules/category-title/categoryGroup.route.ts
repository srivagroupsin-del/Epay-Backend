import { Router } from "express";
import { uploadTo } from "../../config/multer";

import {
  createCategoryGroup,
  getAllCategoryGroups,
  getCategoryGroupById,
  updateCategoryGroup,
  deleteCategoryGroup,
} from "./categoryGroup.controller";

const router = Router();

// CREATE
router.post(
  "/",
  uploadTo("categoryGroup").single("image"),
  createCategoryGroup
);

// READ ALL
router.get(
  "/",
  getAllCategoryGroups
);

// READ ONE
router.get(
  "/:id",
  getCategoryGroupById
);

// UPDATE
router.put(
  "/:id",
  uploadTo("categoryGroup").single("image"),
  updateCategoryGroup
);

// DELETE
router.delete(
  "/:id",
  deleteCategoryGroup
);

export default router;