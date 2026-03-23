import { logAudit } from "../audit/audit.service";
import { VariantsRepository } from "./varients_repository";

export class VariantsService {

  private repo = new VariantsRepository();

  async createVariant(data: any, userId: number) {

    if (!data.name) {
    throw new Error("Variant name is required");
  }

  if (!data.value) {
    throw new Error("Variant value is required");
  }
  
    const id = await this.repo.createVariant(data);

    await logAudit({
      user_id: userId,
      module: "variants_fields",
      record_id: id,
      action: "create",
      new_data: data
    });

    return id;
  }

  async getAllVariants() {
    return await this.repo.getAllVariants();
  }

  async getVariantById(id: number) {
    return await this.repo.getVariantById(id);
  }

  async updateVariant(id: number, data: any, userId: number) {

    const oldData = await this.repo.getVariantById(id);

    await this.repo.updateVariant(id, data);

    await logAudit({
      user_id: userId,
      module: "variants_fields",
      record_id: id,
      action: "update",
      old_data: oldData,
      new_data: data
    });

    return true;
  }

  async deleteVariant(id: number, userId: number) {

    const oldData = await this.repo.getVariantById(id);

    await this.repo.deleteVariant(id);

    await logAudit({
      user_id: userId,
      module: "variants_fields",
      record_id: id,
      action: "delete",
      old_data: oldData,
      new_data: null
    });

    return true;
  }
}