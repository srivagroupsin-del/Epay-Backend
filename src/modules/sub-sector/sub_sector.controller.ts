import { Request, Response } from "express";
import * as service from "./sub_sector.service";
import fs from "fs";
import { AuthRequest } from "../../middlewares/auth.middlewares";

/* GET ALL */
export const getSubSectors = async (_: Request, res: Response) => {
  const data = await service.fetchSubSectors();
  res.json({ success: true, data });
};

/* CREATE */
export const createSubSector = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.createSubSector(
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateSubSector = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.updateSubSector(
      Number(req.params.id),
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.json({ success: true, data: result });
  } catch (error: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: error.message });
  }
};

/* DELETE (SOFT) */
export const deleteSubSector = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const result = await service.removeSubSector(Number(req.params.id), userId);
  res.json({ success: true, data: result });
};

/* MAP MULTIPLE SUB-SECTORS → SECTOR */
export const mapSubSectorsToSector = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const { sector_id, sub_sector_ids } = req.body;

  if (!sector_id || !Array.isArray(sub_sector_ids)) {
    return res.status(400).json({
      success: false,
      message: "sector_id and sub_sector_ids are required",
    });
  }

  const result = await service.mapSubSectors(
    Number(sector_id),
    sub_sector_ids.map(Number),
    userId,
  );

  res.json({ success: true, data: result });
};
