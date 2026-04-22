import * as repo from "./multitab-config.repository";
import { logAudit } from "../audit/audit.service";
import pool from "../../config/db";

const parseOptions = (opt: any) => {
  try {
    if (!opt) return [];

    if (Array.isArray(opt)) return opt;

    if (typeof opt === "string") {
      return JSON.parse(opt);
    }

    return [];
  } catch {
    return [];
  }
};

/* VALIDATION */
const validateConfig = (d: any) => {
  if (!d.heading_id) throw new Error("heading_id required");
  if (!d.checkbox_id) throw new Error("checkbox_id required");

  if (!d.sector_id && d.sub_sector_id) {
    throw new Error("SubSector cannot exist without Sector");
  }
};

/* CREATE */
export const createConfig = async (d: any, u: number) => {
  validateConfig(d);

  const id = await repo.createConfig(d);

  await logAudit({
    user_id: u,
    module: "multitab_config",
    record_id: id,
    action: "create",
  });

  return { id };
};

/* GET */
export const getConfigs = repo.getConfigs;
export const getConfigById = repo.getConfigById;

/* UPDATE */
export const updateConfig = async (id: number, d: any, u: number) => {
  validateConfig(d);

  await repo.updateConfig(id, d);

  await logAudit({
    user_id: u,
    module: "multitab_config",
    record_id: id,
    action: "update",
  });
};

/* DELETE */
export const deleteConfig = async (id: number, u: number) => {
  await repo.deleteConfig(id);

  await logAudit({
    user_id: u,
    module: "multitab_config",
    record_id: id,
    action: "delete",
  });
};

/* 🔥 MAIN API (Hierarchy → Fields) */
export const getFieldsByHierarchy = async (d: any) => {
  const checkboxRows = await repo.getCheckboxesByHierarchyMulti(d);

  const checkbox_ids = checkboxRows.map((r: any) => r.checkbox_id);

  const [fields]: any = await pool.query(
    `
    SELECT 
      f.*,
      mc.category_id
    FROM multitab_fields f
    LEFT JOIN multitab_config mc ON mc.checkbox_id = f.checkbox_id
    WHERE 
      f.is_active=1
      AND (
        f.field_scope='global'
        OR f.checkbox_id IN (?)
      )
    `,
    [checkbox_ids.length ? checkbox_ids : [-1]],
  );

  // 🔥 GROUP BY CATEGORY
  const grouped: any = {};

  fields.forEach((f: any) => {
    const catId = f.category_id || "global";

    if (!grouped[catId]) grouped[catId] = [];
    grouped[catId].push({
      ...f,
      options: parseOptions(f.options),
    });
  });

  return grouped;
};
