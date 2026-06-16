import { Response } from "express";
import * as service from "./sector.services";
import fs from "fs";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import { getBaseUrl, mapEntityImageFields } from "../../utils/imageUrl";

/* ================= GET ================= */
export const getSectors = async (req: AuthRequest, res: Response) => {
  const data = await service.fetchSectors();
  const baseUrl = getBaseUrl(req);
  const mappedData = (data as any[]).map(item => mapEntityImageFields(item, baseUrl));
  res.json({ success: true, data: mappedData });
};

/* ================= CREATE ================= */
export const createSector = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.createSector(
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateSector = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.updateSector(
      Number(req.params.id),
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteSector = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;

  const result = await service.removeSector(Number(req.params.id), userId);

  res.json({ success: true, data: result });
};
