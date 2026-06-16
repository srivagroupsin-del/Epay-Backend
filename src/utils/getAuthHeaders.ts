import { getActiveApiKey } from "../modules/api_key/apiKey.service";

export const getAuthHeaders = async () => {
  // 🔥 Get token from local DB (already synced)
  const data = await getActiveApiKey("epay_recharge", "WEB");

  return {
    "Content-Type": "application/json",
    Accept: "application/json",

    "x-api-key": data.access_token, // ✅ epay_recharge token
    "x-service-name": "epay_recharge", // ✅ caller
    "x-platform": "WEB",
  };
};
