import cron from "node-cron";
import apiDb from "../config/api_key_validation";

export const startApiKeyExpiryJob = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      await apiDb.query(`
        UPDATE api_keys 
        SET is_active = 0 
        WHERE expires_at < NOW() AND is_active = 1
      `);

      console.log("Expired keys cleaned");
    } catch (err) {
      console.error(err);
    }
  });
};
