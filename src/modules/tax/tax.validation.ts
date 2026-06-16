interface ValidationResult {
  error: { details: { message: string }[] } | null;
}

export const taxValidation = {
  createTax: {
    validate: (body: any): ValidationResult => {
      if (!body.tax_name) return { error: { details: [{ message: "tax_name is required" }] } };
      return { error: null };
    }
  },
  
  updateTax: {
    validate: (body: any): ValidationResult => {
      return { error: null };
    }
  },

  createTaxField: {
    validate: (body: any): ValidationResult => {
      if (!body.tax_id) return { error: { details: [{ message: "tax_id is required" }] } };
      if (!body.field_name) return { error: { details: [{ message: "field_name is required" }] } };
      if (!body.display_name) return { error: { details: [{ message: "display_name is required" }] } };
      if (!body.ui_type) return { error: { details: [{ message: "ui_type is required" }] } };
      return { error: null };
    }
  },

  updateTaxField: {
    validate: (body: any): ValidationResult => {
      return { error: null };
    }
  },

  createTaxAssignment: {
    validate: (body: any): ValidationResult => {
      if (!body.menu_title_id) return { error: { details: [{ message: "menu_title_id is required" }] } };
      if (!body.tax_id) return { error: { details: [{ message: "tax_id is required" }] } };
      return { error: null };
    }
  },

  createTaxValue: {
    validate: (body: any): ValidationResult => {
      if (!body.menu_title_id) return { error: { details: [{ message: "menu_title_id is required" }] } };
      if (!body.tax_field_id) return { error: { details: [{ message: "tax_field_id is required" }] } };
      return { error: null };
    }
  },


};
