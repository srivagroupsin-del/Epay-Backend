import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import responseTime from "response-time";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.route";
import apiKeyRoutes from "./modules/api_key/apiKey.routes";
import sectorTitleRoutes from "./modules/sector-title/sector_title.route";
import menuRoutes from "./modules/menu/menu.routes";
import sectorRoutes from "./modules/sector/sector.routes";
import sectorMappingRoutes from "./modules/sectormapping/sectorMapping.routes";
import subSectorRoutes from "./modules/sub-sector/sub_sector.routes";
import categoryRoutes from "./modules/category/category.routes";
import brandRoutes from "./modules/brand/brand.routes";
import categoryBrandRoutes from "./modules/categoryBrand/categoryBrand.routes";
import productRoutes from "./modules/product/product.routes";
import auditRoutes from "./modules/audit/audit.routes";
import dynamicRoutes from "./modules/dynamic/dynamic.routes";
import categoryGroupRoutes from "./modules/category-title/categoryGroup.route";
import businessCategoryGroupRoutes from "./modules/businessCategoryGroup/businessCategoryGroup.routes";

import outsideapis from "./modules/outsideapis/outsideapis.routes";

// Multitab Routes
import MultitabRoutes from "./modules/multitab/multitab.routes";
import multitabFieldsRoutes from "./modules/multitab-fields/multitab-fields.routes";
import multitabconfig from "./modules/multitab-config/multitab-config.routes";

import categoryGroupMappingRoutes from "./modules/category-group-mapping/categoryGroupMapping.route";
import variantRoutes from "./modules/varients_feilds/varients_routes";
import businessRoutes from "./modules/business/business.routes";

import { authMiddleware } from "./middlewares/auth.middlewares";
import { verifyApiKey } from "./middlewares/api_key.verfication";
import { syncFromRegistry } from "./modules/api_key/apiKey.service";

const app = express();

app.set("trust proxy", 1); // 👈 ADD THIS LINE

app.use(helmet());
app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

// CORS
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// Preflight handler
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Response time logger
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    console.log(`${req.method} ${req.url} - ${time.toFixed(2)} ms`);
  }),
);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Product Backend is running successfully",
  });
});

// 🔓 Public
app.use("/api/auth", authRoutes);

// 🔐 Admin
app.use("/api/admin/api-key", apiKeyRoutes);

// 🔥 ADD HERE (after setup, before routes or after routes both fine)

let isSyncing = false;

const safeSync = async () => {
  if (isSyncing) return; // prevent overlap

  try {
    isSyncing = true;
    await syncFromRegistry();
    console.log("✅ Token sync success");
  } catch (err) {
    console.error("❌ Token sync failed:", err);
  } finally {
    isSyncing = false;
  }
};

// ✅ run once (startup)
safeSync();

// ✅ run every 5 minutes
setInterval(safeSync, 5 * 60 * 1000);

// 🔑 Apply API key globally
// app.use("/api", verifyApiKey);

app.use("/api/outsideapis", outsideapis);

// 🔐 All protected routes
app.use("/api", authMiddleware);

// 📦 Modules
app.use("/api/users", userRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/sectorTitleRoutes", sectorTitleRoutes);
app.use("/api/sectors", sectorRoutes);
app.use("/api/sector-mapping", sectorMappingRoutes);
app.use("/api/sub-sectors", subSectorRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/category-brand", categoryBrandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dynamic", dynamicRoutes);
app.use("/api/categoryGroup", categoryGroupRoutes);
app.use("/api/categoryGroupMapping", categoryGroupMappingRoutes);
app.use("/api/businessCategoryGroup", businessCategoryGroupRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/multitab", MultitabRoutes);
app.use("/api/multitab-fields", multitabFieldsRoutes);
app.use("/api/multitab-config", multitabconfig);

// Static uploads
app.use("/uploads", express.static("uploads"));

export default app;

// const apiKey = req.header("x-api-key");

//  if (apiKey) {
//     // 🔐 request from Billing/Product
//     // optional verifyApiKey(req)
//   }
