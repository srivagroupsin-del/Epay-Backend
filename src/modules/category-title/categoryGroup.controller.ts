import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./categoryGroup.service";
import fs from "fs";

export const createCategoryGroup = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const image = req.file ? req.file.filename : null;

    const result = await service.createCategoryGroup(
      { ...req.body, image },
      userId
    );

    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllCategoryGroups = async (_: Request, res: Response) => {
  const data = await service.getAllCategoryGroups();
  res.json({ success: true, data });
};

export const getCategoryGroupById = async (req: Request, res: Response) => {
  try {
    const data = await service.getCategoryGroupById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateCategoryGroup = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const id = Number(req.params.id);
    const image = req.file ? req.file.filename : null;

    const result = await service.updateCategoryGroup(
      id,
      { ...req.body, image },
      userId
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteCategoryGroup = async (req: AuthRequest, res: Response) => {
  const result = await service.deleteCategoryGroup(
    Number(req.params.id),
    req.user!.id
  );

  res.json({ success: true, data: result });
};