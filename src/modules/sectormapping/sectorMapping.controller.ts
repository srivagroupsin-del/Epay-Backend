import { Request, Response } from "express";
import * as service from "./sectorMapping.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";

export const mapSectors = async (req: AuthRequest, res: Response) => {
  try {
    const { sector_title_id, sector_ids } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT

    const result = await service.mapSectors(
      Number(sector_title_id),
      sector_ids || [],
      userId,
    );

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
