import { Router } from "express";
import {  login } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

router.post("/login", login);

// protected test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Authorized user",
  });
});

export default router;
