import pool from "../../config/db";

interface CreateMappingParams {
  business_id: number;
  category_group_ids: number[];
  addjson?: any;
}

/* =========================
   CREATE (Upsert)
========================= */
export const createBusinessCategoryGroups = async (data: CreateMappingParams) => {
  const { business_id, category_group_ids } = data;

  if (!business_id) throw new Error("business_id is required");

  if (!Array.isArray(category_group_ids) || category_group_ids.length === 0) {
    throw new Error("category_group_ids must be a non-empty array");
  }

  const values = category_group_ids.map((groupId: number) => [
    business_id,
    groupId,
  ]);

  await pool.query(
    `INSERT INTO business_category_group
      (business_id, category_group_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE
       is_active = 1,
       updated = CURRENT_TIMESTAMP`,
    [values]
  );

  return true;
};
/* =========================
   LIST BY BUSINESS
========================= */
export const getBusinessCategoryGroups = async (
  business_id: number
) => {
  const [rows] = await pool.query(
    `SELECT 
      BCG.id,
      BCG.business_id,
      COALESCE(B.name, '-') AS business_name,
      BCG.category_group_id,
      COALESCE(CG.name, '-') AS category_group_name,
      BCG.created
   FROM srivagroupsin_product_db_2.business_category_group BCG
   LEFT JOIN srivagroupsin_product_db_2.category_group CG
      ON CG.id = BCG.category_group_id
      AND CG.is_active = 1
   LEFT JOIN srivagroupsin_business_db1.businesses B
      ON B.id = BCG.business_id
      AND B.is_active = 1
   WHERE BCG.business_id = ?
     AND BCG.is_active = 1
   ORDER BY BCG.created DESC`,
    [business_id]
  );

  return rows;
};


// export const getBusinessCategoryGroups = async (
//   business_id: number
// ) => {
//   const [rows] = await pool.query(
//     `SELECT 
//     BCG.id,
//     BCG.business_id,
//     B.business_name,
//     BCG.category_group_id,
//     CG.name AS category_group_name,
//     BCG.created
// FROM srivagroupsin_product_db_2.business_category_group BCG
// INNER JOIN srivagroupsin_product_db_2.category_group CG
//     ON CG.id = BCG.category_group_id
// INNER JOIN srivagroupsin_business_db1.businesses B
//     ON B.id = BCG.business_id
// WHERE BCG.business_id = ?
//   AND BCG.is_active = 1
// ORDER BY BCG.created DESC`,
//     [business_id]
//   );

//   return rows;
// };

/* =========================
   DELETE (Soft)
========================= */
export const deleteBusinessCategoryGroup = async (
  id: number,
  business_id: number
) => {
  await pool.query(
    `UPDATE business_category_group
     SET is_active = 0,
         updated = CURRENT_TIMESTAMP
     WHERE id = ?
       AND business_id = ?`,
    [id, business_id]
  );

  return true;
};