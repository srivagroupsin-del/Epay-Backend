import * as repo from "./sub_sector.repository";
import fs from "fs";
import path from "path";
import { logAudit } from "../audit/audit.service";

/* GET */
export const fetchSubSectors = async () => {
  return repo.getSubSectors();
};

/* CREATE */
export const createSubSector = async (data: any, userId: number) => {
  const id = await repo.createSubSector(data);
  await logAudit({
    user_id: userId,
    module: "sub_sector",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Sub sector created successfully" };
};

/* UPDATE */
export const updateSubSector = async (id: number, data: any, userId: number) => {
  const old = await repo.getSubSectorById(id);

  if (data.image && old?.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  await repo.updateSubSector(id, data);
  await logAudit({
    user_id: userId,
    module: "sub_sector",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Sub sector updated successfully" };
};

/* DELETE */
export const removeSubSector = async (id: number, userId: number) => {
  // Validate dependencies

  await logAudit({
    user_id: userId,
    module: "sub_sector",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteSubSector(id);
  return { message: "Sub sector deleted successfully" };
};

/* MAP */
export const mapSubSectors = async (
  sectorId: number,
  subSectorIds: number[],
  userId: number
) => {
  await repo.mapSubSectorsToSector(sectorId, subSectorIds);
  await logAudit({
    user_id: userId,
    module: "sub_sector",
    record_id: sectorId,
    action: "delete",
    new_data: "mapping",
  });
  return { message: "Sub-sectors mapped to sector successfully" };
};
