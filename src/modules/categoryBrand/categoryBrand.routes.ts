import { Router } from "express";
import * as ctrl from "./categoryBrand.controller";

const router = Router();

router.post("/save", ctrl.saveMapping); // ✅ SAVE
router.get("/list", ctrl.listAllCategoryBrandMappings); // optional admin

export default router;

// {
//   "primary_category_id": 4,
//   "secondary_category_id": null,
//   "is_secondary_enabled": false,
//   "brand_ids": [1, 3, 7]
// }

// {
//   "primary_category_id": 4,
//   "secondary_category_id": 18,
//   "is_secondary_enabled": true,
//   "brand_ids": [2, 5, 9]
// }
