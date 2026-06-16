import { Router } from "express";
import * as ctrl from "./multitab.controller";

const router = Router();

// Public preview route by menu title for sharing with external sites
router.get("/preview/:menuTitle", ctrl.getPublicPreviewByTitle);

export default router;
