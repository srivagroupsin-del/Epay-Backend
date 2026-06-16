import db from "../../config/db";

export class TaxRepository {
  /* ================== TAX ================== */
  async createTax(data: any) {
    const [result] = await db.query(
      `INSERT INTO tax (module_id, tax_name, tax_code, description, status)
       VALUES (?, ?, ?, ?, ?)`,
      [data.module_id, data.tax_name, data.tax_code, data.description, data.status]
    );
    return result;
  }

  async getAllTaxes() {
    const [rows] = await db.query(
      `SELECT * FROM tax WHERE is_deleted = 0 ORDER BY id DESC`
    );
    return rows;
  }

  async getTaxById(id: number) {
    const [rows] = await db.query(
      `SELECT * FROM tax WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    return (rows as any[])[0] || null;
  }

  async updateTax(id: number, data: any) {
    const fields = Object.keys(data).map((k) => `${k} = ?`).join(", ");
    const values = Object.values(data);
    const [result] = await db.query(
      `UPDATE tax SET ${fields} WHERE id = ? AND is_deleted = 0`,
      [...values, id]
    );
    return result;
  }

  async softDeleteTax(id: number) {
    const [result] = await db.query(
      `UPDATE tax SET is_deleted = 1, deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    return result;
  }

  /* ================== TAX FIELDS ================== */
  async createTaxField(data: any) {
    const [result] = await db.query(
      `INSERT INTO tax_fields (tax_id, field_name, display_name, description, ui_type, data_type, placeholder, options, is_required, sort_order, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.tax_id, data.field_name, data.display_name, data.description, data.ui_type, data.data_type, data.placeholder, JSON.stringify(data.options), data.is_required, data.sort_order, data.status]
    );
    return result;
  }

  async getTaxFields() {
    const [rows] = await db.query(
      `SELECT * FROM tax_fields WHERE is_deleted = 0 ORDER BY sort_order ASC`
    );
    return rows;
  }

  async getTaxFieldById(id: number) {
    const [rows] = await db.query(
      `SELECT * FROM tax_fields WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    return (rows as any[])[0] || null;
  }

  async updateTaxField(id: number, data: any) {
    if (data.options !== undefined) {
      data.options = JSON.stringify(data.options);
    }
    const fields = Object.keys(data).map((k) => `${k} = ?`).join(", ");
    const values = Object.values(data);
    const [result] = await db.query(
      `UPDATE tax_fields SET ${fields} WHERE id = ? AND is_deleted = 0`,
      [...values, id]
    );
    return result;
  }

  async softDeleteTaxField(id: number) {
    const [result] = await db.query(
      `UPDATE tax_fields SET is_deleted = 1, deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    return result;
  }

  /* ================== TAX ASSIGNMENTS ================== */
  async createTaxAssignment(data: any) {
    const [result] = await db.query(
      `INSERT INTO tax_assignments (menu_title_id, tax_id, description, status)
       VALUES (?, ?, ?, ?)`,
      [data.menu_title_id, data.tax_id, data.description, data.status]
    );
    return result;
  }

  async getTaxAssignments() {
    const [rows] = await db.query(
      `SELECT ta.*, t.tax_name 
       FROM tax_assignments ta
       JOIN tax t ON ta.tax_id = t.id
       WHERE ta.is_deleted = 0 AND t.is_deleted = 0`
    );
    return rows;
  }

  async softDeleteTaxAssignment(id: number) {
    const [result] = await db.query(
      `UPDATE tax_assignments SET is_deleted = 1, deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    return result;
  }

  /* ================== TAX VALUES ================== */
  async createTaxValue(data: any) {
    const [existing] = await db.query(
      `SELECT id FROM tax_values WHERE menu_title_id = ? AND tax_field_id = ? AND is_deleted = 0`,
      [data.menu_title_id, data.tax_field_id]
    );

    if ((existing as any[]).length > 0) {
      const [result] = await db.query(
        `UPDATE tax_values SET value = ?, description = ? WHERE id = ?`,
        [data.value, data.description, (existing as any[])[0].id]
      );
      return result;
    }

    const [result] = await db.query(
      `INSERT INTO tax_values (menu_title_id, tax_field_id, value, description)
       VALUES (?, ?, ?, ?)`,
      [data.menu_title_id, data.tax_field_id, data.value, data.description]
    );
    return result;
  }

  async getTaxValues() {
    const [rows] = await db.query(
      `SELECT * FROM tax_values WHERE is_deleted = 0`
    );
    return rows;
  }

  async getTaxValuesByMenuTitleIds(menuTitleIds: number[]) {
    if (!menuTitleIds || menuTitleIds.length === 0) return [];
    
    const placeholders = menuTitleIds.map(() => "?").join(",");
    const [rows] = await db.query(
      `SELECT * FROM tax_values WHERE menu_title_id IN (${placeholders}) AND is_deleted = 0`,
      [...menuTitleIds]
    );
    return rows;
  }


}

export const taxRepository = new TaxRepository();
