import { ensureUniqueActive } from "../../utils/uniqueCheck";
import { logAudit } from "../audit/audit.service";
import * as repo from "./brand.repository";
import { CreateBrandDTO, UpdateBrandDTO } from "./brand.types";
import fs from "fs";
import path from "path";

/* GET */
export const fetchBrands = async () => {
  return repo.getBrands();
};

export const fetchBrandById = async (id: number) => {
  const brand = await repo.getBrandById(id);
  if (!brand) throw new Error("Brand not found");
  return brand;
};

/* CREATE */
export const createBrand = async (data: CreateBrandDTO, userId: number) => {
  await ensureUniqueActive("brand", "brand_name", data.brand_name);
  const id = await repo.createBrand(data);
  await logAudit({
    user_id: userId,
    module: "brand",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Brand created successfully" };
};

/* UPDATE */
export const updateBrand = async (
  id: number,
  data: UpdateBrandDTO,
  userId: number,
) => {
  const old = await repo.getBrandById(id);
  if (!old) throw new Error("Brand not found");

  // delete old image if replaced
  if (data.image && old.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  // Only check uniqueness IF name is provided AND changed
  if (data.brand_name !== undefined && data.brand_name !== old.brand_name) {
    await ensureUniqueActive("brand", "brand_name", data.brand_name, id);
  }

  await repo.updateBrand(id, data);
  await logAudit({
    user_id: userId,
    module: "brand",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Brand updated successfully" };
};

/* DELETE */
export const removeBrand = async (id: number, userId: number) => {
  // Validate dependencies

  await logAudit({
    user_id: userId,
    module: "brand",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteBrand(id);
  return { message: "Brand deleted successfully" };
};
