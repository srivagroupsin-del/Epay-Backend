import pool from "../../config/db";

export const createCategoryGroup = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO category_group
     (name, description, info, image, status)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description || null,
      data.info || null,
      data.image || null,
      data.status || "active",
    ]
  );

  return result.insertId;
};

export const getAllCategoryGroups = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM category_group
     WHERE is_active = 1
     ORDER BY name ASC`
  );
  return rows;
};

export const getCategoryGroupById = async (id: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM category_group WHERE id = ? AND is_active = 1`,
    [id]
  );
  return rows[0] || null;
};

export const updateCategoryGroup = async (id: number, data: any) => {
  await pool.query(
    `UPDATE category_group SET
      name = ?,
      description = ?,
      info = ?,
      image = COALESCE(?, image),
      status = ?
     WHERE id = ?`,
    [
      data.name,
      data.description || null,
      data.info || null,
      data.image || null,
      data.status || "active",
      id,
    ]
  );
};

export const deleteCategoryGroup = async (id: number) => {
  await pool.query(
    `UPDATE category_group 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};