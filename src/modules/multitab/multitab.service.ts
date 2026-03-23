import * as repo from "./multitab.repository";
import { logAudit } from "../audit/audit.service";

/* MENU */
export const createMenu = async (d: any, u: number) => {
  const id = await repo.createMenu(d);
  await logAudit({
    user_id: u,
    module: "multitab_menu",
    record_id: id,
    action: "create",
  });
  return { id };
};

export const getMenus = repo.getMenus;
export const getMenuById = repo.getMenuById;

export const updateMenu = async (id: number, d: any, u: number) => {
  await repo.updateMenu(id, d);
  await logAudit({
    user_id: u,
    module: "multitab_menu",
    record_id: id,
    action: "update",
  });
};

export const deleteMenu = async (id: number, u: number) => {
  await repo.deleteMenu(id);
  await logAudit({
    user_id: u,
    module: "multitab_menu",
    record_id: id,
    action: "delete",
  });
};

/* HEADING */
export const createHeading = async (d: any, u: number) => {
  const id = await repo.createHeading(d);
  await logAudit({
    user_id: u,
    module: "multitab_heading",
    record_id: id,
    action: "create",
  });
  return { id };
};

export const getHeadingsByTab = repo.getHeadingsByTab;
export const getAllHeadings = repo.getAllHeadings;
export const getHeadingById = repo.getHeadingById;

export const updateHeading = async (id: number, d: any, u: number) => {
  await repo.updateHeading(id, d);
  await logAudit({
    user_id: u,
    module: "multitab_heading",
    record_id: id,
    action: "update",
  });
};

export const deleteHeading = async (id: number, u: number) => {
  await repo.deleteHeading(id);
  await logAudit({
    user_id: u,
    module: "multitab_heading",
    record_id: id,
    action: "delete",
  });
};

/* CHECKBOX */
export const createCheckbox = async (d: any, u: number) => {
  const id = await repo.createCheckbox(d);
  await logAudit({
    user_id: u,
    module: "multitab_checkbox",
    record_id: id,
    action: "create",
  });
  return { id };
};

export const getCheckboxes = repo.getCheckboxes;
export const getCheckboxById = repo.getCheckboxById;

export const updateCheckbox = async (id: number, d: any, u: number) => {
  await repo.updateCheckbox(id, d);
  await logAudit({
    user_id: u,
    module: "multitab_checkbox",
    record_id: id,
    action: "update",
  });
};

export const deleteCheckbox = async (id: number, u: number) => {
  await repo.deleteCheckbox(id);
  await logAudit({
    user_id: u,
    module: "multitab_checkbox",
    record_id: id,
    action: "delete",
  });
};

/* MAPPING */
export const mapCheckbox = async (d: any, u: number) => {
  await repo.mapCheckboxBulk(d);
  await logAudit({
    user_id: u,
    module: "multitab_mapping",
    record_id: d.heading_id,
    action: "update",
  });
};

export const getMappingByHeading = repo.getMappingByHeading;

export const updateMapping = async (id: number, d: any, u: number) => {
  await repo.updateMapping(id, d);
  await logAudit({
    user_id: u,
    module: "multitab_mapping",
    record_id: id,
    action: "update",
  });
};

export const deleteMapping = async (id: number, u: number) => {
  await repo.deleteMapping(id);
  await logAudit({
    user_id: u,
    module: "multitab_mapping",
    record_id: id,
    action: "delete",
  });
};
