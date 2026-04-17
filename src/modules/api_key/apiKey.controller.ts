import { Request, Response } from "express";
import apiDb from "../../config/api_key_validation";

export const generateApiKey = async (req: Request, res: Response) => {
  try {
    const { service_name, platform_type, api_key, expires_at } = req.body;

    if (!service_name || !platform_type || !api_key || !expires_at) {
      return res.status(400).json({
        message: "service_name, platform_type, api_key, expires_at required",
      });
    }

    // 🔍 check existing
    const [rows]: any = await apiDb.query(
      `SELECT * FROM api_keys 
       WHERE service_name=? AND platform_type=?`,
      [service_name, platform_type],
    );

    if (rows.length > 0) {
      const oldKey = rows[0].api_key;

      // 🔄 UPDATE
      await apiDb.query(
        `UPDATE api_keys 
         SET api_key=?, 
             expires_at=?, 
             is_active=1,
             updated_at=NOW()
         WHERE service_name=? AND platform_type=?`,
        [api_key, expires_at, service_name, platform_type],
      );

      // 📝 LOG
      await apiDb.query(
        `INSERT INTO api_key_logs 
         (service_name, platform_type, old_api_key, new_api_key, changed_by)
         VALUES (?, ?, ?, ?, ?)`,
        [service_name, platform_type, oldKey, api_key, "ADMIN"],
      );

      return res.json({
        success: true,
        message: "API Key updated",
        api_key,
        expires_at,
      });
    } else {
      // ➕ INSERT
      await apiDb.query(
        `INSERT INTO api_keys 
         (service_name, platform_type, api_key, expires_at, is_active)
         VALUES (?, ?, ?, ?, 1)`,
        [service_name, platform_type, api_key, expires_at],
      );

      return res.json({
        success: true,
        message: "API Key created",
        api_key,
        expires_at,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
