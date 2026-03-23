import * as repo from "./categoryGroupMapping.repository";
import { logAudit } from "../audit/audit.service";

/* =========================
   CREATE
========================= */
export const createCategoryGroupMapping = async (
  data: any,
  userId: number
) => {
  await repo.createCategoryGroupMappings(data);

  await logAudit({
    user_id: userId,
    module: "category_group_mapping",
    record_id: data.category_group_id,
    action: "create",
    new_data: data,
  });

  return {
    message: "Categories assigned to group successfully",
  };
};

/* =========================
   LIST
========================= */
export const getCategoryGroupMappings = async (
  category_group_id: number
) => {
  return repo.getCategoryGroupMappings(category_group_id);
};

/* =========================
   GET BY ID
========================= */
export const getCategoryGroupMappingById = async (id: number) => {
  const data = await repo.getCategoryGroupMappingById(id);
  if (!data) throw new Error("Mapping not found");
  return data;
};

/* =========================
   DELETE
========================= */
export const deleteCategoryGroupMapping = async (
  id: number,
  userId: number
) => {
  await repo.deleteCategoryGroupMapping(id);

  await logAudit({
    user_id: userId,
    module: "category_group_mapping",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  return { message: "Mapping deleted successfully" };
};