import bcrypt from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as authRepo from "./auth.repository";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

export const login = async (email: string, password: string) => {
  try {
    // 1. Try local database authentication first
    const user = await authRepo.findUserByEmail(email);

    if (user && user.password && user.password !== "external_auth") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("Local Login success for:", user.email);

        // Generate local token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            user_id: user.user_id,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: "1d" },
        );

        return {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            user_id: user.user_id,
          },
        };
      }
    }

    // 2. Fallback to Central API auth
    const headers = await getAuthHeaders();
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

    console.log("Central Login success for:", userData.email);

    const centralToken = apiData.token;
    const expiryISO = apiData.expires_at;

    // 🔥 Convert ISO → MySQL DATETIME
    const expiry = new Date(expiryISO)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    let finalUser = user;

    if (!finalUser) {
      const newUserId = await authRepo.createUser({
        user_id: userData.user_main_id,
        name: userData.user_name,
        email: userData.email,
        password: "external_auth",
      });

      finalUser = {
        id: newUserId,
        email: userData.email,
        name: userData.user_name,
        user_id: userData.user_main_id,
      };
    } else {
      await authRepo.updateUserMainId(finalUser.id, userData.user_main_id);
    }

    // 🔥 ALWAYS SAVE CENTRAL TOKEN (FIXED)
    await authRepo.updateCentralToken(finalUser.id, centralToken, expiry);

    // 🔹 Generate YOUR token
    const token = jwt.sign(
      {
        id: finalUser.id,
        email: finalUser.email,
        user_id: userData.user_main_id, // 🔥 IMPORTANT
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: finalUser,
    };
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw new Error("Login failed");
  }
};
