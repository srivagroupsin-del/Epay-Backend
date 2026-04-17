import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./businessCategoryGroup.service";

/* =========================
   CREATE
========================= */
export const createBusinessCategoryGroups = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const result = await service.createBusinessCategoryGroups(req.body, userId);

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
   LIST
========================= */
export const getBusinessCategoryGroups = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const businessId = Number(req.query.business_id);

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    const data = await service.getBusinessCategoryGroups(businessId, userId);

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* =========================
   DELETE
========================= */
export const deleteBusinessCategoryGroup = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const businessId = Number(req.body.business_id);

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    const result = await service.deleteBusinessCategoryGroup(
      Number(req.params.id),
      businessId,
      userId,
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
