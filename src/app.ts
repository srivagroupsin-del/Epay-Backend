import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import responseTime from "response-time";

import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.route";
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

// Multitab Routes
import MultitabRoutes from "./modules/multitab/multitab.routes";

import categoryGroupMappingRoutes from "./modules/category-group-mapping/categoryGroupMapping.route";
import variantRoutes from "./modules/varients_feilds/varients_routes";
import businessRoutes from "./modules/business/business.routes";

import { authMiddleware } from "./middlewares/auth.middlewares";

const app = express();

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

// JSON parser
app.use(express.json());

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/audit", authMiddleware, auditRoutes);
app.use("/api/menu", authMiddleware, menuRoutes);
app.use("/api/sectorTitleRoutes", authMiddleware, sectorTitleRoutes);
app.use("/api/sectors", authMiddleware, sectorRoutes);
app.use("/api/sector-mapping", authMiddleware, sectorMappingRoutes);
app.use("/api/sub-sectors", authMiddleware, subSectorRoutes);
app.use("/api/businesses", authMiddleware, businessRoutes);
app.use("/api/categories", authMiddleware, categoryRoutes);
app.use("/api/brands", authMiddleware, brandRoutes);
app.use("/api/category-brand", authMiddleware, categoryBrandRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/dynamic", authMiddleware, dynamicRoutes);
app.use("/api/categoryGroup", authMiddleware, categoryGroupRoutes);
app.use(
  "/api/categoryGroupMapping",
  authMiddleware,
  categoryGroupMappingRoutes,
);
app.use(
  "/api/businessCategoryGroup",
  authMiddleware,
  businessCategoryGroupRoutes,
);
app.use("/api/variant", authMiddleware, variantRoutes); // ✅ NEW ADDED

// Multitab APIs
app.use("/api/multitab", authMiddleware, MultitabRoutes);

// Static uploads
app.use("/uploads", express.static("uploads"));

export default app;
