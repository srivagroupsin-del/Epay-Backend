import pool from "../../config/db";
import {
  CreateMultitabMenuDTO,
  UpdateMultitabMenuDTO,
  CreateMultitabTabDTO,
  UpdateMultitabTabDTO,
  CreateMultitabCheckboxDTO,
  UpdateMultitabCheckboxDTO,
  CreateMultitabMappingDTO,
} from "./multitab.types";

/* ================= MENUS ================= */
export const getMenus = async () => {
  const [rows] = await pool.query(`
    SELECT m.id, m.menu_title_id, m.menu_name, m.description, m.status, m.is_active,
           mt.menu_title AS menu_title_name
    FROM multitab_menus m
    LEFT JOIN menu_title mt ON m.menu_title_id = mt.id
    WHERE m.is_active = 1
    ORDER BY m.menu_name ASC
  `);
  return rows;
};

export const getMenuById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM multitab_menus WHERE id = ? AND is_active = 1 LIMIT 1`,
    [id]
  );
  return row || null;
};

export const createMenu = async (data: CreateMultitabMenuDTO) => {
  const [result]: any = await pool.query(
    `INSERT INTO multitab_menus (menu_title_id, menu_name, description, status)
     VALUES (?, ?, ?, ?)`,
    [data.menu_title_id, data.menu_name, data.description || null, data.status]
  );
  return result.insertId;
};

export const updateMenu = async (id: number, data: UpdateMultitabMenuDTO) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.menu_title_id !== undefined) {
    fields.push("menu_title_id = ?");
    values.push(data.menu_title_id);
  }
  if (data.menu_name !== undefined) {
    fields.push("menu_name = ?");
    values.push(data.menu_name);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) return;

  values.push(id);
  await pool.query(
    `UPDATE multitab_menus SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
};

export const deleteMenu = async (id: number) => {
  await pool.query(`UPDATE multitab_menus SET is_active = 0 WHERE id = ?`, [id]);
};


/* ================= TABS ================= */
export const getTabs = async () => {
  const [rows] = await pool.query(`
    SELECT t.id, t.menu_id, t.tab_name, t.tab_title, t.description, t.image, t.status, t.is_active,
           m.menu_name AS menu_name
    FROM multitab_tabs t
    LEFT JOIN multitab_menus m ON t.menu_id = m.id
    WHERE t.is_active = 1
    ORDER BY t.tab_name ASC
  `);
  return rows;
};

export const getTabById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM multitab_tabs WHERE id = ? AND is_active = 1 LIMIT 1`,
    [id]
  );
  return row || null;
};

export const createTab = async (data: CreateMultitabTabDTO) => {
  const [result]: any = await pool.query(
    `INSERT INTO multitab_tabs (menu_id, tab_name, tab_title, description, image, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.menu_id,
      data.tab_name,
      data.tab_title,
      data.description || null,
      data.image || null,
      data.status,
    ]
  );
  return result.insertId;
};

export const updateTab = async (id: number, data: UpdateMultitabTabDTO) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.menu_id !== undefined) {
    fields.push("menu_id = ?");
    values.push(data.menu_id);
  }
  if (data.tab_name !== undefined) {
    fields.push("tab_name = ?");
    values.push(data.tab_name);
  }
  if (data.tab_title !== undefined) {
    fields.push("tab_title = ?");
    values.push(data.tab_title);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  if (data.image !== undefined) {
    fields.push("image = COALESCE(?, image)");
    values.push(data.image);
  }
  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) return;

  values.push(id);
  await pool.query(
    `UPDATE multitab_tabs SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
};

export const deleteTab = async (id: number) => {
  await pool.query(`UPDATE multitab_tabs SET is_active = 0 WHERE id = ?`, [id]);
};


/* ================= CHECKBOXES ================= */
export const getCheckboxes = async () => {
  const [rows] = await pool.query(`
    SELECT c.id, c.label, c.files, c.description, c.status, c.is_active,
           GROUP_CONCAT(t.tab_name ORDER BY t.tab_name ASC SEPARATOR ', ') AS tab_names
    FROM multitab_checkboxes c
    LEFT JOIN multitab_mappings map ON c.id = map.checkbox_id AND map.is_active = 1
    LEFT JOIN multitab_tabs t ON map.tab_id = t.id AND t.is_active = 1
    WHERE c.is_active = 1
    GROUP BY c.id
    ORDER BY c.label ASC
  `);
  return rows;
};

export const getCheckboxById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT * FROM multitab_checkboxes WHERE id = ? AND is_active = 1 LIMIT 1`,
    [id]
  );
  return row || null;
};

