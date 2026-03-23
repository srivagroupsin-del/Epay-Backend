import pool from "../../config/db";

export class VariantsRepository {

  async createVariant(data: any) {
    const query = `
      INSERT INTO variants_fields (name, value)
      VALUES (?, ?)
    `;

    const [result]: any = await pool.query(query, [
      data.name,
      data.value,
    ]);

    return result.insertId;
  }

  async getAllVariants() {
    const query = `
      SELECT *
      FROM variants_fields
      WHERE is_active = 1
      ORDER BY id DESC
    `;

    const [rows] = await pool.query(query);
    return rows;
  }

  async getVariantById(id: number) {
    const query = `
      SELECT *
      FROM variants_fields
      WHERE id = ? AND is_active = 1
    `;

    const [rows]: any = await pool.query(query, [id]);
    return rows[0];
  }

  async updateVariant(id: number, data: any) {
    const query = `
      UPDATE variants_fields
      SET name = ?, value = ?, status = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [
      data.name,
      data.value,
      data.status,
      id
    ]);

    return result;
  }

  async deleteVariant(id: number) {
    const query = `
      UPDATE variants_fields
      SET is_active = 0
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [id]);
    return result;
  }
}