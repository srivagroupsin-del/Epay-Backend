import { Request, Response, NextFunction } from "express";
import apiDb from "../config/api_key_validation";

export const verifyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.header("x-api-key");
    const serviceName = req.header("x-service-name");
    const platform = req.header("x-platform");

    if (!apiKey || !serviceName || !platform) {
      return res.status(400).json({
        message: "Missing API Key / Service / Platform",
      });
    }

    const [rows]: any = await apiDb.query(
      `SELECT * FROM api_keys 
       WHERE api_key=? 
       AND service_name=? 
       AND platform_type=? 
       AND is_active=1`,
      [apiKey, serviceName, platform],
    );

    if (rows.length === 0) {
      return res.status(403).json({ message: "Invalid API Key" });
    }

    const keyData = rows[0];

    // ⛔ expiry check
    if (new Date() > new Date(keyData.expires_at)) {
      await apiDb.query("UPDATE api_keys SET is_active=0 WHERE id=?", [
        keyData.id,
      ]);

      return res.status(401).json({
        message: "API Key Expired",
      });
    }

    // update usage
    await apiDb.query("UPDATE api_keys SET last_used_at=NOW() WHERE id=?", [
      keyData.id,
    ]);

    next();
  } catch (err) {
    console.error("API KEY ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
