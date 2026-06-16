import { Request, Response } from "express";
import * as service from "./product.service";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import QRCode from "qrcode";
import os from "os";
import { getBaseUrl, mapProductImageFields } from "../../utils/imageUrl";

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
      primary_category: req.query.primary_category || "",
      secondary_category: req.query.secondary_category || "",
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

export const getProductMappings = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchProductMappings();
    const baseUrl = getBaseUrl(req);
    const mappedData = (data as any[]).map(item => mapProductImageFields(item, baseUrl));
    res.json({ success: true, data: mappedData });
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
        barcodes: req.body.barcodes
          ? typeof req.body.barcodes === "string"
            ? JSON.parse(req.body.barcodes)
            : req.body.barcodes
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
    console.log("Incoming product update body:", req.body);

    const parsedMappings = req.body.mappings
      ? typeof req.body.mappings === "string"
        ? JSON.parse(req.body.mappings)
        : req.body.mappings
      : [];
    console.log("Parsed mappings:", parsedMappings);

    const result = await service.updateProduct(
      Number(req.params.id),
      {
        ...req.body,
        mappings: parsedMappings,

        alternative_names: req.body.alternative_names
          ? typeof req.body.alternative_names === "string"
            ? JSON.parse(req.body.alternative_names)
            : req.body.alternative_names
          : [],
        barcodes: req.body.barcodes
          ? typeof req.body.barcodes === "string"
            ? JSON.parse(req.body.barcodes)
            : req.body.barcodes
          : [],
        base_image: req.file?.filename,
      },
      userId,
    );

    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("updateProduct backend error:", error);
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
    const { product, mappings, alternative_names, barcodes } = req.body;

    const result = await service.updateFullProduct(
      product,
      mappings,
      alternative_names,
      barcodes || [],
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

export const getProductStructure = async (_req: Request, res: Response) => {
  try {
    const data = await service.fetchProductStructure();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Helper to get local network IP address
const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
};

export const getQrCodeImage = async (req: Request, res: Response) => {
  try {
    const barcode = req.params.barcode as string;
    if (!barcode) {
      return res.status(400).json({ success: false, message: "Barcode parameter is required" });
    }

    const host = req.get("host") || "localhost:5000";
    let protocol = req.protocol || "http";

    // Handle proxy-forwarded protocols or production domains
    if (req.headers["x-forwarded-proto"]) {
      protocol = Array.isArray(req.headers["x-forwarded-proto"])
        ? req.headers["x-forwarded-proto"][0]
        : req.headers["x-forwarded-proto"];
    } else if (!host.includes("localhost") && !host.includes("127.0.0.1") && !host.includes("192.168.")) {
      protocol = "https";
    }

    let baseUrl = "";

    // If host contains localhost or 127.0.0.1, resolve to machine's local Wi-Fi IP address
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      const localIp = getLocalIp();
      const port = host.split(":")[1] || "5000";
      baseUrl = `${protocol}://${localIp}:${port}`;
    } else {
      baseUrl = `${protocol}://${host}`;
    }

    const scanUrl = `${baseUrl}/api/products/view/${barcode}`;

    const qrBuffer = await QRCode.toBuffer(scanUrl, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.send(qrBuffer);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductByBarcode = async (req: Request, res: Response) => {
  try {
    const barcode = req.params.barcode as string;
    if (!barcode) {
      return res.status(400).json({ success: false, message: "Barcode parameter is required" });
    }
    const data = await service.fetchProductByBarcode(barcode);
    const baseUrl = getBaseUrl(req);
    const mappedData = mapProductImageFields(data, baseUrl);
    res.json({ success: true, data: mappedData });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const generateProductBarcode = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const productId = Number(req.params.id);
    const { categoryId } = req.body;
    const userId = req.user.id;

    const result = await service.generateProductBarcode(productId, categoryId ? Number(categoryId) : undefined, userId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const viewProductInfo = async (req: Request, res: Response) => {
  try {
    const barcode = req.params.barcode as string;
    if (!barcode) {
      const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
      const wantsJson = req.query.json === "true" || acceptsJson;
      if (wantsJson) {
        return res.status(400).json({ success: false, message: "Barcode parameter is required" });
      }
      return res.status(400).send("<h1>Error: Barcode parameter is required</h1>");
    }
    const data = await service.fetchProductByBarcode(barcode);
    
    // Check if client expects JSON or passed a query parameter asking for JSON
    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
    const wantsJson = req.query.json === "true" || acceptsJson;
    
    if (wantsJson) {
      const baseUrl = getBaseUrl(req);
      const mappedData = mapProductImageFields(data, baseUrl);
      return res.json({ success: true, data: mappedData });
    }
    
    // Construct HTML template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Details - ${data.product_name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4f46e5;
      --primary-dark: #3730a3;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --accent: #059669;
      --border: #e2e8f0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .card {
      background-color: var(--card-bg);
      border-radius: 24px;
      width: 100%;
      max-width: 500px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04);
      border: 1px solid var(--border);
      animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .header-accent {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      padding: 30px 24px;
      text-align: center;
      position: relative;
      color: #ffffff;
    }
    
    .brand-tag {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
      backdrop-filter: blur(4px);
      color: #ffffff;
    }
    
    h1 {
      font-size: 26px;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 6px;
      color: #ffffff;
    }
    
    .model-tag {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 500;
    }
    
    .content {
      padding: 24px;
    }
    
    .price-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f1f5f9;
      border: 1px solid var(--border);
      padding: 16px 20px;
      border-radius: 16px;
      margin-bottom: 24px;
    }
    
    .price-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .price-value {
      font-size: 24px;
      font-weight: 800;
      color: var(--accent);
    }
    
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--text-muted);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .details-grid {
      display: grid;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .detail-item {
      background: #f8fafc;
      border: 1px solid var(--border);
      padding: 14px 18px;
      border-radius: 16px;
    }
    
    .detail-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    
    .detail-value {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }
    
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }
    
    .spec-row {
      border-bottom: 1px solid var(--border);
    }
    
    .spec-row:last-child {
      border-bottom: none;
    }
    
    .spec-cell {
      padding: 12px 8px;
      font-size: 14px;
    }
    
    .spec-key {
      color: var(--text-muted);
      font-weight: 600;
      width: 40%;
    }
    
    .spec-val {
      font-weight: 600;
      color: var(--text);
      text-align: right;
    }
    
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header-accent">
      <span class="brand-tag">${data.brands || "Sriva Groups"}</span>
      <h1>${data.product_name}</h1>
      <div class="model-tag">Model: ${data.model || "—"}</div>
    </div>
    
    <div class="content">
      <div class="price-section">
        <span class="price-label">Selling Price</span>
        <span class="price-value">₹${data.mrp || "—"}</span>
      </div>
      
      <div class="section-title">Product Details</div>
      
      <div class="details-grid">
        <div class="detail-item">
          <div class="detail-label">Scanned Barcode</div>
          <div class="detail-value" style="font-family: monospace; font-size: 16px; letter-spacing: 0.5px; color: var(--primary);">${barcode}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Brand</div>
          <div class="detail-value">${data.brands || "—"}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Model</div>
          <div class="detail-value">${data.model || "—"}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Mapped Categories</div>
          <div class="detail-value">
            ${data.barcodes && data.barcodes.length > 0 
              ? data.barcodes.map((b: any) => b.category_name).join(', ') 
              : (data.categories || "—")}
          </div>
        </div>
        
        ${data.description ? `
        <div class="detail-item">
          <div class="detail-label">Description</div>
          <div style="font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-top: 4px;">
            ${data.description}
          </div>
        </div>
        ` : ''}
      </div>
      

      
      <div class="footer">
        © 2026 Sriva Groups. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
    `;
    res.send(html);
  } catch (error: any) {
    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
    const wantsJson = req.query.json === "true" || acceptsJson;
    
    if (wantsJson) {
      return res.status(404).json({ success: false, message: error.message });
    }
    
    res.status(404).send(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 50px; background: #f8fafc; color: #0f172a; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #ef4444; font-size: 32px; font-weight: 800;">Product Not Found</h1>
        <p style="color: #64748b; margin-top: 10px; font-weight: 600;">${error.message}</p>
      </div>
    `);
  }
};

