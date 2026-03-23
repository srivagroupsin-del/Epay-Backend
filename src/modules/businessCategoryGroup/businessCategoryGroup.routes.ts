import { Router } from "express";
import {
  createBusinessCategoryGroups,
  getBusinessCategoryGroups,
  deleteBusinessCategoryGroup,
} from "./businessCategoryGroup.controller";

const router = Router();

router.post("/", createBusinessCategoryGroups);
router.get("/", getBusinessCategoryGroups);
router.delete("/:id", deleteBusinessCategoryGroup);

export default router;