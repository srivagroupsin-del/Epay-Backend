import { Status, updateStatusById } from "../../utils/updateStatus";
import * as repo from "./menu.repository";

/* ================= MENU TITLE ================= */

export const createMenuTitle = async (menu_title: string) => {
  const id = await repo.createMenuTitle(menu_title);
  return { id, message: "Menu title created" };
};

export const fetchMenuTitles = async () => {
  return repo.getMenuTitles();
};

export const updateMenuTitle = async (id: number, menu_title: string) => {
  await repo.updateMenuTitle(id, menu_title);
  return { message: "Menu title updated" };
};

export const updateMenuTitleStatusService = async (
  id: number,
  status: Status
) => {
  await updateStatusById("menu_title", id, status);
};

export const removeMenuTitle = async (id: number) => {
  await repo.deleteMenuTitle(id);
  return { message: "Menu title deleted" };
};

/* ================= MENU FIELD ================= */

export const createMenuField = async (data: any) => {
  const id = await repo.createMenuField(data);
  return { id, message: "Menu field created" };
};

export const fetchAllMenuFields = async () => {
  return repo.getAllMenuFields();
};


export const updateMenuField = async (id: number, data: any) => {
  await repo.updateMenuField(id, data);
  return { message: "Menu field updated" };
};

export const removeMenuField = async (id: number) => {
  await repo.deleteMenuField(id);
  return { message: "Menu field deleted" };
};

/* ================= MENU PAGE ================= */

export const createMenuPage = async (data: any) => {
  const id = await repo.createMenuPage(data);
  return { id, message: "Menu page created" };
};

export const fetchMenuPages = async () => {
  return repo.getMenuPages();
};

export const updateMenuPage = async (id: number, data: any) => {
  await repo.updateMenuPage(id, data);
  return { message: "Menu page updated" };
};

export const removeMenuPage = async (id: number) => {
  await repo.deleteMenuPage(id);
  return { message: "Menu page deleted" };
};

/* ================= MENU MAPPING ================= */

export const mapMenuField = async (
  menu_title_id: number,
  menu_field_id: number
) => {
  await repo.mapMenuFieldToTitle(menu_title_id, menu_field_id);
  return { message: "Menu field mapped to menu title" };
};

export const fetchMappedMenuFields = async (menuTitleId: number) => {
  return repo.getMappedMenuFields(menuTitleId);
};

export const updateMenuMapping = async (
  id: number,
  data: {
    is_active?: number;
    status?: "active" | "inactive" | "blocked";
  }
) => {
  await repo.updateMenuMapping(id, data);
  return { message: "Menu mapping updated" };
};

export const removeMenuMapping = async (id: number) => {
  await repo.deleteMenuMapping(id);
  return { message: "Menu mapping deleted" };
};
