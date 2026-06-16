import { Request, Response } from "express";
import * as service from "./outsideapis.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import { getBaseUrl, mapProductImageFields } from "../../utils/imageUrl";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;

    const params = {
      limit,
      offset: (page - 1) * limit,
      search: req.query.search || "",
      brand: req.query.brand || "",
      category: req.query.category || "",
      status: req.query.status || "",
    };

    const result = await service.fetchProducts(params);
    const baseUrl = getBaseUrl(req);
    const mappedData = (result.data as any[]).map((item: any) => mapProductImageFields(item, baseUrl));

    res.json({
      success: true,
      data: mappedData,
      total: result.total,
      page,
      limit,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchProductById(Number(req.params.id));
    const baseUrl = getBaseUrl(req);
    const mappedData = mapProductImageFields(data, baseUrl);
    res.json({ success: true, data: mappedData });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getProductKeys = async (req: Request, res: Response) => {
  try {
    const result = await service.fetchProductKeys();

    res.json({
      success: true,
      keys: result.keys,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductMappings = async (req: Request, res: Response) => {
  try {
    // 🔹 Read query params
    const search = (req.query.search as string) || "";
    const baseUrl = getBaseUrl(req);
    const data = await service.fetchProductMappings(search, baseUrl);

    res.json({
      success: true,
      ...data, // includes data + pagination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMRP = async (req: Request, res: Response) => {
  try {
    const result = await service.updateMRP(
      Number(req.params.id),
      Number(req.body.mrp),
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};