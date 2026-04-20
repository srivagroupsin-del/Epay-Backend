import { Request, Response } from "express";
import * as service from "./category.service";
import fs from "fs";
import { AuthRequest } from "../../middlewares/auth.middlewares";

/* GET */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const search = (req.query.search as string) || "";

    let offset = (page - 1) * limit;

    // 🔥 IMPORTANT FIX
    if (search) {
      offset = 0; // reset
    }

    const data = await service.fetchCategories(limit, offset, search);

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPrimaryCategories = async (_: Request, res: Response) => {
  const data = await service.fetchPrimaryCategories();
  res.json({ success: true, data });
};

export const getSecondaryCategories = async (req: Request, res: Response) => {
  const data = await service.fetchSecondaryCategories(
    Number(req.params.parentId),
  );
  res.json({ success: true, data });
};

/* CREATE */
export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.createCategory(
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
export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // ✅ FROM JWT
    const imagePath = req.file ? req.file.filename : null;

    const result = await service.updateCategory(
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

/* CONVERSIONS */
export const convertToSecondary = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const result = await service.makeSecondary(
    Number(req.params.id),
    Number(req.body.parent_category_id),
    userId,
  );
  res.json({ success: true, data: result });
};

export const convertToPrimary = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const result = await service.makePrimary(Number(req.params.id), userId);
  res.json({ success: true, data: result });
};

/* DELETE */
export const deleteCategory = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const result = await service.removeCategory(Number(req.params.id), userId);
  res.json({ success: true, data: result });
};

/* 🔥 UNSELECTED SECONDARY CATEGORIES */
export const getUnselectedSecondaryCategories = async (
  req: Request,
  res: Response,
) => {
  const primaryId = Number(req.params.primaryId);

  if (!primaryId) {
    return res.status(400).json({
      success: false,
      message: "primaryId is required",
    });
  }

  const data = await service.fetchUnselectedSecondaryCategories(primaryId);
  res.json({ success: true, data });
};

export const bulkToSecondary = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const { category_ids, parent_category_id } = req.body;

  if (!Array.isArray(category_ids) || !parent_category_id) {
    return res.status(400).json({
      success: false,
      message: "category_ids and parent_category_id are required",
    });
  }

  const result = await service.convertMultipleToSecondary(
    category_ids.map(Number),
    Number(parent_category_id),
    userId,
  );

  res.json({ success: true, data: result });
};

export const bulkToPrimary = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const { category_ids } = req.body;
  const result = await service.convertMultipleToPrimary(category_ids, userId);
  res.json({ success: true, data: result });
};

export const bulkRemapSecondary = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // ✅ FROM JWT
  const { category_ids, new_parent_category_id } = req.body;

  const result = await service.remapMultipleSecondary(
    category_ids,
    new_parent_category_id,
    userId,
  );
  res.json({ success: true, data: result });
};

/* ================= CATEGORY TAX ================= */

export const createCategoryTax = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const result = await service.createCategoryTax(req.body, userId);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryTax = async (_: Request, res: Response) => {
  const data = await service.fetchCategoryTax();

  res.json({
    success: true,
    data,
  });
};

export const getCategoryTaxById = async (req: Request, res: Response) => {
  const data = await service.fetchCategoryTaxById(Number(req.params.id));

  res.json({
    success: true,
    data,
  });
};

export const updateCategoryTax = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const result = await service.updateCategoryTax(
      Number(req.params.id),
      req.body,
      userId,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategoryTax = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;

  const result = await service.removeCategoryTax(Number(req.params.id), userId);

  res.json({
    success: true,
    data: result,
  });
};
