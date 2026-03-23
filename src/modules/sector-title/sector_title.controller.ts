import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import * as service from "./sector_title.service";
import fs from "fs";

/**
 * Create sector title
 */
export const createSectorTitle = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const sectorData = req.body;

    const imagePath = req.file ? req.file.filename : null;

    const result = await service.createSectorTitle(
      {
        ...sectorData,
        image_path: imagePath, // ✅ pass image
      },
      Number(userId),
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get all sector titles
 */
export const getSectorTitles = async (req: Request, res: Response) => {
  const data = await service.fetchSectorTitles();

  res.json({
    success: true,
    data,
  });
};

/**
 * Get sector title by ID
 */
export const getSectorTitleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const data = await service.fetchSectorTitleById(id);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateSectorTitle = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT

    const sectorData = req.body;

    const imagePath = req.file ? req.file.filename : null;

    const result = await service.updateSectorTitle(
      id,
      {
        ...sectorData,
        image_path: imagePath,
      },
      Number(userId),
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteSectorTitle = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT

    const result = await service.removeSectorTitle(id, Number(userId),);

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
