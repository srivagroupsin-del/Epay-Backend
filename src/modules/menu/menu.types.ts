export type Status = "active" | "inactive" | "blocked";

export interface MenuTitle {
  id: number;
  menu_title: string;
  is_active: boolean;
  is_enabled: boolean;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface MenuField {
  id: number;
  menu_title_id: number;
  page_title: string;
  itab?: string;
  icon_name?: string;
  link: string;
  is_active: boolean;
  is_enabled: boolean;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface MenuPage {
  id: number;
  page_title: string;
  itab?: string;
  icon?: string;
  icon_name?: string;
  link: string;
  is_active: boolean;
  is_enabled: boolean;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
