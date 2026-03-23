import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./multitab.service";
import fs from "fs";

/* MENU */
export const createMenu = async (req: AuthRequest, res: Response) => {
  try {
    res.json({
      success: true,
      data: await service.createMenu(req.body, req.user!.id),
    });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMenus = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getMenus(req.query.status as string),
  });
};

export const getMenuById = async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: await service.getMenuById(+req.params.id) });
};

export const updateMenu = async (req: AuthRequest, res: Response) => {
  await service.updateMenu(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

export const deleteMenu = async (req: AuthRequest, res: Response) => {
  await service.deleteMenu(+req.params.id, req.user!.id);
  res.json({ success: true });
};

/* HEADING */
export const createHeading = async (req: AuthRequest, res: Response) => {
  if (req.file) req.body.image = req.file.filename;
  res.json({
    success: true,
    data: await service.createHeading(req.body, req.user!.id),
  });
};

export const getHeadingsByTab = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getHeadingsByTab(
      +req.params.id,
      req.query.status as string,
    ),
  });
};

export const getAllHeadings = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getAllHeadings(req.query.status as string),
  });
};

export const getHeadingById = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getHeadingById(+req.params.id),
  });
};

export const updateHeading = async (req: AuthRequest, res: Response) => {
  if (req.file) req.body.image = req.file.filename;
  await service.updateHeading(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

export const deleteHeading = async (req: AuthRequest, res: Response) => {
  await service.deleteHeading(+req.params.id, req.user!.id);
  res.json({ success: true });
};

/* CHECKBOX */
export const createCheckbox = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.createCheckbox(req.body, req.user!.id),
  });
};

export const getCheckboxes = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getCheckboxes(req.query.status as string),
  });
};

export const getCheckboxById = async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: await service.getCheckboxById(+req.params.id),
  });
};

export const updateCheckbox = async (req: AuthRequest, res: Response) => {
  await service.updateCheckbox(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

export const deleteCheckbox = async (req: AuthRequest, res: Response) => {
  await service.deleteCheckbox(+req.params.id, req.user!.id);
  res.json({ success: true });
};

/* MAPPING */
export const mapCheckbox = async (req: AuthRequest, res: Response) => {
  await service.mapCheckbox(req.body, req.user!.id);
  res.json({ success: true });
};

export const getMappingByHeading = async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: await service.getMappingByHeading() });
};

export const updateMapping = async (req: AuthRequest, res: Response) => {
  await service.updateMapping(+req.params.id, req.body, req.user!.id);
  res.json({ success: true });
};

export const deleteMapping = async (req: AuthRequest, res: Response) => {
  await service.deleteMapping(+req.params.id, req.user!.id);
  res.json({ success: true });
};