export const createCheckbox = async (data: CreateMultitabCheckboxDTO) => {
  const filesJson = data.files ? JSON.stringify(data.files) : null;
  const [result]: any = await pool.query(
    `INSERT INTO multitab_checkboxes (label, files, description, status)
     VALUES (?, ?, ?, ?)`,
    [data.label, filesJson, data.description || null, data.status]
  );
  return result.insertId;
};

export const updateCheckbox = async (id: number, data: UpdateMultitabCheckboxDTO) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.label !== undefined) {
    fields.push("label = ?");
    values.push(data.label);
  }
  if (data.files !== undefined) {
    fields.push("files = ?");
    values.push(JSON.stringify(data.files));
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) return;

  values.push(id);
  await pool.query(
    `UPDATE multitab_checkboxes SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
};

export const deleteCheckbox = async (id: number) => {
  await pool.query(`UPDATE multitab_checkboxes SET is_active = 0 WHERE id = ?`, [id]);
};


/* ================= MAPPINGS ================= */
export const getMappings = async () => {
  const [rows] = await pool.query(`
    SELECT map.id, map.tab_id, map.checkbox_id, map.status, map.is_active,
           t.tab_name AS tab_name,
           c.label AS checkbox_label,
           c.files AS checkbox_files,
           c.description AS checkbox_description
    FROM multitab_mappings map
    LEFT JOIN multitab_tabs t ON map.tab_id = t.id
    LEFT JOIN multitab_checkboxes c ON map.checkbox_id = c.id
    WHERE map.is_active = 1
      AND t.is_active = 1
      AND c.is_active = 1
  `);
  return rows;
};

export const getMappingsByTabId = async (tabId: number) => {
  const [rows] = await pool.query(`
    SELECT map.id, map.tab_id, map.checkbox_id, map.status, map.is_active,
           t.tab_name AS tab_name,
           c.label AS checkbox_label,
           c.files AS checkbox_files,
           c.description AS checkbox_description
    FROM multitab_mappings map
    LEFT JOIN multitab_tabs t ON map.tab_id = t.id
    LEFT JOIN multitab_checkboxes c ON map.checkbox_id = c.id
    WHERE map.tab_id = ?
      AND map.is_active = 1
      AND c.is_active = 1
  `, [tabId]);
  return rows;
};

export const createMapping = async (data: CreateMultitabMappingDTO) => {
  const [result]: any = await pool.query(
    `INSERT INTO multitab_mappings (tab_id, checkbox_id, status)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE is_active = 1, status = VALUES(status)`,
    [data.tab_id, data.checkbox_id, data.status || "active"]
  );
  return result.insertId;
};

export const deleteMapping = async (id: number) => {
  await pool.query(`UPDATE multitab_mappings SET is_active = 0 WHERE id = ?`, [id]);
};

export const deleteMappingByTabAndCheckbox = async (tabId: number, checkboxId: number) => {
  await pool.query(
    `UPDATE multitab_mappings SET is_active = 0 WHERE tab_id = ? AND checkbox_id = ?`,
    [tabId, checkboxId]
  );
};

export const removeMappingsForTabExcept = async (tabId: number, checkboxIds: number[]) => {
  if (checkboxIds.length === 0) {
    await pool.query(
      `UPDATE multitab_mappings SET is_active = 0 WHERE tab_id = ?`,
      [tabId]
    );
  } else {
    await pool.query(
      `UPDATE multitab_mappings SET is_active = 0 WHERE tab_id = ? AND checkbox_id NOT IN (?)`,
      [tabId, checkboxIds]
    );
  }
};
