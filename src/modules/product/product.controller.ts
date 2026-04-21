import { Request, Response } from "express";
import * as service from "./product.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";

/* ===============================
   GET ROUTES
================================ */
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

export const getProductMappings = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchProductMappings();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const result = await service.createProduct(
      {
        ...req.body,
        mappings: req.body.mappings
          ? typeof req.body.mappings === "string"
            ? JSON.parse(req.body.mappings)
            : req.body.mappings
          : [],
        alternative_names: req.body.alternative_names
          ? typeof req.body.alternative_names === "string"
            ? JSON.parse(req.body.alternative_names)
            : req.body.alternative_names
          : [],
        // 🔥 ADD THIS
        dynamic_fields: req.body.dynamic_fields
          ? typeof req.body.dynamic_fields === "string"
            ? JSON.parse(req.body.dynamic_fields)
            : req.body.dynamic_fields
          : [],
        base_image: req.file?.filename,
      },
      userId,
    );
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;

    const result = await service.updateProduct(
      Number(req.params.id),
      {
        ...req.body,
        mappings: req.body.mappings
          ? typeof req.body.mappings === "string"
            ? JSON.parse(req.body.mappings)
            : req.body.mappings
          : [],

        alternative_names: req.body.alternative_names
          ? typeof req.body.alternative_names === "string"
            ? JSON.parse(req.body.alternative_names)
            : req.body.alternative_names
          : [],
        // 🔥 ADD THIS
        dynamic_fields: req.body.dynamic_fields
          ? typeof req.body.dynamic_fields === "string"
            ? JSON.parse(req.body.dynamic_fields)
            : req.body.dynamic_fields
          : [],
        base_image: req.file?.filename,
      },
      userId,
    );

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProductMappings = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const { mappings } = req.body; // Expecting [id1, id2, ...]

    const result = await service.updateProductMappings(
      Number(req.params.id),
      mappings,
      userId,
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const result = await service.removeProduct(Number(req.params.id), userId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ===============================
   EXTRA UTILITIES
================================ */
export const updateMRP = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const result = await service.updateMRP(
      Number(req.params.id),
      Number(req.body.mrp),
      userId,
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const bulkUpdateProductMapping = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const { product_ids, mappings } = req.body;

    if (!product_ids || !mappings) {
      return res.status(400).json({
        success: false,
        message: "product_ids and mappings are required",
      });
    }

    const result = await service.bulkUpdateMappings(
      product_ids,
      mappings,
      userId,
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const generateProductQrPdf = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const productId = Number(req.params.id);
    const { filePath, fileName } =
      await service.generateProductQrPdf(productId);
    res.download(filePath, fileName);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateFullProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = req.user.id;
    const { product, mappings, alternative_names } = req.body;

    const result = await service.updateFullProduct(
      product,
      mappings,
      alternative_names,
      userId,
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const createProductTax = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const result = await service.createProductTax(req.body, userId);

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

/* GET */

export const getProductTax = async (_: Request, res: Response) => {
  const data = await service.fetchProductTax();

  res.json({
    success: true,
    data,
  });
};

export const getProductTaxById = async (req: Request, res: Response) => {
  const data = await service.fetchProductTaxById(Number(req.params.id));

  res.json({
    success: true,
    data,
  });
};

/* UPDATE */

export const updateProductTax = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const result = await service.updateProductTax(
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

/* DELETE */

export const deleteProductTax = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;

  const result = await service.removeProductTax(Number(req.params.id), userId);

  res.json({
    success: true,
    data: result,
  });
};
