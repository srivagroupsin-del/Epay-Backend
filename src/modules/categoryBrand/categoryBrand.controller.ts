import { Request, Response } from "express";
import * as service from "./categoryBrand.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";

/**
 * SAVE mapping (checkbox UI)
 */
export const saveMapping = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const {
    primary_category_id,
    secondary_category_id,
    is_secondary_enabled,
    brand_ids,
  } = req.body;
  

  if (!Array.isArray(brand_ids)) {
    return res.status(400).json({
      success: false,
      message: "brand_ids must be an array",
    });
  }

  const categoryId = is_secondary_enabled
    ? Number(secondary_category_id)
    : Number(primary_category_id);

  if (!categoryId) {
    return res.status(400).json({
      success: false,
      message: "Valid category is required",
    });
  }

  console.log("primary:", primary_category_id);
  console.log("secondary:", secondary_category_id);
  console.log("is_secondary_enabled:", is_secondary_enabled);
  console.log("Final categoryId:", categoryId);
  console.log("brand_ids:", brand_ids);

  const result = await service.saveCategoryBrandMapping(
    categoryId,
    brand_ids.map(Number),
    userId,
  );

  res.json({ success: true, data: result });
};

/**
 * Optional admin list
 */
export const listAllCategoryBrandMappings = async (
  _: Request,
  res: Response,
) => {
  const data = await service.fetchAllCategoryBrandMappings();
  res.json({ success: true, data });
};
