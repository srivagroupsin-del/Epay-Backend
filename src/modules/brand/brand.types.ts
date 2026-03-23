export type BrandStatus = "active" | "inactive" | "blocked";

export interface Brand {
  id: number;
  brand_name: string;

  description?: string | null;
  info?: string | null;
  note?: string | null;
  system_note?: string | null;

  image?: string | null;

  is_active: number;
  is_enabled: number;
  status: BrandStatus;

  created_at: Date;
  updated_at: Date;
}

export interface CreateBrandDTO {
  brand_name: string;
  description?: string;
  info?: string;
  note?: string;
  system_note?: string;
  image?: string | null;
  is_active?: number;
  is_enabled?: number;
  status?: BrandStatus;
}

export interface UpdateBrandDTO extends Partial<CreateBrandDTO> {}
