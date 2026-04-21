import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./multitab-config.service";

/* CREATE */
export const createConfig = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.createConfig(req.body, req.user!.id),
  });
};

/* GET ALL */
export const getConfigs = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getConfigs(),
  });
};

/* GET BY ID */
export const getConfigById = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getConfigById(+req.params.id),
  });
};

/* UPDATE */
export const updateConfig = async (req: AuthRequest, res: Response) => {
  await service.updateConfig(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

/* DELETE */
export const deleteConfig = async (req: AuthRequest, res: Response) => {
  await service.deleteConfig(+req.params.id, req.user!.id);
  res.json({ success: true });
};

/* 🔥 MAIN API */
export const getFieldsByHierarchy = async (req: AuthRequest, res: Response) => {
  try {
    const sector_id = req.query.sector_id ? Number(req.query.sector_id) : null;

    const sub_sector_id = req.query.sub_sector_id
      ? Number(req.query.sub_sector_id)
      : null;

    const raw = req.query.category_id;

    const category_ids = raw
      ? Array.isArray(raw)
        ? raw.map(Number)
        : [Number(raw)]
      : [];

    res.json({
      success: true,
      data: await service.getFieldsByHierarchy({
        sector_id,
        sub_sector_id,
        category_ids,
      }),
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
