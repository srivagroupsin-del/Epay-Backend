import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./dynamic.service";

/* ================= PAGE ================= */
export const createPage = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  const data = await service.createDynamicPage(req.body, req.user.id);
  res.json({ success: true, data });
};

export const getPages = async (_: AuthRequest, res: Response) => {
  const data = await service.getPages();
  res.json({ success: true, data });
};

export const updatePage = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.updatePage(Number(req.params.id), req.body, req.user.id);
  res.json({ success: true });
};

export const deletePage = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.deletePage(Number(req.params.id), req.user.id);
  res.json({ success: true });
};

/* ================= TABLE ================= */
export const createTable = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  const data = await service.createDynamicTable(req.body, req.user.id);
  res.json({ success: true, data });
};

export const updateTable = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.updateTable(Number(req.params.id), req.body, req.user.id);
  res.json({ success: true });
};

export const deleteTable = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.deleteTable(Number(req.params.id), req.user.id);
  res.json({ success: true });
};

/* ================= FIELD ================= */
export const createField = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  const data = await service.createDynamicField(req.body, req.user.id);
  res.json({ success: true, data });
};

export const updateField = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.updateField(Number(req.params.id), req.body, req.user.id);
  res.json({ success: true });
};

export const deleteField = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.deleteField(Number(req.params.id), req.user.id);
  res.json({ success: true });
};

/* ================= OPTIONS ================= */
export const addOption = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.createOption(req.body, req.user.id);
  res.json({ success: true });
};

export const updateOption = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.updateOption(Number(req.params.id), req.body, req.user.id);
  res.json({ success: true });
};

export const deleteOption = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.deleteOption(Number(req.params.id), req.user.id);
  res.json({ success: true });
};

/* ================= RECORD ================= */
export const submitRecord = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.submitDynamicForm(
    Number(req.params.tableId),
    req.body,
    req.user.id
  );
  res.json({ success: true });
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.updateRecord(Number(req.params.id), req.body, req.user.id);
  res.json({ success: true });
};

export const deleteRecord = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  await service.deleteRecord(Number(req.params.id), req.user.id);
  res.json({ success: true });
};

/* ================= GET TABLES ================= */
export const getTablesByPage = async (req: AuthRequest, res: Response) => {
  const pageId = Number(req.params.pageId);

  if (!pageId) {
    return res.status(400).json({ success: false, message: "pageId required" });
  }

  const data = await service.getTablesByPage(pageId);
  res.json({ success: true, data });
};

/* ================= GET FIELDS ================= */
export const getFieldsByTable = async (req: AuthRequest, res: Response) => {
  const tableId = Number(req.params.tableId);

  if (!tableId) {
    return res.status(400).json({ success: false, message: "tableId required" });
  }

  const data = await service.getFieldsByTable(tableId);
  res.json({ success: true, data });
};

/* ================= GET OPTIONS ================= */
export const getOptionsByField = async (req: AuthRequest, res: Response) => {
  const fieldId = Number(req.params.fieldId);

  if (!fieldId) {
    return res.status(400).json({ success: false, message: "fieldId required" });
  }

  const data = await service.getOptionsByField(fieldId);
  res.json({ success: true, data });
};

/* ================= GET RECORDS ================= */
export const getRecordsByTable = async (req: AuthRequest, res: Response) => {
  const tableId = Number(req.params.tableId);

  if (!tableId) {
    return res.status(400).json({ success: false, message: "tableId required" });
  }

  const data = await service.getRecordsByTable(tableId);
  res.json({ success: true, data });
};
