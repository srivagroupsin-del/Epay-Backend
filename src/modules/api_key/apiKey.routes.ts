import express from "express";
import {
  createOrUpdateApiKey,
  getAllApiKeys,
  getApiKeyByService,
  getApiKeyLogs,
  getPublicApiKey,
} from "./apiKey.controller";

const router = express.Router();

// 🔓 PUBLIC ROUTE (NO API KEY MIDDLEWARE)
router.get("/public/api-key", getPublicApiKey);

router.post("/generate", createOrUpdateApiKey);
router.get("/logs", getApiKeyLogs);

router.get("/", getAllApiKeys);
router.get("/:service_name/:platform_type", getApiKeyByService);

export default router;
