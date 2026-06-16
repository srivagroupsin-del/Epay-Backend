import { Request, Response } from "express";
import { taxService } from "./tax.service";
import { taxValidation } from "./tax.validation";

export class TaxController {
  /* ================== TAX ================== */
  async createTax(req: Request, res: Response) {
    try {
      const { error } = taxValidation.createTax.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      // Assuming module_id for Tax is known, e.g., fetched from DB, but let's assume client sends it or it's hardcoded to 1 for now
      if (!req.body.module_id) {
         // Default to 1 if not provided, assuming tax module is 1
         req.body.module_id = 1;
      }

      await taxService.createTax(req.body);
      res.status(201).json({ success: true, message: "Tax created successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAllTaxes(req: Request, res: Response) {
    try {
      const data = await taxService.getAllTaxes();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaxById(req: Request, res: Response) {
    try {
      const data = await taxService.getTaxById(Number(req.params.id));
      if (!data) return res.status(404).json({ success: false, message: "Tax not found" });
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateTax(req: Request, res: Response) {
    try {
      const { error } = taxValidation.updateTax.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await taxService.updateTax(Number(req.params.id), req.body);
      res.status(200).json({ success: true, message: "Tax updated successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteTax(req: Request, res: Response) {
    try {
      await taxService.deleteTax(Number(req.params.id));
      res.status(200).json({ success: true, message: "Tax deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ================== TAX FIELDS ================== */
  async createTaxField(req: Request, res: Response) {
    try {
      const { error } = taxValidation.createTaxField.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await taxService.createTaxField(req.body);
      res.status(201).json({ success: true, message: "Tax Field created successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaxFields(req: Request, res: Response) {
    try {
      const data = await taxService.getTaxFields();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaxFieldById(req: Request, res: Response) {
    try {
      const data = await taxService.getTaxFieldById(Number(req.params.id));
      if (!data) return res.status(404).json({ success: false, message: "Tax Field not found" });
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateTaxField(req: Request, res: Response) {
    try {
      const { error } = taxValidation.updateTaxField.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await taxService.updateTaxField(Number(req.params.id), req.body);
      res.status(200).json({ success: true, message: "Tax Field updated successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteTaxField(req: Request, res: Response) {
    try {
      await taxService.deleteTaxField(Number(req.params.id));
      res.status(200).json({ success: true, message: "Tax Field deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ================== TAX ASSIGNMENTS ================== */
  async createTaxAssignment(req: Request, res: Response) {
    try {
      const { error } = taxValidation.createTaxAssignment.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await taxService.createTaxAssignment(req.body);
      res.status(201).json({ success: true, message: "Tax Assignment created successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaxAssignments(req: Request, res: Response) {
    try {
      const data = await taxService.getTaxAssignments();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteTaxAssignment(req: Request, res: Response) {
    try {
      await taxService.deleteTaxAssignment(Number(req.params.id));
      res.status(200).json({ success: true, message: "Tax Assignment deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ================== TAX VALUES ================== */
  async createTaxValue(req: Request, res: Response) {
    try {
      const { error } = taxValidation.createTaxValue.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      await taxService.createTaxValue(req.body);
      res.status(201).json({ success: true, message: "Tax Value created successfully" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaxValues(req: Request, res: Response) {
    try {
      const data = await taxService.getTaxValues();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ================== PRODUCT TAX PREFILL ================== */
  async getProductTaxPrefill(req: Request, res: Response) {
    try {
      const { category_id } = req.query;
      if (!category_id) return res.status(400).json({ success: false, message: "category_id is required" });

      const data = await taxService.getProductTaxPrefill(Number(category_id));
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

export const taxController = new TaxController();
