import { Router } from "express";
import * as c from "./multitab.controller";
import { uploadTo } from "../../config/multer";

const r = Router();

/* MENU */
r.post("/multitab-menu", c.createMenu);
r.get("/multitab-menu/all", c.getMenus);
r.get("/multitab-menu/:id", c.getMenuById);
r.put("/multitab-menu/:id", c.updateMenu);
r.delete("/multitab-menu/:id", c.deleteMenu);

/* HEADING */
r.post(
  "/multitab-heading",
  uploadTo("multitab").single("image"),
  c.createHeading,
);
r.get("/multitab-heading/all", c.getAllHeadings);
r.get("/multitab-heading/tab/:id", c.getHeadingsByTab);
r.get("/multitab-heading/:id", c.getHeadingById);
r.put(
  "/multitab-heading/:id",
  uploadTo("multitab").single("image"),
  c.updateHeading,
);
r.delete("/multitab-heading/:id", c.deleteHeading);

/* CHECKBOX */
r.post("/multitab-checkbox", c.createCheckbox);
r.get("/multitab-checkbox/all", c.getCheckboxes);
r.get("/multitab-checkbox/:id", c.getCheckboxById);
r.put("/multitab-checkbox/:id", c.updateCheckbox);
r.delete("/multitab-checkbox/:id", c.deleteCheckbox);

/* MAPPING */
r.post("/multitab-mapping", c.mapCheckbox);
r.get("/multitab-mapping", c.getMappingByHeading);
r.put("/multitab-mapping/:id", c.updateMapping);
r.delete("/multitab-mapping/:id", c.deleteMapping);

export default r;
