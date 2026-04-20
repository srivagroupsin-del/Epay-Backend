import * as repo from "./category.repository";
import fs from "fs";
import path from "path";
import { logAudit } from "../audit/audit.service";
import { ensureUniqueActive } from "../../utils/uniqueCheck";
/* GET */
export const fetchCategories = async () => repo.getAllCategories();

export const fetchPrimaryCategories = async () => repo.getPrimaryCategories();

export const fetchSecondaryCategories = async (parentId: number) =>
  repo.getSecondaryByPrimary(parentId);

/* CREATE */
export const createCategory = async (data: any, userId: number) => {
  if (data.category_type === "primary") {
    data.parent_category_id = null;
  }

  if (data.category_type === "secondary" && !data.parent_category_id) {
    throw new Error("Secondary category must have parent_category_id");
  }

  await ensureUniqueActive("category", "category_name", data.category_name);

  const id = await repo.createCategory(data);
  await logAudit({
    user_id: userId,
    module: "category",
    record_id: id,
    action: "create",
    new_data: null,
  });

  return {
    id,
    message: "Category created successfully",
  };
};

/* UPDATE */
export const updateCategory = async (id: number, data: any, userId: number) => {
  const old = await repo.getCategoryById(id);

  if (!old) {
    throw new Error("Category not found");
  }

  // 🔁 Use existing category_type if not provided

  const categoryType = data.category_type ?? old.category_type;

  if (categoryType === "primary") {
    data.parent_category_id = null;
  }

  if (
    categoryType === "secondary" &&
    !(data.parent_category_id ?? old.parent_category_id)
  ) {
    throw new Error("Secondary category must have parent_category_id");
  }

  const name = data.category_name ?? old.category_name;
  await ensureUniqueActive("category", "category_name", name, id);

  // 🖼️ Remove old image only if new one is uploaded
  if (data.image && old.image && data.image !== old.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  await repo.updateCategory(id, data);
  await logAudit({
    user_id: userId,
    module: "category",
    record_id: id,
    action: "update",
    new_data: null,
  });

  return {
    message: "Category updated successfully",
  };
};

/* CONVERSIONS */
export const makeSecondary = async (
  id: number,
  parentCategoryId: number,
  userId: number,
) => {
  await repo.convertToSecondary(id, parentCategoryId);
  await logAudit({
    user_id: userId,
    module: "category",
    record_id: id,
    action: "update",
    new_data: null,
  });
  return { message: "Converted to secondary category" };
};

export const makePrimary = async (id: number, userId: number) => {
  await repo.convertToPrimary(id);
  await logAudit({
    user_id: userId,
    module: "category",
    record_id: id,
    action: "update",
    new_data: null,
  });
  return { message: "Converted to primary category" };
};

/* DELETE */
export const removeCategory = async (id: number, userId: number) => {
  await logAudit({
    user_id: userId,
    module: "category",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteCategory(id);
  return { message: "Category deleted successfully" };
};

/* 🔥 UNSELECTED SECONDARY */
export const fetchUnselectedSecondaryCategories = async (primaryId: number) => {
  return repo.getUnselectedSecondaryCategories(primaryId);
};

export const convertMultipleToSecondary = async (
  categoryIds: number[],
  parentCategoryId: number,
  userId: number,
) => {
  await repo.bulkConvertToSecondary(categoryIds, parentCategoryId);
  for (const id of categoryIds) {
    await logAudit({
      user_id: userId,
      module: "category",
      record_id: id,
      action: "update",
      new_data: JSON.stringify({
        operation: "bulkConvertToSecondary",
        category_id: id,
      }),
    });
  }
  return { message: "Converted to secondary categories" };
};

export const convertMultipleToPrimary = async (
  categoryIds: number[],
  userId: number,
) => {
  await repo.bulkConvertToPrimary(categoryIds);
  for (const id of categoryIds) {
    await logAudit({
      user_id: userId,
      module: "category",
      record_id: id,
      action: "update",
      new_data: JSON.stringify({
        operation: "bulkConvertToPrimary",
        category_id: id,
      }),
    });
  }
  return { message: "Converted to primary categories" };
};

export const remapMultipleSecondary = async (
  categoryIds: number[],
  newParentId: number,
  userId: number,
) => {
  await repo.bulkRemapSecondary(categoryIds, newParentId);
  // Loop through the IDs and create one log per product
  for (const id of categoryIds) {
    await logAudit({
      user_id: userId,
      module: "category",
      record_id: id,
      action: "update",
      new_data: JSON.stringify({
        operation: "remapMultipleSecondary",
        category_id: id,
      }),
    });
  }
  return { message: "Secondary categories remapped successfully" };
};

/* ================= CATEGORY TAX ================= */

export const createCategoryTax = async (data: any, userId: number) => {
  const id = await repo.createCategoryTax(data);

  await logAudit({
    user_id: userId,
    module: "category_tax",
    record_id: id,
    action: "create",
    new_data: JSON.stringify(data),
  });

  return {
    id,
    message: "Category tax created successfully",
  };
};

export const fetchCategoryTax = async () => {
  return repo.getAllCategoryTax();
};

export const fetchCategoryTaxById = async (id: number) => {
  return repo.getCategoryTaxById(id);
};

export const updateCategoryTax = async (
  id: number,
  data: any,
  userId: number,
) => {
  const old = await repo.getCategoryTaxById(id);

  if (!old) {
    throw new Error("Category tax not found");
  }

  await repo.updateCategoryTax(id, data);

  await logAudit({
    user_id: userId,
    module: "category_tax",
    record_id: id,
    action: "update",
    new_data: JSON.stringify(data),
  });

  return {
    message: "Category tax updated successfully",
  };
};

export const removeCategoryTax = async (id: number, userId: number) => {
  await logAudit({
    user_id: userId,
    module: "category_tax",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteCategoryTax(id);

  return {
    message: "Category tax deleted successfully",
  };
};
