import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./business.service";

export const getAllBusinesses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await service.getAllBusinesses();

    res.json({
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

export const getBusinessById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const result = await service.getBusinessById(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};