import { logAudit } from "../audit/audit.service";
import * as repo from "./sectorMapping.repository";

export const mapSectors = async (
  sector_title_id: number,
  sector_ids: number[],
  userId:number
) => {
  if (!sector_title_id) {
    throw new Error("Sector title is required");
  }

  await repo.mapSectorsToTitle(sector_title_id, sector_ids);
    await logAudit({
    user_id: userId,
    module: "sector",
    record_id: sector_title_id,
    action: "update",
    new_data: sector_ids,
  });
  return {
    message: "Sectors mapped successfully",
  };
};
