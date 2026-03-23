import { Request, Response } from "express";
import { VariantsService } from "./varients_services";
import { AuthRequest } from "../../middlewares/auth.middlewares";

export class VariantsController {

  private service = new VariantsService();

  createVariant = async (req: AuthRequest, res: Response) => {
    try {
         if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
      const result = await this.service.createVariant(req.body,userId);

      res.status(201).json({
        message: "Variant created successfully",
        data: result.insertId
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllVariants = async (req: AuthRequest, res: Response) => {
    try {
      const result = await this.service.getAllVariants();

      res.status(201).json({ success: true, data: result });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getVariantById = async (req: AuthRequest, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = await this.service.getVariantById(id);

      res.json(result);

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateVariant = async (req: AuthRequest, res: Response) => {
    try {
      const id = Number(req.params.id);
       if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

      const result = await this.service.updateVariant(id, req.body,userId);

      res.json({
        message: "Variant updated successfully",
        data: result
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteVariant = async (req: AuthRequest, res: Response) => {
    try {
      const id = Number(req.params.id);
       if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

      await this.service.deleteVariant(id,userId);

      res.json({
        message: "Variant deleted successfully"
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}