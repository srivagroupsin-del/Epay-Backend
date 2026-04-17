import express from "express";
import { generateApiKey } from "../api_key/apiKey.controller";
// import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = express.Router();

// 🔐 only admin should generate API key
router.post("/generate", generateApiKey);

export default router;

// {
//   "service_name": "PANEL_ADMIN",
//   "platform_type": "WEB",
//   "api_key": "my_custom_secure_key_123"
// }
