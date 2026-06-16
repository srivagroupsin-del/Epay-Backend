import { ensureUniqueActive } from "../../utils/uniqueCheck";
import { logAudit } from "../audit/audit.service";
import * as repo from "./multitab.repository";
import {
  CreateMultitabMenuDTO,
  UpdateMultitabMenuDTO,
  CreateMultitabTabDTO,
  UpdateMultitabTabDTO,
  CreateMultitabCheckboxDTO,
  UpdateMultitabCheckboxDTO,
} from "./multitab.types";
import fs from "fs";
import path from "path";

/* ================= MENUS ================= */
export const fetchMenus = async () => {
  return repo.getMenus();
};

export const fetchMenuById = async (id: number) => {
  const menu = await repo.getMenuById(id);
  if (!menu) throw new Error("Menu not found");
  return menu;
};

export const createMenu = async (data: CreateMultitabMenuDTO, userId: number) => {
  await ensureUniqueActive("multitab_menus", "menu_name", data.menu_name);
  const id = await repo.createMenu(data);
  await logAudit({
    user_id: userId,
    module: "multitab_menus",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Menu created successfully" };
};

export const updateMenu = async (id: number, data: UpdateMultitabMenuDTO, userId: number) => {
  const old = await repo.getMenuById(id);
  if (!old) throw new Error("Menu not found");

  if (data.menu_name !== undefined && data.menu_name !== old.menu_name) {
    await ensureUniqueActive("multitab_menus", "menu_name", data.menu_name, id);
  }

  await repo.updateMenu(id, data);
  await logAudit({
    user_id: userId,
    module: "multitab_menus",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Menu updated successfully" };
};

export const removeMenu = async (id: number, userId: number) => {
  const old = await repo.getMenuById(id);
  if (!old) throw new Error("Menu not found");

  await repo.deleteMenu(id);
  await logAudit({
    user_id: userId,
    module: "multitab_menus",
    record_id: id,
    action: "delete",
    new_data: null,
  });
  return { message: "Menu deleted successfully" };
};


/* ================= TABS ================= */
export const fetchTabs = async () => {
  return repo.getTabs();
};

export const fetchTabById = async (id: number) => {
  const tab = await repo.getTabById(id);
  if (!tab) throw new Error("Tab not found");
  return tab;
};

export const createTab = async (data: CreateMultitabTabDTO, userId: number) => {
  await ensureUniqueActive("multitab_tabs", "tab_name", data.tab_name);
  const id = await repo.createTab(data);
  await logAudit({
    user_id: userId,
    module: "multitab_tabs",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Tab heading created successfully" };
};

export const updateTab = async (id: number, data: UpdateMultitabTabDTO, userId: number) => {
  const old = await repo.getTabById(id);
  if (!old) throw new Error("Tab not found");

  if (data.tab_name !== undefined && data.tab_name !== old.tab_name) {
    await ensureUniqueActive("multitab_tabs", "tab_name", data.tab_name, id);
  }

  // delete old image if replaced
  if (data.image && old.image) {
    const oldPath = path.join("uploads", old.image);
    if (fs.existsSync(oldPath)) fs.unlink(oldPath, () => {});
  }

  await repo.updateTab(id, data);
  await logAudit({
    user_id: userId,
    module: "multitab_tabs",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Tab heading updated successfully" };
};

export const removeTab = async (id: number, userId: number) => {
  const old = await repo.getTabById(id);
  if (!old) throw new Error("Tab not found");

  // Optional: delete image on delete
  if (old.image) {
    const imgPath = path.join("uploads", old.image);
    if (fs.existsSync(imgPath)) fs.unlink(imgPath, () => {});
  }

  await repo.deleteTab(id);
  await logAudit({
    user_id: userId,
    module: "multitab_tabs",
    record_id: id,
    action: "delete",
    new_data: null,
  });
  return { message: "Tab heading deleted successfully" };
};


/* ================= CHECKBOXES ================= */
export const fetchCheckboxes = async () => {
  return repo.getCheckboxes();
};

export const fetchCheckboxById = async (id: number) => {
  const cb = await repo.getCheckboxById(id);
  if (!cb) throw new Error("Checkbox not found");
  return cb;
};

export const createCheckbox = async (data: CreateMultitabCheckboxDTO, userId: number) => {
  await ensureUniqueActive("multitab_checkboxes", "label", data.label);
  const id = await repo.createCheckbox(data);
  await logAudit({
    user_id: userId,
    module: "multitab_checkboxes",
    record_id: id,
    action: "create",
    new_data: data,
  });
  return { id, message: "Checkbox created successfully" };
};

export const updateCheckbox = async (id: number, data: UpdateMultitabCheckboxDTO, userId: number) => {
  const old = await repo.getCheckboxById(id);
  if (!old) throw new Error("Checkbox not found");

  if (data.label !== undefined && data.label !== old.label) {
    await ensureUniqueActive("multitab_checkboxes", "label", data.label, id);
  }

  // delete old files if replaced
  if (data.files && old.files) {
    try {
      const oldFiles = typeof old.files === "string" ? JSON.parse(old.files) : old.files;
      if (Array.isArray(oldFiles)) {
        oldFiles.forEach((file: string) => {
          const oldFilePath = path.join("uploads", file);
          if (fs.existsSync(oldFilePath)) fs.unlink(oldFilePath, () => {});
        });
      }
    } catch (e) {}
  }

  await repo.updateCheckbox(id, data);
  await logAudit({
    user_id: userId,
    module: "multitab_checkboxes",
    record_id: id,
    action: "update",
    new_data: data,
  });
  return { message: "Checkbox updated successfully" };
};

export const removeCheckbox = async (id: number, userId: number) => {
  const old = await repo.getCheckboxById(id);
  if (!old) throw new Error("Checkbox not found");

  // Optional: delete associated files on delete
  if (old.files) {
    try {
      const oldFiles = typeof old.files === "string" ? JSON.parse(old.files) : old.files;
      if (Array.isArray(oldFiles)) {
        oldFiles.forEach((file: string) => {
          const oldFilePath = path.join("uploads", file);
          if (fs.existsSync(oldFilePath)) fs.unlink(oldFilePath, () => {});
        });
      }
    } catch (e) {}
  }

  await repo.deleteCheckbox(id);
  await logAudit({
    user_id: userId,
    module: "multitab_checkboxes",
    record_id: id,
    action: "delete",
    new_data: null,
  });
  return { message: "Checkbox deleted successfully" };
};


/* ================= MAPPINGS ================= */
export const fetchMappings = async () => {
  return repo.getMappings();
};

export const fetchMappingsByTabId = async (tabId: number) => {
  return repo.getMappingsByTabId(tabId);
};

export const updateTabMappings = async (tabId: number, checkboxIds: number[], userId: number) => {
  // 1. Soft delete mappings not in checkboxIds
  await repo.removeMappingsForTabExcept(tabId, checkboxIds);

  // 2. Add / Reactivate mappings for checkboxIds
  for (const checkboxId of checkboxIds) {
    await repo.createMapping({
      tab_id: tabId,
      checkbox_id: checkboxId,
      status: "active",
    });
  }

  await logAudit({
    user_id: userId,
    module: "multitab_mappings",
    record_id: tabId,
    action: "update",
    new_data: { checkboxIds },
  });

  return { message: "Mappings updated successfully" };
};
