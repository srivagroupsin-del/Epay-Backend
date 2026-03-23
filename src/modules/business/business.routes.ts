import { Router } from "express";
import * as controller from "./business.controller";

const router = Router();

router.get("/", controller.getAllBusinesses);
router.get("/:id", controller.getBusinessById);

export default router;