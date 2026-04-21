import pool from "../../config/db";

/* CREATE */
export const createConfig = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_config 
    (sector_title_id, sector_id, sub_sector_id, category_id, heading_id, checkbox_id)
    VALUES (?,?,?,?,?,?)`,
    [
      d.sector_title_id || null,
      d.sector_id || null,
      d.sub_sector_id || null,
      d.category_id || null,
      d.heading_id,
      d.checkbox_id,
    ],
  );
  return r.insertId;
};

/* GET ALL */
export const getConfigs = async () => {
  const [rows]: any = await pool.query(`
    SELECT 
      mc.id,

      mc.sector_id,
      s.sector_name AS sector,

      mc.category_id,
      c.category_name AS category,

      mc.heading_id,
      h.heading_name AS heading,

      mc.checkbox_id,
      cb.label_name AS checkbox

    FROM multitab_config mc

    LEFT JOIN sector s ON s.id = mc.sector_id
    LEFT JOIN category c ON c.id = mc.category_id
    LEFT JOIN multitab_heading_master h ON h.id = mc.heading_id
    LEFT JOIN multitab_checkbox_master cb ON cb.id = mc.checkbox_id

    WHERE mc.is_active = 1
  `);

  return rows;
};

/* GET BY ID */
export const getConfigById = async (id: number) =>
  (
    await pool.query(
      `SELECT * FROM multitab_config WHERE id=? AND is_active=1`,
      [id],
    )
  )[0];

/* UPDATE */
export const updateConfig = async (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_config SET
     sector_title_id=COALESCE(?,sector_title_id),
     sector_id=COALESCE(?,sector_id),
     sub_sector_id=COALESCE(?,sub_sector_id),
     category_id=COALESCE(?,category_id),
     heading_id=COALESCE(?,heading_id),
     checkbox_id=COALESCE(?,checkbox_id)
     WHERE id=?`,
    [
      d.sector_title_id ?? null,
      d.sector_id ?? null,
      d.sub_sector_id ?? null,
      d.category_id ?? null,
      d.heading_id ?? null,
      d.checkbox_id ?? null,
      id,
    ],
  );

/* SOFT DELETE */
export const deleteConfig = async (id: number) =>
  pool.query(`UPDATE multitab_config SET is_active=0 WHERE id=?`, [id]);

// 🔥 CORE LOGIC (VERY IMPORTANT)
export const getCheckboxesByHierarchy = async (d: any) => {
  const [rows]: any = await pool.query(
    `
    SELECT checkbox_id
    FROM multitab_config
    WHERE is_active=1
    AND (
      (category_id = ?)
      OR (category_id IS NULL AND sub_sector_id = ?)
      OR (category_id IS NULL AND sub_sector_id IS NULL AND sector_id = ?)
      OR (category_id IS NULL AND sub_sector_id IS NULL AND sector_id IS NULL)
    )
    `,
    [d.category_id, d.sub_sector_id, d.sector_id],
  );

  return rows.map((r: any) => r.checkbox_id);
};

/* 🔥 MULTI CATEGORY CHECKBOX FETCH */
export const getCheckboxesByHierarchyMulti = async (d: any) => {
  const categoryIds = d.category_ids?.length ? d.category_ids : [-1]; // safe

  const [rows]: any = await pool.query(
    `
    SELECT DISTINCT checkbox_id, category_id
    FROM multitab_config
    WHERE is_active=1
    AND (
      category_id IN (?)
      OR (category_id IS NULL AND sub_sector_id = ?)
      OR (category_id IS NULL AND sub_sector_id IS NULL AND sector_id = ?)
      OR (category_id IS NULL AND sub_sector_id IS NULL AND sector_id IS NULL)
    )
    `,
    [categoryIds, d.sub_sector_id, d.sector_id],
  );

  return rows;
};
