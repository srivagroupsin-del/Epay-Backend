import pool from "../../config/db";

/**
 * Create sector title
 */
export const createSectorTitle = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO sector_title
     (name, description, info, note, system_note,
      icon_name, link, image,status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.icon_name,
      data.link,
      data.image_path || null, // ✅ image saved
      data.status || "active",
    ],
  );

  return result.insertId;
};

/**
 * Get all sector titles
 */
export const getAllSectorTitles = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM sector_title
     WHERE is_active = 1
     ORDER BY name ASC`,
  );
  return rows;
};

export const updateSectorTitle = async (id: number, data: any) => {
  await pool.query(
    `UPDATE sector_title
     SET name = ?,
         description = ?,
         info = ?,
         note = ?,
         system_note = ?,
         icon_name = ?,
         link = ?,
         image = COALESCE(?, image),
         status = ?
     WHERE id = ?`,
    [
      data.name,
      data.description || null,
      data.info || null,
      data.note || null,
      data.system_note || null,
      data.icon_name,
      data.link,
      data.image_path || null, // ✅ only updates if new image
      data.status,
      id,
    ],
  );
};

/**
 * Get sector title by ID
 */
export const getSectorTitleById = async (id: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM sector_title WHERE id = ? LIMIT 1`,
    [id],
  );
  return rows.length ? rows[0] : null;
};

/**
 * Link sector title with user
 */
export const linkSectorTitleToUser = async (
  sectorTitleId: number,
  userId: number,
  action: "created" | "updated" = "created",
) => {
  await pool.query(
    `INSERT INTO sector_title_users_link
     (sector_title_id, user_id, action)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE action = VALUES(action)`,
    [sectorTitleId, userId, action],
  );
};

export const deleteSectorTitle = async (id: number) => {
  await pool.query(`UPDATE sector_title SET is_active = 0 WHERE id = ?`, [id]);
};
