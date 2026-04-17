import * as repo from "./business.repository";

import axios from "axios";
import * as authRepo from "../auth/auth.repository";

export const getAllBusinesses = async (userId: number) => {
  // 🔹 Get user
  const user = await authRepo.getUserById(userId);

  if (!user) throw new Error("User not found");

  if (!user.central_token) {
    throw new Error("Central token missing");
  }

  if (new Date(user.central_token_expiry) < new Date()) {
    throw new Error("Session expired. Please login again.");
  }

  // 🔹 Call central API
  const response = await axios.get(
    `https://user.jobes24x7.com/api/business-cres`,
    {
      headers: {
        Authorization: `Bearer ${user.central_token}`,
        Accept: "application/json",
      },
    },
  );

  const apiData = response.data?.data;

  if (!apiData || apiData.result !== "Success") {
    throw new Error("Failed to fetch businesses");
  }

  return {
    count: apiData.data.length,
    data: apiData.data,
  };
};

export const getBusinessById = async (id: number) => {
  const business = await repo.getBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  return business;
};
