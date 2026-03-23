import * as repo from "./sector_title.repository";
import fs from "fs";
import path from "path";
import { ensureUniqueActive } from "../../utils/uniqueCheck";
import { logAudit } from "../audit/audit.service";

/**
 * Create sector title
 */
export const createSectorTitle = async (data: any, userId: number) => {
  await ensureUniqueActive("sector_title", "name", data.name);
  const sectorTitleId = await repo.createSectorTitle({
    ...data,
  });
  await logAudit({
    user_id: userId,
    module: "sector_title",
    record_id: sectorTitleId,
    action: "create",
    new_data: data,
  });

  return {
    id: sectorTitleId,
    message: "Sector title created successfully",
  };
};

/**
 * Fetch all sector titles
 */
export const fetchSectorTitles = async () => {
  return repo.getAllSectorTitles();
};

/**
 * Fetch sector title by ID
 */
export const fetchSectorTitleById = async (id: number) => {
  const sector = await repo.getSectorTitleById(id);

  if (!sector) {
    throw new Error("Sector title not found");
  }

  return sector;
};

export const updateSectorTitle = async (
  id: number,
  data: any,
  userId: number,
) => {
  const old = await repo.getSectorTitleById(id);

  // delete old image if new image uploaded
  if (data.image_path && old?.image) {
    const oldImagePath = path.join("uploads", old.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  if (data.name !== undefined && data.name !== old.name) {
    await ensureUniqueActive("sector_title", "name", data.name, id);
  }

  await logAudit({
    user_id: userId,
    module: "sector_title",
    record_id: id,
    action: "update",
    new_data: data,
  });

  await repo.updateSectorTitle(id, data);

  return {
    message: "Sector title updated successfully",
  };
};

export const removeSectorTitle = async (id: number, userId: number) => {
 
  await logAudit({
    user_id: userId,
    module: "sector_title",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteSectorTitle(id);

  return {
    message: "Sector title deleted successfully",
  };
};
