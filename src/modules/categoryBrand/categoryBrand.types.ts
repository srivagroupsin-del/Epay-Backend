export type Status = "active" | "inactive" | "blocked";

export interface CategoryBrandMapping {
  id: number;
  category_id: number;
  brand_id: number;
  is_active: number;
  is_enabled: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
