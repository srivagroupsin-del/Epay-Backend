export interface CreateMultitabMenuDTO {
  menu_name: string;
  description?: string;
  status: "active" | "inactive";
}

export interface UpdateMultitabMenuDTO {
  menu_name?: string;
  description?: string;
  status?: "active" | "inactive";
}

export interface CreateMultitabTabDTO {
  menu_id: number;
  tab_name: string;
  tab_title: string;
  description?: string;
  image?: string | null;
  status: "active" | "inactive";
}

export interface UpdateMultitabTabDTO {
  menu_id?: number;
  tab_name?: string;
  tab_title?: string;
  description?: string;
  image?: string | null;
  status?: "active" | "inactive";
}

export interface CreateMultitabCheckboxDTO {
  label: string;
  files?: string[]; // array of strings
  description?: string;
  status: "active" | "inactive";
}

export interface UpdateMultitabCheckboxDTO {
  label?: string;
  files?: string[];
  description?: string;
  status?: "active" | "inactive";
}

export interface CreateMultitabMappingDTO {
  tab_id: number;
  checkbox_id: number;
  status?: "active" | "inactive";
}
