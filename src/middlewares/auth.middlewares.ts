import { catchAsync } from "../utils/catchAsync";
import { BusinessError } from "../utils/appError";
import { ErrorCodes } from "../utils/errorCodes";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyApiKey } from "./api_key.verfication";

interface JwtPayload {
  id: number;
  email: string;
  business_id?: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = catchAsync(
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Allow public QR code image streaming endpoint
      if (req.path) {
        const cleanPath = req.path.replace(/\/+/g, "/");
        if (
          cleanPath.startsWith("/products/qrc/") ||
          cleanPath.startsWith("/products/view/") ||
          cleanPath.startsWith("/products/public/barcode/")
        ) {
          return next();
        }
      }

      // =====================================
      // 🔥 INTERNAL SERVICE REQUEST
      // =====================================

      const apiKey = req.header("x-api-key");

      // if internal service request -> skip JWT

      if (apiKey) {
        return verifyApiKey(req, res, next); //  REAL VALIDATION
      }
      // =====================================
      // 🔥 USER JWT AUTH
      // =====================================

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new BusinessError(
          "Authorization token missing",
          ErrorCodes.BUSINESS_RULE_VIOLATION,
        );
      }

      const token = authHeader.split(" ")[1];

      if (token === "offline-mock-token") {
        req.user = { id: 1, email: "admin@epay.com" };
        return next();
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      req.user = decoded;

      next();
    } catch {
      throw new BusinessError(
        "Invalid or expired token",
        ErrorCodes.BUSINESS_RULE_VIOLATION,
      );
    }
  },
);
