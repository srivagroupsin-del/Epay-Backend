import pool from "../../config/db";

export const getSectors = async () => {
  const [rows] = await pool.query(
    `SELECT 
      s.id,
      s.sector_name,
      s.description,
      s.info,
      s.note,s.system_note,
      s.image,
      s.status,
      s.sector_title_id,
      COALESCE(st.name, '-') AS sector_title_name
     FROM sector s
     LEFT JOIN sector_title st 
         ON st.id = s.sector_title_id 
         AND st.is_active = 1
     WHERE s.is_active = 1
     ORDER BY s.sector_name ASC`
  );
  return rows;
};

export const getSectorById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM sector WHERE id = ? LIMIT 1`,
    [id]
  );
  return row || null;
};

/* CREATE */
export const createSector = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO sector
     (sector_title_id, sector_name, description, info, note, system_note,
      image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.sector_title_id,
      data.sector_name,
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
export const updateSector = async (id: number, data: any) => {
  await pool.query(
    `UPDATE sector
     SET sector_title_id = ?,
         sector_name = ?,
         description = ?,
         info = ?,
         note = ?,
         system_note = ?,
         image = COALESCE(?, image),
         status = ?
     WHERE id = ?`,
    [
      data.sector_title_id,
      data.sector_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.status,
      id,
    ]
  );
};

export const deleteSector = async (id: number) => {
  await pool.query(`UPDATE sector SET is_active = 0 WHERE id = ?`, [id]);
};
