import * as repo from "./dynamic.repository";
import { logAudit } from "../audit/audit.service";

/* ================= PAGE ================= */

export const getPages = async () => {
  return repo.getPages();
};

export const createDynamicPage = async (data:any, userId:number) => {
  const id = await repo.createPage(data);
  await logAudit({ user_id:userId, module:"dynamic_page", record_id:id, action:"create", new_data:data });
  return { id };
};

export const updatePage = async (id:number, data:any, userId:number) => {
  await repo.updatePage(id, data);
  await logAudit({ user_id:userId, module:"dynamic_page", record_id:id, action:"update", new_data:data });
};

export const deletePage = async (id:number, userId:number) => {
  await repo.softDeletePage(id);
  await logAudit({ user_id:userId, module:"dynamic_page", record_id:id, action:"delete" });
};

/* ================= TABLE ================= */
export const createDynamicTable = async (data:any, userId:number) => {
  const id = await repo.createTable(data);
  await logAudit({ user_id:userId, module:"dynamic_table", record_id:id, action:"create", new_data:data });
  return { id };
};

export const updateTable = async (id:number, data:any, userId:number) => {
  await repo.updateTable(id, data.table_name);
  await logAudit({ user_id:userId, module:"dynamic_table", record_id:id, action:"update", new_data:data });
};

export const deleteTable = async (id:number, userId:number) => {
  await repo.softDeleteTable(id);
  await logAudit({ user_id:userId, module:"dynamic_table", record_id:id, action:"delete" });
};

/* ================= FIELD ================= */
export const createDynamicField = async (data:any, userId:number) => {
  const id = await repo.createField(data);
  await logAudit({ user_id:userId, module:"dynamic_field", record_id:id, action:"create", new_data:data });
  return { id };
};

export const updateField = async (id:number, data:any, userId:number) => {
  await repo.updateField(id, data);
  await logAudit({ user_id:userId, module:"dynamic_field", record_id:id, action:"update", new_data:data });
};

export const deleteField = async (id:number, userId:number) => {
  await repo.softDeleteField(id);
  await logAudit({ user_id:userId, module:"dynamic_field", record_id:id, action:"delete" });
};

/* ================= OPTIONS ================= */
export const createOption = async (data:any, userId:number) => {
  await repo.createOption(data);
  await logAudit({ user_id:userId, module:"dynamic_field_option", record_id:data.field_id, action:"create", new_data:data });
};

export const updateOption = async (id:number, data:any, userId:number) => {
  await repo.updateOption(id, data);
  await logAudit({ user_id:userId, module:"dynamic_field_option", record_id:id, action:"update", new_data:data });
};

export const deleteOption = async (id:number, userId:number) => {
  await repo.softDeleteOption(id);
  await logAudit({ user_id:userId, module:"dynamic_field_option", record_id:id, action:"delete" });
};

/* ================= RECORD ================= */
export const submitDynamicForm = async (tableId:number, data:any, userId:number) => {
  const id = await repo.createRecord(tableId, data, userId);
  await logAudit({ user_id:userId, module:"dynamic_record", record_id:id, action:"create", new_data:data });
};

export const updateRecord = async (id:number, data:any, userId:number) => {
  await repo.updateRecord(id, data);
  await logAudit({ user_id:userId, module:"dynamic_record", record_id:id, action:"update", new_data:data });
};

export const deleteRecord = async (id:number, userId:number) => {
  await repo.softDeleteRecord(id);
  await logAudit({ user_id:userId, module:"dynamic_record", record_id:id, action:"delete" });
};

/* ================= GET HELPERS ================= */

export const getTablesByPage = async (pageId: number) => {
  return repo.getTablesByPage(pageId);
};

export const getFieldsByTable = async (tableId: number) => {
  return repo.getFieldsByTable(tableId);
};

export const getOptionsByField = async (fieldId: number) => {
  return repo.getOptionsByField(fieldId);
};

export const getRecordsByTable = async (tableId: number) => {
  return repo.getRecordsByTable(tableId);
};
