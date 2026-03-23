import * as repo from "./sector.repository";
import fs from "fs";
import path from "path";
import { logAudit } from "../audit/audit.service";

export const fetchSectors = async () => {
  return repo.getSectors();
};

/* CREATE */
export const createSector = async (data: any, userId: number) => {
  const id = await repo.createSector(data);
  await logAudit({
    user_id: userId,
    module: "sector",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Sector created successfully" };
};

/* UPDATE */
export const updateSector = async (id: number, data: any, userId: number) => {
  const old = await repo.getSectorById(id);

  // delete old image if new one uploaded
  if (data.image && old?.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  await repo.updateSector(id, data);
  await logAudit({
    user_id: userId,
    module: "sector",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Sector updated successfully" };
};

/* DELETE (SOFT) */
export const removeSector = async (id: number, userId: number) => {

  await logAudit({
    user_id: userId,
    module: "sector",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteSector(id);

  return { message: "Sector deleted successfully" };
};
