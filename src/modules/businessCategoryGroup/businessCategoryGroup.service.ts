import * as repo from "./businessCategoryGroup.repository";
import { logAudit } from "../audit/audit.service";

/* =========================
   CREATE
========================= */
export const createBusinessCategoryGroups = async (
  data: any,
  userId: number
) => {
  await repo.createBusinessCategoryGroups(data);

  await logAudit({
    user_id: userId,
    module: "business_category_group",
    record_id: data.business_id,
    action: "create",
    new_data: data,
  });

  return {
    message: "Category groups assigned successfully",
  };
};

/* =========================
   LIST
========================= */
export const getBusinessCategoryGroups = async (
  businessId: number
) => {
  const rows: any = await repo.getBusinessCategoryGroups(businessId);

  if (!rows || rows.length === 0) {
    return {
      business_id: businessId,
      business_name: null,
      category_groups: [],
    };
  }

  return {
    business_id: rows[0].business_id,
    business_name: rows[0].business_name,
    category_groups: rows.map((row: any) => ({
      id: row.category_group_id,
      name: row.category_group_name,
      assigned_at: row.created,
    })),
  };
};
/* =========================
   DELETE
========================= */
export const deleteBusinessCategoryGroup = async (
  id: number,
  businessId: number,
  userId: number
) => {
  await repo.deleteBusinessCategoryGroup(id, businessId);

  await logAudit({
    user_id: userId,
    module: "business_category_group",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  return { message: "Category group removed successfully" };
};