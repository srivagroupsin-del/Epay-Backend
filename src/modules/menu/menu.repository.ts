import pool from "../../config/db";

/* ================= MENU TITLE ================= */

export const createMenuTitle = async (menu_title: string) => {
  const [result]: any = await pool.query(
    `INSERT INTO menu_title (menu_title) VALUES (?)`,
    [menu_title],
  );
  return result.insertId;
};

export const getMenuTitles = async () => {
  const [rows] = await pool.query(
    `SELECT id,menu_title,status
     FROM menu_title
     WHERE is_active = 1
     ORDER BY id DESC`,
  );
  return rows;
};

export const updateMenuTitle = async (id: number, menu_title: string) => {
  await pool.query(`UPDATE menu_title SET menu_title = ? WHERE id = ?`, [
    menu_title,
    id,
  ]);
};

/* ================= MENU FIELD ================= */

export const createMenuField = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO menu_fields
     (menu_title_id, page_title, itab, icon_name, link)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.menu_title_id,
      data.page_title,
      data.itab || null,
      data.icon_name || null,
      data.link,
    ],
  );
  return result.insertId;
};

export const getAllMenuFields = async () => {
  const [rows] = await pool.query(
    `SELECT id,menu_title_id,page_title,itab,icon_name,icon_image,link,status
     FROM menu_fields
     WHERE is_active = 1
     ORDER BY id DESC`,
  );
  return rows;
};

export const updateMenuField = async (id: number, data: any) => {
  await pool.query(
    `UPDATE menu_fields
     SET page_title = ?,
         itab = ?,
         icon_name = ?,
         link = ?,
         status = ?
     WHERE id = ?`,
    [
      data.page_title,
      data.itab || null,
      data.icon_name || null,
      data.link,
      data.status,
      id,
    ],
  );
};

/* ================= MENU PAGE ================= */

export const createMenuPage = async (data: any) => {
  const [result]: any = await pool.query(
    `INSERT INTO menu_page
     (page_title, itab,icon, icon_name, link)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.page_title,
      data.itab || null,
      data.icon || null,
      data.icon_name || null,
      data.link,
    ],
  );
  return result.insertId;
};

export const getMenuPages = async () => {
  const [rows] = await pool.query(
    `SELECT id,page_title,itab,icon_image,icon_name,link,status
     FROM menu_page
     WHERE is_active = 1`,
  );
  return rows;
};

export const updateMenuPage = async (id: number, data: any) => {
  await pool.query(
    `UPDATE menu_page
     SET page_title = ?,
         itab = ?,
         icon = ?,
         icon_name = ?,
         link = ?,
      
         status = ?
     WHERE id = ?`,
    [
      data.page_title,
      data.itab || null,
      data.icon || null,
      data.icon_name || null,
      data.link,

      data.status,
      id,
    ],
  );
};

/* ================= Mapping Menu titles and Menu OPERATIONS ================= */

export const mapMenuFieldToTitle = async (
  menu_title_id: number,
  menu_field_id: number,
) => {
  await pool.query(
    `INSERT INTO menu_title_menu_fields_mapping
     (menu_title_id, menu_field_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE is_active = 1`,
    [menu_title_id, menu_field_id],
  );
};

export const getMappedMenuFields = async (menuTitleId: number) => {
  const [rows] = await pool.query(
    `SELECT 
    mf.id,mf.menu_title_id,mf.page_title,mf.itab,mf.icon_image,mf.icon_name,mf.link,mf.status
    FROM menu_title_menu_fields_mapping m
    LEFT JOIN menu_fields mf
    ON mf.id = m.menu_field_id
    AND mf.is_active = 1
    WHERE m.menu_title_id = ?
    AND m.is_active = 1
    AND m.status = 'active'`,
    [menuTitleId],
  );
  return rows;
};

export const updateMenuMapping = async (
  id: number,
  data: {
    is_active?: number;
    status?: "active" | "inactive" | "blocked";
  },
) => {
  await pool.query(
    `UPDATE menu_title_menu_fields_mapping
     SET is_active = ?,
         status = ?
     WHERE id = ?`,
    [data.is_active ?? 1, data.status ?? "active", id],
  );
};

export const deleteMenuMapping = async (id: number) => {
  await pool.query(
    `UPDATE menu_title_menu_fields_mapping
     SET is_active = 0,
         status = 'inactive'
     WHERE id = ?`,
    [id],
  );
};

export const deleteMenuTitle = async (id: number) => {
  await pool.query(
    `UPDATE menu_title 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const deleteMenuField = async (id: number) => {
  await pool.query(
    `UPDATE menu_fields 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};

export const deleteMenuPage = async (id: number) => {
  await pool.query(
    `UPDATE menu_page 
     SET is_active = 0 
     WHERE id = ?`,
    [id]
  );
};