import jwt from "jsonwebtoken";
import * as authRepo from "./auth.repository";

/**
 * Register user (PLAIN PASSWORD - TEMPORARY)
 */
export const register = async (data: {
  user_id: string;
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await authRepo.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 🔴 STORE PASSWORD AS-IS (TEMPORARY)
  await authRepo.createUser({
    ...data,
    password: data.password,
  });

  return { message: "User registered successfully" };
};

/**
 * Login user (PLAIN PASSWORD CHECK)
 */
export const login = async (email: string, password: string) => {
  const user = await authRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.is_active || user.status !== "active") {
    throw new Error("User is disabled or blocked");
  }

  // 🔴 PLAIN PASSWORD CHECK (TEMPORARY)
  if (password !== user.password) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      business_id: user.details?.business_id || user.add_json?.business_id || null,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: user
  };
};
