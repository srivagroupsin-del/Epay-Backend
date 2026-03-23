import { Router } from "express";
import { mapSectors } from "./sectorMapping.controller";

const router = Router();

/**
 * POST /api/sector-mapping
 */
router.post("/", mapSectors);

export default router;
