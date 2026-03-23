import pool from "../../config/db";
import { CreateBrandDTO, UpdateBrandDTO } from "./brand.types";

/* GET ALL */
export const getBrands = async () => {
  const [rows] = await pool.query(
    `SELECT
    id,
    brand_name,
    description,
    info,
    note,system_note,image,status
    FROM brand
    WHERE is_active = 1
    ORDER BY brand_name ASC`);
  return rows;
};

/* GET BY ID */
export const getBrandById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM brand WHERE id = ? LIMIT 1`,
    [id]
  );
  return row || null;
};

/* CREATE */
export const createBrand = async (data: CreateBrandDTO) => {
  const [result]: any = await pool.query(
    `INSERT INTO brand
     (brand_name, description, info, note, system_note, image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.brand_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.status,
    ]
  );

  return result.insertId;
};

/* UPDATE */
export const updateBrand = async (id: number, data: UpdateBrandDTO) => {
  await pool.query(
    `UPDATE brand
     SET brand_name = ?,
         description = ?,
         info = ?,
         note = ?,
         system_note = ?,
         image = COALESCE(?, image),
         status = ?
     WHERE id = ?`,
    [
      data.brand_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.status ?? "active",
      id,
    ]
  );
};

/* SOFT DELETE */
export const deleteBrand = async (id: number) => {
  await pool.query(`UPDATE brand SET is_active = 0 WHERE id = ?`, [id]);
};
