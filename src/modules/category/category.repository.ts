import pool from "../../config/db";

/* ================= GET ================= */

/* GET BY ID */
export const getCategoryById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM category WHERE id = ? LIMIT 1`,
    [id],
  );
  return row || null;
};

export const getAllCategories = async () => {
  const query = `
    SELECT	
        c.id,
        c.category_name,
        c.category_type,
        c.description,
        c.info,
        c.note,
        c.system_note,
        c.image,
        c.status,
        c.sector_title_id,
        c.sector_id,
        c.sub_sector_id,

        COALESCE(st.name, '-') AS sector_title_name,
        COALESCE(s.sector_name, '-') AS sector_name,
        COALESCE(ss.sub_sector_name, '-') AS sub_sector_name,

        pc.id AS parent_category_id,
        COALESCE(pc.category_name, '-') AS parent_category_name

    FROM category c

    LEFT JOIN sector_title st 
        ON st.id = c.sector_title_id 
        AND st.is_active = 1

    LEFT JOIN sector s 
        ON s.id = c.sector_id 
        AND s.is_active = 1

    LEFT JOIN sub_sector ss 
        ON ss.id = c.sub_sector_id 
        AND ss.is_active = 1

    LEFT JOIN category pc
        ON pc.id = c.parent_category_id
        AND pc.is_active = 1

    WHERE c.is_active = 1

    ORDER BY c.id DESC
  `;

  const [rows] = await pool.query(query);
  return rows;
};

export const getPrimaryCategories = async () => {
  const [rows] = await pool.query(
    `SELECT  
id,category_name,
        category_type,
        description,
        info,
        note,
        system_note,
        image,
        status,
        sector_title_id,
        sector_id,
        sub_sector_id
     FROM category
     WHERE category_type = 'primary'
       AND is_active = 1
       ORDER by category_name ASC`,
  );
  return rows;
};

export const getSecondaryByPrimary = async (parentId: number) => {
  const [rows] = await pool.query(
    `SELECT
      c.id,
      c.category_name,
      c.category_type,
      c.parent_category_id,
      COALESCE(p.category_name, '-') AS parent_category_name,
      c.description,
      c.info,
      c.note,
      c.system_note,
      c.image,
      c.status,
      c.sector_title_id,
      c.sector_id,
      c.sub_sector_id
  FROM category c

  LEFT JOIN category p
      ON p.id = c.parent_category_id
      AND p.is_active = 1

  WHERE c.parent_category_id = ?
    AND c.category_type = 'secondary'
    AND c.is_active = 1

  ORDER BY c.category_name ASC`,
    [parentId],
  );
  return rows;
};

/* ================= CREATE ================= */

export const createCategory = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO category
     (sector_title_id, sector_id, sub_sector_id,
      category_type, parent_category_id, category_name,
      description, info, note, system_note,image,status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.sector_title_id,
      data.sector_id,
      data.sub_sector_id,
      data.category_type ?? "primary",
      data.parent_category_id ?? null,
      data.category_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.status,
    ],
  );

  return result.insertId;
};

/* ================= UPDATE ================= */

export const updateCategory = async (id: number, data: any) => {
  await pool.query(
    `UPDATE category
     SET sector_title_id = ?,
         sector_id = ?,
         sub_sector_id = ?,
         category_type = ?,
         parent_category_id = ?,
         category_name = ?,
         description = ?,
         info = ?,
         note = ?,
         system_note = ?,
         image = COALESCE(?, image),
         is_enabled = ?,
         status = ?
     WHERE id = ?`,
    [
      data.sector_title_id,
      data.sector_id,
      data.sub_sector_id,
      data.category_type,
      data.parent_category_id ?? null,
      data.category_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.is_enabled,
      data.status,
      id,
    ],
  );
};

/* ================= CONVERSIONS ================= */

export const convertToSecondary = async (
  id: number,
  parentCategoryId: number,
) => {
  await pool.query(
    `UPDATE category
     SET category_type = 'secondary',
         parent_category_id = ?
     WHERE id = ?`,
    [parentCategoryId, id],
  );
};

export const convertToPrimary = async (id: number) => {
  await pool.query(
    `UPDATE category
     SET category_type = 'primary',
         parent_category_id = NULL
     WHERE id = ?`,
    [id],
  );
};

/* ================= SOFT DELETE ================= */

export const deleteCategory = async (id: number) => {
  await pool.query(`UPDATE category SET is_active = 0 WHERE id = ?`, [id]);
};

/* 🔥 GET UNSELECTED SECONDARY CATEGORIES */
export const getUnselectedSecondaryCategories = async (primaryId: number) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM category
    WHERE category_type = 'secondary'
      AND is_active = 1 AND
    
         parent_category_id != ?
    ORDER BY category_name ASC
    `,
    [primaryId],
  );

  return rows;
};

export const bulkConvertToSecondary = async (
  categoryIds: number[],
  parentCategoryId: number,
) => {
  await pool.query(
    `UPDATE category
     SET category_type = 'secondary',
         parent_category_id = ?
     WHERE id IN (?)
       AND is_active = 1`,
    [parentCategoryId, categoryIds],
  );
};

export const bulkConvertToPrimary = async (categoryIds: number[]) => {
  await pool.query(
    `UPDATE category
     SET category_type = 'primary',
         parent_category_id = NULL
     WHERE id IN (?)
       AND is_active = 1`,
    [categoryIds],
  );
};

export const bulkRemapSecondary = async (
  categoryIds: number[],
  newParentId: number,
) => {
  await pool.query(
    `UPDATE category
     SET parent_category_id = ?
     WHERE id IN (?)
       AND category_type = 'secondary'
       AND is_active = 1`,
    [newParentId, categoryIds],
  );
};

/* ================= CATEGORY TAX ================= */

/* CREATE */
export const createCategoryTax = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO category_tax
     (category_id, gst_variant_id, hsn_code)
     VALUES (?, ?, ?)`,
    [data.category_id, data.gst_variant_id, data.hsn_code || null],
  );

  return result.insertId;
};

/* GET ALL */
export const getAllCategoryTax = async () => {
  const [rows] = await pool.query(
    `SELECT
    ct.id,
    ct.category_id,

    c.category_name,
    c.category_type,

    pc.id AS parent_category_id,
    pc.category_name AS parent_category_name,

    ct.gst_variant_id,
    vf.value AS gst,

    ct.hsn_code,
    ct.status,
    ct.created,
    ct.updated

FROM category_tax ct

LEFT JOIN category c
    ON c.id = ct.category_id
    AND c.is_active = 1

LEFT JOIN category pc
    ON pc.id = c.parent_category_id
    AND pc.is_active = 1

LEFT JOIN variants_fields vf
    ON vf.id = ct.gst_variant_id
    AND vf.is_active = 1

WHERE ct.is_active = 1`,
  );

  return rows;
};

/* GET BY ID */
export const getCategoryTaxById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT *
     FROM category_tax
     WHERE id = ?
       AND is_active = 1
     LIMIT 1`,
    [id],
  );

  return row || null;
};

/* UPDATE */
export const updateCategoryTax = async (id: number, data: any) => {
  await pool.query(
    `UPDATE category_tax
     SET category_id = ?,
         gst_variant_id = ?,
         hsn_code = ?,
         status = ?
     WHERE id = ?`,
    [
      data.category_id,
      data.gst_variant_id,
      data.hsn_code || null,
      data.status,
      id,
    ],
  );
};

/* SOFT DELETE */
export const deleteCategoryTax = async (id: number) => {
  await pool.query(
    `UPDATE category_tax
     SET is_active = 0
     WHERE id = ?`,
    [id],
  );
};
