import * as repo from "./multitab-fields.repository";
import { logAudit } from "../audit/audit.service";

export const createField = async (d: any, u: number) => {
  const id = await repo.createField(d);
  await logAudit({
    user_id: u,
    module: "multitab_fields",
    record_id: id,
    action: "create",
  });
  return { id };
};

export const getFields = repo.getFields;
export const getFieldById = repo.getFieldById;

export const updateField = async (id: number, d: any, u: number) => {
  await repo.updateField(id, d);
  await logAudit({
    user_id: u,
    module: "multitab_fields",
    record_id: id,
    action: "update",
  });
};

export const deleteField = async (id: number, u: number) => {
  await repo.deleteField(id);
  await logAudit({
    user_id: u,
    module: "multitab_fields",
    record_id: id,
    action: "delete",
  });
};

export const getFieldsForUI = async (d: any) => {
  const checkbox_ids = d.checkbox_ids || [];

  return await repo.getFieldsForSelection(d.heading_id, checkbox_ids);
};
