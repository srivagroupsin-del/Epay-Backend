import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./categoryGroupMapping.service";

/* =========================
   CREATE
========================= */
export const createCategoryGroupMapping = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const result = await service.createCategoryGroupMapping(
      req.body,
      userId
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   LIST BY GROUP
========================= */
export const getCategoryGroupMappings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const category_group_id = Number(req.query.category_group_id);

    if (!category_group_id) {
      return res.status(400).json({
        success: false,
        message: "category_group_id is required",
      });
    }

    const data = await service.getCategoryGroupMappings(category_group_id);

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* =========================
   GET BY ID
========================= */
export const getCategoryGroupMappingById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = await service.getCategoryGroupMappingById(
      Number(req.params.id)
    );

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/* =========================
   DELETE
========================= */
export const deleteCategoryGroupMapping = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const result = await service.deleteCategoryGroupMapping(
      Number(req.params.id),
      userId
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};