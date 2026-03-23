import { Router } from "express";
import {
  createCategoryGroupMapping,
  getCategoryGroupMappings,
  getCategoryGroupMappingById,
  deleteCategoryGroupMapping,
} from "./categoryGroupMapping.controller";

const router = Router();

router.post("/", createCategoryGroupMapping);
router.get("/", getCategoryGroupMappings);
router.delete("/:id", deleteCategoryGroupMapping);
router.get("/:id", getCategoryGroupMappingById);

export default router;