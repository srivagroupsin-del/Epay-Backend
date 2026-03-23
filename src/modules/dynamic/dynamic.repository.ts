import pool from "../../config/db";
import { safeJsonParse } from "../../utils/json.helper";

/* ================= PAGE ================= */

export const getPages = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM dynamic_pages
     WHERE is_active = 1
     ORDER BY id DESC`,
  );
  return rows;
};

export const createPage = async (data: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO dynamic_pages (folder_name,route_link,title,url,info)
     VALUES (?,?,?,?,?)`,
    [data.folder_name, data.route_link, data.title, data.url, data.info],
  );
  return r.insertId;
};

export const updatePage = async (id: number, data: any) => {
  await pool.query(
    `UPDATE dynamic_pages SET folder_name=?, route_link=?, title=?, url=?, info=? WHERE id=?`,
    [data.folder_name, data.route_link, data.title, data.url, data.info, id],
  );
};

/* ================= TABLE ================= */
export const createTable = async (data: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO dynamic_tables (dynamic_page_id, table_name) VALUES (?,?)`,
    [data.dynamic_page_id, data.table_name],
  );
  return r.insertId;
};

export const updateTable = async (id: number, name: string) => {
  await pool.query(`UPDATE dynamic_tables SET table_name=? WHERE id=?`, [
    name,
    id,
  ]);
};

/* ================= FIELD ================= */
export const createField = async (data: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO dynamic_fields
     (dynamic_table_id,label,field_name,field_type,placeholder,is_required)
     VALUES (?,?,?,?,?,?)`,
    [
      data.dynamic_table_id,
      data.label,
      data.field_name,
      data.field_type,
      data.placeholder,
      data.is_required,
    ],
  );
  return r.insertId;
};

export const updateField = async (id: number, data: any) => {
  await pool.query(
    `UPDATE dynamic_fields SET label=?, field_name=?, field_type=?, placeholder=?, is_required=? WHERE id=?`,
    [
      data.label,
      data.field_name,
      data.field_type,
      data.placeholder,
      data.is_required,
      id,
    ],
  );
};

/* ================= OPTIONS ================= */
export const createOption = async (data: any) => {
  await pool.query(
    `INSERT INTO dynamic_field_options (field_id,option_value,option_label,is_default)
     VALUES (?,?,?,?)`,
    [data.field_id, data.option_value, data.option_label, data.is_default],
  );
};

export const updateOption = async (id: number, data: any) => {
  await pool.query(
    `UPDATE dynamic_field_options SET option_value=?, option_label=?, is_default=? WHERE id=?`,
    [data.option_value, data.option_label, data.is_default, id],
  );
};

/* ================= RECORD ================= */
export const createRecord = async (
  tableId: number,
  data: any,
  userId: number,
) => {
  const [r]: any = await pool.query(
    `INSERT INTO dynamic_table_records (dynamic_table_id,submitted_by,data)
     VALUES (?,?,?)`,
    [tableId, userId, JSON.stringify(data)],
  );
  return r.insertId;
};

export const updateRecord = async (id: number, data: any) => {
  await pool.query(`UPDATE dynamic_table_records SET data=? WHERE id=?`, [
    JSON.stringify(data),
    id,
  ]);
};

export const getTablesByPage = async (pageId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM dynamic_tables WHERE dynamic_page_id=? AND is_active=1`,
    [pageId],
  );

  return rows.map((r: any) => ({
    ...r,
    // Replace 'config' with the actual JSON column name in dynamic_tables
    config: safeJsonParse(r.config),
  }));
};

export const getFieldsByTable = async (tableId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM dynamic_fields WHERE dynamic_table_id=? AND is_active=1`,
    [tableId],
  );

  return rows.map((r: any) => ({
    ...r,
    // Replace 'validation' or 'attributes' with your actual JSON column(s)
    validation: safeJsonParse(r.validation),
    attributes: safeJsonParse(r.attributes),
  }));
};

export const getOptionsByField = async (fieldId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM dynamic_field_options WHERE field_id=? AND is_active=1`,
    [fieldId],
  );

  return rows.map((r: any) => ({
    ...r,
    // Replace 'meta' with actual JSON column if you have one, otherwise this is fine
    meta: safeJsonParse(r.meta),
  }));
};

export const getRecordsByTable = async (tableId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM dynamic_table_records 
     WHERE dynamic_table_id = ? 
       AND is_active = 1
     ORDER BY id DESC`,
    [tableId],
  );

  // This one was already correct in your snippet
  return rows.map((r: any) => ({
    ...r,
    data: safeJsonParse(r.data),
  }));
};

export const softDeletePage = async (id: number) => {
  await pool.query(
    `UPDATE dynamic_pages 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const softDeleteTable = async (id: number) => {
  await pool.query(
    `UPDATE dynamic_tables 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const softDeleteField = async (id: number) => {
  await pool.query(
    `UPDATE dynamic_fields 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const softDeleteOption = async (id: number) => {
  await pool.query(
    `UPDATE dynamic_field_options 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const softDeleteRecord = async (id: number) => {
  await pool.query(
    `UPDATE dynamic_table_records 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};