import { Request, Response } from "express";
import * as service from "./brand.service";
import fs from "fs";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import { getBaseUrl, mapEntityImageFields } from "../../utils/imageUrl";

/* GET */
export const getBrands = async (req: AuthRequest, res: Response) => {
  const data = await service.fetchBrands();
  const baseUrl = getBaseUrl(req);
  const mappedData = (data as any[]).map(item => mapEntityImageFields(item, baseUrl));
  res.json({ success: true, data: mappedData });
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchBrandById(Number(req.params.id));
    const baseUrl = getBaseUrl(req);
    const mappedData = mapEntityImageFields(data, baseUrl);
    res.json({ success: true, data: mappedData });
  } catch (e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

/* CREATE */
export const createBrand = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.createBrand(
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    if (req.file) fs.unlink(req.file.path, () => { });
    res.status(400).json({ success: false, message: e.message });
  }
};

/* UPDATE */
export const updateBrand = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.updateBrand(
      Number(req.params.id),
      {
        ...req.body,
        image: imagePath,
      },
      userId,
    );

    res.json({ success: true, data: result });
  } catch (e: any) {
    if (req.file) fs.unlink(req.file.path, () => { });
    res.status(400).json({ success: false, message: e.message });
  }
};

/* DELETE */
export const deleteBrand = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const result = await service.removeBrand(Number(req.params.id), userId);
  res.json({ success: true, data: result });
};
