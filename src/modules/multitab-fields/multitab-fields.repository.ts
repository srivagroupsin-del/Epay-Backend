import pool from "../../config/db";

/* CREATE FIELD */
export const createField = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_fields 
    (field_name, display_name, field_type, field_scope, checkbox_id, is_required)
    VALUES (?,?,?,?,?,?)`,
    [
      d.field_name,
      d.display_name,
      d.field_type,
      d.field_scope,
      d.checkbox_id || null,
      d.is_required || 0,
    ],
  );
  return r.insertId;
};

/* GET FIELDS (GLOBAL + CHECKBOX) */
export const getFields = async (checkbox_ids: number[] = []) => {
  let q = `
    SELECT * FROM multitab_fields 
    WHERE is_active=1
  `;

  if (checkbox_ids.length > 0) {
    q += ` AND (field_scope='global' OR checkbox_id IN (?))`;
    return (await pool.query(q, [checkbox_ids]))[0];
  }

  return (await pool.query(q + ` AND field_scope='global'`))[0];
};

/* GET FIELD BY ID */
export const getFieldById = (id: number) =>
  pool
    .query(`SELECT * FROM multitab_fields WHERE id=?`, [id])
    .then((r) => r[0]);

/* UPDATE */
export const updateField = (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_fields SET
     field_name=COALESCE(?,field_name),
     display_name=COALESCE(?,display_name),
     field_type=COALESCE(?,field_type),
     checkbox_id=COALESCE(?,checkbox_id),
     is_required=COALESCE(?,is_required)
     WHERE id=?`,
    [
      d.field_name ?? null,
      d.display_name ?? null,
      d.field_type ?? null,
      d.checkbox_id ?? null,
      d.is_required ?? null,
      id,
    ],
  );

/* DELETE */
export const deleteField = (id: number) =>
  pool.query(`UPDATE multitab_fields SET is_active=0 WHERE id=?`, [id]);
