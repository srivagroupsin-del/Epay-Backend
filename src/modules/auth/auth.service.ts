import axios from "axios";
import jwt from "jsonwebtoken";
import * as authRepo from "./auth.repository";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

export const login = async (email: string, password: string) => {
  try {
    const headers = await getAuthHeaders();
    // 🔹 Call central API
    const response = await axios.post(
      "https://user.jobes24x7.com/api/login/authenticate",
      { email, password },
      {
        headers,
        timeout: 5000, // 🔥 IMPORTANT
      },
    );

    const apiData = response.data?.data;

    if (!apiData || apiData.result !== "Success") {
      throw new Error("Invalid login");
    }

    const userData = apiData.data;

    if (!userData?.email) {
      throw new Error("Invalid user data from central API");
    }

    console.log("Login success for:", userData.email);

    const centralToken = apiData.token;
    const expiryISO = apiData.expires_at;

    // 🔥 Convert ISO → MySQL DATETIME
    const expiry = new Date(expiryISO)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // 🔹 Find or create user
    let user = await authRepo.findUserByEmail(userData.email);

    if (!user) {
      const newUserId = await authRepo.createUser({
        user_id: userData.user_main_id,
        name: userData.user_name,
        email: userData.email,
        password: "external_auth",
      });

      user = {
        id: newUserId,
        email: userData.email,
      };
    } else {
      await authRepo.updateUserMainId(user.id, userData.user_main_id);
    }

    // 🔥 ALWAYS SAVE CENTRAL TOKEN (FIXED)
    await authRepo.updateCentralToken(user.id, centralToken, expiry);

    // 🔹 Generate YOUR token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_id: userData.user_main_id, // 🔥 IMPORTANT
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      user,
    };
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw new Error("Login failed");
  }
};
