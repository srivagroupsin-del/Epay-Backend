import pool from "../../config/db";

/* GET */
export const getSubSectors = async () => {
  const [rows] = await pool.query(
    `SELECT 
      ss.id,
	  ss.sector_id,
      ss.sub_sector_name,
      ss.description,
      ss.info,
      ss.note,
      ss.system_note,
      ss.image,
      ss.status,
      COALESCE(s.sector_name, '-') AS sector_name,
      COALESCE(st.name, '-') AS sector_title_name
    FROM sub_sector ss
    LEFT JOIN sector s 
      ON s.id = ss.sector_id
      AND s.is_active = 1
    LEFT JOIN sector_title st 
      ON st.id = s.sector_title_id
      AND st.is_active = 1
    WHERE ss.is_active = 1
    ORDER BY ss.sub_sector_name ASC`,
  );
  return rows;
};

export const getSubSectorById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM sub_sector WHERE id = ? LIMIT 1`,
    [id],
  );
  return row || null;
};

/* CREATE */
export const createSubSector = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO sub_sector
     (sector_id, sub_sector_name, description, info, note, system_note,
      image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.sector_id,
      data.sub_sector_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,
      data.status ?? "active",
    ],
  );
  return result.insertId;
};

/* UPDATE */
export const updateSubSector = async (id: number, data: any) => {
  await pool.query(
    `UPDATE sub_sector
     SET sector_id = ?,
         sub_sector_name = ?,
         description = ?,
         info = ?,
         note = ?,
         system_note = ?,
         image = COALESCE(?, image),
         status = ?
     WHERE id = ?`,
    [
      data.sector_id,
      data.sub_sector_name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.image || null,

      data.status,
      id,
    ],
  );
};

export const deleteSubSector = async (id: number) => {
  await pool.query(`UPDATE sub_sector SET is_active = 0 WHERE id = ?`, [id]);
};

/* MAP */
export const mapSubSectorsToSector = async (
  sectorId: number,
  subSectorIds: number[],
) => {
  if (!subSectorIds.length) return;

  await pool.query(
    `UPDATE sub_sector
     SET sector_id = ?
     WHERE id IN (?)
       AND is_active = 1`,
    [sectorId, subSectorIds],
  );
};
