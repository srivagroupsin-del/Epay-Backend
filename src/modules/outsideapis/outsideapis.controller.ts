import { Request, Response } from "express";
import * as service from "./outsideapis.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";

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

    res.json({
      success: true,
      data: result.data,
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
    res.json({ success: true, data });
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
    const data = await service.fetchProductMappings(search);

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
