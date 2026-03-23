import pool from "../../config/db";

interface CreateMappingParams {
  category_group_id: number;
  category_ids: number[];
}

/* =========================
   CREATE (Bulk Upsert)
========================= */
export const createCategoryGroupMappings = async (
  data: CreateMappingParams
) => {
  const { category_group_id, category_ids } = data;

  if (!category_group_id) {
    throw new Error("category_group_id is required");
  }

  if (!Array.isArray(category_ids) || category_ids.length === 0) {
    throw new Error("category_ids must be non-empty");
  }

  const values = category_ids.map((id: number) => [
    category_group_id,
    id,
  ]);

  await pool.query(
    `INSERT INTO category_group_mapping
      (category_group_id, category_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE
       is_active = 1,
       updated = CURRENT_TIMESTAMP`,
    [values]
  );

  return true;
};

/* =========================
   LIST BY GROUP
========================= */
export const getCategoryGroupMappings = async (
  category_group_id: number
) => {
  const [rows] = await pool.query(
    `SELECT 
        CGM.id,
        CGM.category_group_id,
        COALESCE(CG.name, '-') AS category_group_name,
        CGM.category_id,
        COALESCE(C.category_name, '-') AS category_name,
        CGM.created,
        CGM.updated
     FROM category_group_mapping CGM
     LEFT JOIN category_group CG
       ON CG.id = CGM.category_group_id
       AND CG.is_active = 1
     LEFT JOIN category C
       ON C.id = CGM.category_id
       AND C.is_active = 1
     WHERE CGM.category_group_id = ?
       AND CGM.is_active = 1`,
    [category_group_id]
  );

  return rows;
};

/* =========================
   GET BY ID
========================= */
export const getCategoryGroupMappingById = async (id: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM category_group_mapping
     WHERE id = ?
       AND is_active = 1`,
    [id]
  );

  return rows[0] || null;
};

/* =========================
   SOFT DELETE
========================= */
export const deleteCategoryGroupMapping = async (id: number) => {
  await pool.query(
    `UPDATE category_group_mapping
     SET is_active = 0,
         updated = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [id]
  );

  return true;
};