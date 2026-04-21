import pool from "../../config/db";
import { RowDataPacket } from "mysql2";

/* 🔧 SAFE JSON PARSE */
const parseOptions = (opt: any) => {
  if (!opt) return null;

  try {
    return typeof opt === "string" ? JSON.parse(opt) : opt;
  } catch {
    return null;
  }
};

/* CREATE FIELD */
export const createField = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_fields 
    (field_name, display_name, field_type, field_scope, checkbox_id, is_required, options)
    VALUES (?,?,?,?,?,?,?)`,
    [
      d.field_name,
      d.display_name,
      d.field_type,
      d.field_scope,
      d.checkbox_id || null,
      d.is_required || 0,
      d.options ? JSON.stringify(d.options) : null,
    ],
  );

  return r.insertId;
};

/* GET FIELDS (ADMIN LIST) */
export const getFields = async (checkbox_ids: number[] = []) => {
  let q = `
    SELECT * FROM multitab_fields 
    WHERE is_active=1
  `;

  let rows: RowDataPacket[];

  if (checkbox_ids.length > 0) {
    q += ` AND (field_scope='global' OR checkbox_id IN (?))`;
    const [r] = await pool.query<RowDataPacket[]>(q, [checkbox_ids]);
    rows = r;
  } else {
    const [r] = await pool.query<RowDataPacket[]>(q);
    rows = r;
  }

  return rows.map((r: any) => ({
    ...r,
    options: parseOptions(r.options), // ✅ SAFE
  }));
};

/* GET FIELD BY ID */
export const getFieldById = async (id: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM multitab_fields WHERE id=?`,
    [id],
  );

  return rows.map((r: any) => ({
    ...r,
    options: parseOptions(r.options), // ✅ SAFE
  }));
};

/* UPDATE FIELD */
export const updateField = async (id: number, d: any) => {
  return pool.query(
    `UPDATE multitab_fields SET
     field_name=COALESCE(?,field_name),
     display_name=COALESCE(?,display_name),
     field_type=COALESCE(?,field_type),
     field_scope=COALESCE(?,field_scope),
     checkbox_id=COALESCE(?,checkbox_id),
     is_required=COALESCE(?,is_required),
     options=COALESCE(?,options)
     WHERE id=?`,
    [
      d.field_name ?? null,
      d.display_name ?? null,
      d.field_type ?? null,
      d.field_scope ?? null,
      d.checkbox_id ?? null,
      d.is_required ?? null,
      d.options ? JSON.stringify(d.options) : null,
      id,
    ],
  );
};

/* DELETE (SOFT DELETE) */
export const deleteField = (id: number) =>
  pool.query(`UPDATE multitab_fields SET is_active=0 WHERE id=?`, [id]);

/* 🔥 MAIN FIELD FETCH FOR PRODUCT UI */
export const getFieldsForSelection = async (
  heading_id: number,
  checkbox_ids: number[],
) => {
  const [rows]: any = await pool.query(
    `
    SELECT f.*, c.label_name
    FROM multitab_fields f
    LEFT JOIN multitab_checkbox_master c ON c.id = f.checkbox_id
    WHERE 
      f.is_active=1
      AND (
        f.field_scope = 'global'
        OR f.checkbox_id IN (?)
      )
    ORDER BY f.sort_order ASC
    `,
    [checkbox_ids.length ? checkbox_ids : [-1]], // ✅ safe fallback
  );

  return rows.map((r: any) => ({
    ...r,
    options: parseOptions(r.options), // ✅ SAFE
  }));
};
