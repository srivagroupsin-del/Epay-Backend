import pool from "../../config/db";

/* MENU */
export const createMenu = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_menu (menu_title_id, tab_name, status)
     VALUES (?, ?, ?)`,
    [d.menu_title_id, d.tab_name, d.status || "active"],
  );
  return r.insertId;
};

export const getMenus = async (status?: string) => {
  let q = `SELECT * FROM multitab_menu WHERE is_active=1`;
  const p: any[] = [];
  if (status) {
    q += ` AND status=?`;
    p.push(status);
  }
  return (await pool.query(q, p))[0];
};

export const getMenuById = async (id: number) =>
  (await pool.query(`SELECT * FROM multitab_menu WHERE id=?`, [id]))[0];

export const updateMenu = (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_menu SET 
     menu_title_id=COALESCE(?,menu_title_id),
     tab_name=COALESCE(?,tab_name),
     status=COALESCE(?,status)
     WHERE id=?`,
    [d.menu_title_id ?? null, d.tab_name ?? null, d.status ?? null, id],
  );

export const deleteMenu = (id: number) =>
  pool.query(`UPDATE multitab_menu SET is_active=0 WHERE id=?`, [id]);

/* HEADING */
export const createHeading = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_heading_master 
    (multitab_menu_id, heading_name, title_name, description, image, status)
    VALUES (?,?,?,?,?,?)`,
    [
      d.multitab_menu_id,
      d.heading_name,
      d.title_name,
      d.description,
      d.image,
      d.status || "active",
    ],
  );
  return r.insertId;
};

export const getHeadingsByTab = async (id: number, status?: string) => {
  let q = `SELECT * FROM multitab_heading_master WHERE multitab_menu_id=? AND is_active=1`;
  const p: any[] = [id];
  if (status) {
    q += ` AND status=?`;
    p.push(status);
  }
  return (await pool.query(q, p))[0];
};

export const getAllHeadings = async (status?: string) => {
  let q = `SELECT * FROM multitab_heading_master WHERE is_active=1`;
  const p: any[] = [];
  if (status) {
    q += ` AND status=?`;
    p.push(status);
  }
  return (await pool.query(q, p))[0];
};

export const getHeadingById = (id: number) =>
  pool
    .query(`SELECT * FROM multitab_heading_master WHERE id=?`, [id])
    .then((r) => r[0]);

export const updateHeading = (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_heading_master SET
     heading_name=COALESCE(?,heading_name),
     title_name=COALESCE(?,title_name),
     description=COALESCE(?,description),
     image=COALESCE(?,image),
     status=COALESCE(?,status)
     WHERE id=?`,
    [
      d.heading_name ?? null,
      d.title_name ?? null,
      d.description ?? null,
      d.image ?? null,
      d.status ?? null,
      id,
    ],
  );

export const deleteHeading = (id: number) =>
  pool.query(`UPDATE multitab_heading_master SET is_active=0 WHERE id=?`, [id]);

/* CHECKBOX */
export const createCheckbox = async (d: any) => {
  const [r]: any = await pool.query(
    `INSERT INTO multitab_checkbox_master (label_name,is_checked,status)
     VALUES (?,?,?)`,
    [d.label_name, d.is_checked || 0, d.status || "active"],
  );
  return r.insertId;
};

export const getCheckboxes = async (status?: string) => {
  let q = `SELECT * FROM multitab_checkbox_master WHERE is_active=1`;
  const p: any[] = [];
  if (status) {
    q += ` AND status=?`;
    p.push(status);
  }
  return (await pool.query(q, p))[0];
};

export const getCheckboxById = (id: number) =>
  pool
    .query(`SELECT * FROM multitab_checkbox_master WHERE id=?`, [id])
    .then((r) => r[0]);

export const updateCheckbox = (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_checkbox_master SET
     label_name=COALESCE(?,label_name),
     is_checked=COALESCE(?,is_checked),
     status=COALESCE(?,status)
     WHERE id=?`,
    [d.label_name ?? null, d.is_checked ?? null, d.status ?? null, id],
  );

export const deleteCheckbox = (id: number) =>
  pool.query(`UPDATE multitab_checkbox_master SET is_active=0 WHERE id=?`, [
    id,
  ]);

/* MAPPING */
export const mapCheckboxBulk = async (d: any) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `UPDATE multitab_mapping SET is_active=0 WHERE heading_id=?`,
      [d.heading_id],
    );

    const values = d.checkbox_ids.map((cid: number) => [d.heading_id, cid]);

    await conn.query(
      `INSERT INTO multitab_mapping (heading_id,checkbox_id) VALUES ?`,
      [values],
    );

    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};

export const getMappingByHeading = async () =>
  (
    await pool.query(
      `SELECT m.*,c.label_name 
     FROM multitab_mapping m
     LEFT JOIN multitab_checkbox_master c ON c.id=m.checkbox_id
     WHERE m.is_active=1 AND c.is_active=1`,
    )
  )[0];

export const updateMapping = (id: number, d: any) =>
  pool.query(
    `UPDATE multitab_mapping SET
     heading_id=COALESCE(?,heading_id),
     checkbox_id=COALESCE(?,checkbox_id)
     WHERE id=?`,
    [d.heading_id ?? null, d.checkbox_id ?? null, id],
  );

export const deleteMapping = (id: number) =>
  pool.query(`UPDATE multitab_mapping SET is_active=0 WHERE id=?`, [id]);
