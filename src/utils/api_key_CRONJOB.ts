import cron from "node-cron";
import apiDb from "../config/api_key_validation";

export const startApiKeyExpiryJob = () => {
  console.log("API Key Expiry Cron Started");

  cron.schedule("*/5 * * * *", async () => {
    try {
      const [result]: any = await apiDb.query(`
        UPDATE api_keys 
        SET is_active = 0 
        WHERE expires_at < NOW() AND is_active = 1
      `);

      if (result.affectedRows > 0) {
        console.log(`Expired keys cleaned: ${result.affectedRows}`);
      }
    } catch (err: any) {
      console.error("CRON ERROR (API KEY EXPIRY):", err.message);
    }
  });
};
