import { Request, Response } from "express";
import * as service from "./menu.service";

/* ================= MENU TITLE ================= */

export const createMenuTitle = async (req: Request, res: Response) => {
  const data = await service.createMenuTitle(req.body.menu_title);
  res.status(201).json({ success: true, data });
};

export const getMenuTitles = async (_: Request, res: Response) => {
  const data = await service.fetchMenuTitles();
  res.json({ success: true, data });
};

export const updateMenuTitle = async (req: Request, res: Response) => {
  const data = await service.updateMenuTitle(
    Number(req.params.id),
    req.body.menu_title
  );
  res.json({ success: true, data });
};

export const updateMenuTitleStatus = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    await service.updateMenuTitleStatusService(Number(id), status);

    res.json({
      message: "Menu title status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMenuTitle = async (req: Request, res: Response) => {
  const data = await service.removeMenuTitle(Number(req.params.id));
  res.json({ success: true, data });
};

/* ================= MENU FIELD ================= */

export const createMenuField = async (req: Request, res: Response) => {
  const data = await service.createMenuField(req.body);
  res.status(201).json({ success: true, data });
};

export const getAllMenuFields = async (_: Request, res: Response) => {
  const data = await service.fetchAllMenuFields();

  res.json({
    success: true,
    data,
  });
};


export const updateMenuField = async (req: Request, res: Response) => {
  const data = await service.updateMenuField(
    Number(req.params.id),
    req.body
  );
  res.json({ success: true, data });
};

export const deleteMenuField = async (req: Request, res: Response) => {
  const data = await service.removeMenuField(Number(req.params.id));
  res.json({ success: true, data });
};

/* ================= MENU PAGE ================= */

export const createMenuPage = async (req: Request, res: Response) => {
  const data = await service.createMenuPage(req.body);
  res.status(201).json({ success: true, data });
};

export const getMenuPages = async (_: Request, res: Response) => {
  const data = await service.fetchMenuPages();
  res.json({ success: true, data });
};

export const updateMenuPage = async (req: Request, res: Response) => {
  const data = await service.updateMenuPage(
    Number(req.params.id),
    req.body
  );
  res.json({ success: true, data });
};

export const deleteMenuPage = async (req: Request, res: Response) => {
  const data = await service.removeMenuPage(Number(req.params.id));
  res.json({ success: true, data });
};

/* ================= MENU MAPPING ================= */

export const mapMenuFieldToTitle = async (req: Request, res: Response) => {
  const data = await service.mapMenuField(
    req.body.menu_title_id,
    req.body.menu_field_id
  );
  res.json({ success: true, data });
};

export const getMappedMenuFields = async (req: Request, res: Response) => {
  const data = await service.fetchMappedMenuFields(
    Number(req.params.menuTitleId)
  );
  res.json({ success: true, data });
};

export const updateMenuMapping = async (req: Request, res: Response) => {
  const data = await service.updateMenuMapping(
    Number(req.params.id),
    req.body
  );
  res.json({ success: true, data });
};

export const deleteMenuMapping = async (req: Request, res: Response) => {
  const data = await service.removeMenuMapping(Number(req.params.id));
  res.json({ success: true, data });
};
