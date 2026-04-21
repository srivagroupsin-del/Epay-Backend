import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./multitab-fields.service";

/* CREATE */
export const createField = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.createField(req.body, req.user!.id),
  });
};

/* GET */
export const getFields = async (req: AuthRequest, res: Response) => {
  const checkbox_ids = req.query.checkbox_ids
    ? (req.query.checkbox_ids as string).split(",").map(Number)
    : [];

  res.json({
    success: true,
    data: await service.getFields(checkbox_ids),
  });
};

/* GET BY ID */
export const getFieldById = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getFieldById(+req.params.id),
  });
};

/* UPDATE */
export const updateField = async (req: AuthRequest, res: Response) => {
  await service.updateField(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

/* DELETE */
export const deleteField = async (req: AuthRequest, res: Response) => {
  await service.deleteField(+req.params.id, req.user!.id);
  res.json({ success: true });
};

export const getFieldsForUI = async (req: AuthRequest, res: Response) => {
  const checkbox_ids = req.query.checkbox_ids
    ? (req.query.checkbox_ids as string).split(",").map(Number)
    : [];

  res.json({
    success: true,
    data: await service.getFieldsForUI({
      heading_id: +req.query.heading_id!,
      checkbox_ids,
    }),
  });
};
