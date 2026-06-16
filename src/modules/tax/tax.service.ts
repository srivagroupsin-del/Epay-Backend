import { taxRepository } from "./tax.repository";
import db from "../../config/db";

export class TaxService {
  /* ================== TAX ================== */
  async createTax(data: any) {
    return await taxRepository.createTax(data);
  }

  async getAllTaxes() {
    return await taxRepository.getAllTaxes();
  }

  async getTaxById(id: number) {
    return await taxRepository.getTaxById(id);
  }

  async updateTax(id: number, data: any) {
    return await taxRepository.updateTax(id, data);
  }

  async deleteTax(id: number) {
    return await taxRepository.softDeleteTax(id);
  }

  /* ================== TAX FIELDS ================== */
  async createTaxField(data: any) {
    return await taxRepository.createTaxField(data);
  }

  async getTaxFields() {
    return await taxRepository.getTaxFields();
  }

  async getTaxFieldById(id: number) {
    return await taxRepository.getTaxFieldById(id);
  }

  async updateTaxField(id: number, data: any) {
    return await taxRepository.updateTaxField(id, data);
  }

  async deleteTaxField(id: number) {
    return await taxRepository.softDeleteTaxField(id);
  }

  /* ================== TAX ASSIGNMENTS ================== */
  async createTaxAssignment(data: any) {
    return await taxRepository.createTaxAssignment(data);
  }

  async getTaxAssignments() {
    return await taxRepository.getTaxAssignments();
  }

  async deleteTaxAssignment(id: number) {
    return await taxRepository.softDeleteTaxAssignment(id);
  }

  /* ================== TAX VALUES ================== */
  async createTaxValue(data: any) {
    return await taxRepository.createTaxValue(data);
  }

  async getTaxValues() {
    return await taxRepository.getTaxValues();
  }

  /* ================== PRODUCT TAX PREFILL ================== */
  async getProductTaxPrefill(category_id: number) {
    // 1. Resolve Hierarchy
    let menuTitleIds: number[] = [];

    const [catRows] = await db.query(
      `SELECT c.id as category_id, ss.id as sub_sector_id, s.id as sector_id, st.id as sector_title_id
       FROM categories c
       LEFT JOIN sub_sectors ss ON c.sub_sector_id = ss.id
       LEFT JOIN sectors s ON ss.sector_id = s.id
       LEFT JOIN sector_title st ON s.sector_title_id = st.id
       WHERE c.id = ? AND c.is_deleted = 0`,
      [category_id]
    );

    if ((catRows as any[]).length > 0) {
      const row = (catRows as any[])[0];
      // Push in ascending order of priority (lower index = lower priority)
      if (row.sector_title_id) menuTitleIds.push(row.sector_title_id);
      if (row.sector_id) menuTitleIds.push(row.sector_id);
      if (row.sub_sector_id) menuTitleIds.push(row.sub_sector_id);
      if (row.category_id) menuTitleIds.push(row.category_id);
    }

    // 2. Fetch inherited values
    const inheritedValues = await taxRepository.getTaxValuesByMenuTitleIds(menuTitleIds);
    
    // 3. Resolve Priority (Later overrides earlier)
    const prefillMap: Record<number, any> = {};
    
    for (const menuId of menuTitleIds) {
      const valuesForMenu = (inheritedValues as any[]).filter(v => v.menu_title_id === menuId);
      for (const val of valuesForMenu) {
        prefillMap[val.tax_field_id] = val.value;
      }
    }

    return prefillMap;
  }
}

export const taxService = new TaxService();
