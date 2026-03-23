import express from "express";
import { VariantsController } from "./varients_controllers";

const router = express.Router();
const controller = new VariantsController();

router.post("/create", controller.createVariant);
router.get("/", controller.getAllVariants);
router.get("/:id", controller.getVariantById);
router.put("/:id", controller.updateVariant);
router.delete("/:id", controller.deleteVariant);

export default router;