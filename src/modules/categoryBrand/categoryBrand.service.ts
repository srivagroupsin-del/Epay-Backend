import { logAudit } from "../audit/audit.service";
import * as repo from "./categoryBrand.repository";

export const saveCategoryBrandMapping = async (
  categoryId: number,
  brandIds: number[],
  userId: number,
) => {
  // 1. Perform the Data Operations
  // It is best to run these inside a transaction if your Repo supports it.
  // If not, running them sequentially is the next best option.
  await repo.mapBrandsToCategory(categoryId, brandIds);
  await repo.unmapUnselectedBrands(categoryId, brandIds);

  // 2. Log ONE Audit Entry (The "Net Result")
  await logAudit({
    user_id: userId,
    module: "category_brand_mapping",
    record_id: categoryId, // The parent ID being modified
    action: "update", // The user action was an "Update" to the category
    // Store the actual data so you know what the new state is
    new_data: JSON.stringify({ assigned_brands: brandIds }),
  });

  return { message: "Category brand mapping saved successfully" };
};

export const fetchAllCategoryBrandMappings = async () => {
  return repo.getAllCategoryBrandMappings();
};
