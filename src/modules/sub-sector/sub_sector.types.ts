export type Status = "active" | "inactive" | "blocked";

export interface SubSector {
  id: number;
  sector_id: number;
  sub_sector_name: string;
  description?: string | null;
  info?: string | null;
  note?: string | null;
  system_note?: string | null;
  image?: string | null;
  is_active: number;
  is_enabled: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
