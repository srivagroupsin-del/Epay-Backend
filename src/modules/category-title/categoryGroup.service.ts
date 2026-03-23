import * as repo from "./categoryGroup.repository";
import fs from "fs";
import path from "path";
import { ensureUniqueActive } from "../../utils/uniqueCheck";
import { logAudit } from "../audit/audit.service";

export const createCategoryGroup = async (data: any, userId: number) => {
  await ensureUniqueActive("category_group", "name", data.name);

  const id = await repo.createCategoryGroup(data);

  await logAudit({
    user_id: userId,
    module: "category_group",
    record_id: id,
    action: "create",
    new_data: data,
  });

  return { id, message: "Category group created successfully" };
};

export const getAllCategoryGroups = async () => {
  return repo.getAllCategoryGroups();
};

export const getCategoryGroupById = async (id: number) => {
  const data = await repo.getCategoryGroupById(id);
  if (!data) throw new Error("Category group not found");
  return data;
};

export const updateCategoryGroup = async (
  id: number,
  data: any,
  userId: number
) => {
  const old = await repo.getCategoryGroupById(id);
  if (!old) throw new Error("Category group not found");

  if (data.image && old.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  if (data.name && data.name !== old.name) {
    await ensureUniqueActive("category_group", "name", data.name, id);
  }

  await repo.updateCategoryGroup(id, data);

  await logAudit({
    user_id: userId,
    module: "category_group",
    record_id: id,
    action: "update",
    new_data: data,
  });

  return { message: "Category group updated successfully" };
};

export const deleteCategoryGroup = async (id: number, userId: number) => {
  await repo.deleteCategoryGroup(id);

  await logAudit({
    user_id: userId,
    module: "category_group",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  return { message: "Category group deleted successfully" };
};