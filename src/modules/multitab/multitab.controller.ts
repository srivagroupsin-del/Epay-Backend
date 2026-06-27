import { Request, Response } from "express";
import * as service from "./multitab.service";
import fs from "fs";
import { AuthRequest } from "../../middlewares/auth.middlewares";
import { getBaseUrl, mapEntityImageFields, getProductImageUrl } from "../../utils/imageUrl";

// Helper to map checkbox files to full URLs
const mapCheckboxFiles = (checkbox: any, baseUrl: string) => {
  if (!checkbox) return checkbox;
  let files = checkbox.files || checkbox.checkbox_files;
  if (typeof files === "string") {
    try {
      files = JSON.parse(files);
    } catch (e) {
      files = [];
    }
  }
  if (Array.isArray(files)) {
    checkbox.file_urls = files.map(file => getProductImageUrl(file, baseUrl));
    checkbox.files = files;
  } else {
    checkbox.file_urls = [];
    checkbox.files = [];
  }
  return checkbox;
};

/* ================= MENUS ================= */
export const getMenus = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.fetchMenus();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchMenuById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

export const createMenu = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const result = await service.createMenu(req.body, req.user.id);
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateMenu = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const result = await service.updateMenu(Number(req.params.id), req.body, req.user.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteMenu = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const result = await service.removeMenu(Number(req.params.id), req.user.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};


/* ================= TABS ================= */
export const getTabs = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.fetchTabs();
    const baseUrl = getBaseUrl(req);
    const mappedData = (data as any[]).map(item => mapEntityImageFields(item, baseUrl, "image"));
    res.json({ success: true, data: mappedData });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getTabById = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchTabById(Number(req.params.id));
    const baseUrl = getBaseUrl(req);
    const mappedData = mapEntityImageFields(data, baseUrl, "image");
    res.json({ success: true, data: mappedData });
  } catch (e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

export const createTab = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const imagePath = req.file ? req.file.filename : null;
    const result = await service.createTab(
      {
        ...req.body,
        menu_id: Number(req.body.menu_id),
        image: imagePath,
      },
      req.user.id,
    );
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateTab = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const imagePath = req.file ? req.file.filename : null;
    const result = await service.updateTab(
      Number(req.params.id),
      {
        ...req.body,
        menu_id: req.body.menu_id ? Number(req.body.menu_id) : undefined,
        image: imagePath,
      },
      req.user.id,
    );
    res.json({ success: true, data: result });
  } catch (e: any) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteTab = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const result = await service.removeTab(Number(req.params.id), req.user.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};


/* ================= CHECKBOXES ================= */
export const getCheckboxes = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.fetchCheckboxes();
    const baseUrl = getBaseUrl(req);
    const mappedData = (data as any[]).map(item => mapCheckboxFiles(item, baseUrl));
    res.json({ success: true, data: mappedData });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getCheckboxById = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchCheckboxById(Number(req.params.id));
    const baseUrl = getBaseUrl(req);
    const mappedData = mapCheckboxFiles(data, baseUrl);
    res.json({ success: true, data: mappedData });
  } catch (e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

export const createCheckbox = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    
    const uploadedFiles = req.files && Array.isArray(req.files) 
      ? req.files.map((f: any) => f.filename) 
      : [];

    const result = await service.createCheckbox(
      {
        ...req.body,
        files: uploadedFiles,
      },
      req.user.id,
    );
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((f: any) => fs.unlink(f.path, () => {}));
    }
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateCheckbox = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // New files uploaded in this request
    const uploadedFiles = req.files && Array.isArray(req.files)
      ? req.files.map((f: any) => f.filename)
      : [];

    // Existing file paths the user wants to keep (sent as existing_files[])
    const keptFiles: string[] = req.body.existing_files
      ? (Array.isArray(req.body.existing_files) ? req.body.existing_files : [req.body.existing_files])
      : [];

    // Merge: kept old files + newly uploaded files
    const mergedFiles = [...keptFiles, ...uploadedFiles];

    const result = await service.updateCheckbox(
      Number(req.params.id),
      {
        ...req.body,
        files: mergedFiles.length > 0 ? mergedFiles : undefined,
        keptFiles, // pass so service knows which old files to delete
      },
      req.user.id,
    );
    res.json({ success: true, data: result });
  } catch (e: any) {
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((f: any) => fs.unlink(f.path, () => {}));
    }
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteCheckbox = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const result = await service.removeCheckbox(Number(req.params.id), req.user.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};


/* ================= MAPPINGS ================= */
export const getMappings = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.fetchMappings();
    const baseUrl = getBaseUrl(req);
    const mapped = (data as any[]).map(item => mapCheckboxFiles(item, baseUrl));
    res.json({ success: true, data: mapped });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMappingsByTabId = async (req: Request, res: Response) => {
  try {
    const data = await service.fetchMappingsByTabId(Number(req.params.tabId));
    const baseUrl = getBaseUrl(req);
    const mapped = (data as any[]).map(item => mapCheckboxFiles(item, baseUrl));
    res.json({ success: true, data: mapped });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const updateTabMappings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { tabId, checkboxIds } = req.body;
    if (!tabId || !Array.isArray(checkboxIds)) {
      return res.status(400).json({ success: false, message: "tabId and checkboxIds array are required" });
    }
    const result = await service.updateTabMappings(Number(tabId), checkboxIds.map(Number), req.user.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};


/* ================= PREVIEW ================= */
export const getPreviewData = async (req: AuthRequest, res: Response) => {
  try {
    const baseUrl = getBaseUrl(req);

    // 1. Fetch raw data
    const rawMenus = await service.fetchMenus() as any[];
    const rawTabs = await service.fetchTabs() as any[];
    const rawMappings = await service.fetchMappings() as any[];

    // 2. Map file URLs and images
    const menus = rawMenus.map(m => ({ ...m, tabs: [] }));
    const tabs = rawTabs.map(t => ({
      ...mapEntityImageFields(t, baseUrl, "image"),
      checkboxes: []
    }));
    const mappings = rawMappings.map(map => mapCheckboxFiles(map, baseUrl));

    // 3. Assemble tree structure
    tabs.forEach(tab => {
      // Find mappings for this tab
      const tabMappings = mappings.filter(m => m.tab_id === tab.id);
      tab.checkboxes = tabMappings.map(m => ({
        id: m.checkbox_id,
        label: m.checkbox_label,
        description: m.checkbox_description,
        files: m.checkbox_files,
        file_urls: m.file_urls,
        status: m.status,
      }));
    });

    menus.forEach(menu => {
      menu.tabs = tabs.filter(t => t.menu_id === menu.id);
    });

    res.json({ success: true, data: menus });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getPublicPreviewByTitle = async (req: Request, res: Response) => {
  try {
    const menuTitle = String(req.params.menuTitle);
    if (!menuTitle) {
      return res.status(400).json({ success: false, message: "menuTitle parameter is required" });
    }

    const baseUrl = getBaseUrl(req);
    
    // 1. Fetch raw data
    const rawMenus = await service.fetchMenus() as any[];
    const rawTabs = await service.fetchTabs() as any[];
    const rawMappings = await service.fetchMappings() as any[];

    // 2. Filter menus matching title (casing/spaces ignored)
    const matchedMenus = rawMenus.filter((m: any) => 
      m.menu_title_name?.toLowerCase().replace(/\s+/g, "") === 
      menuTitle.toLowerCase().replace(/\s+/g, "")
    );

    if (matchedMenus.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const matchedMenuIds = matchedMenus.map(m => m.id);

    // 3. Filter tabs & map images
    const filteredTabs = rawTabs.filter(t => matchedMenuIds.includes(t.menu_id));
    const tabs = filteredTabs.map(t => ({
      ...mapEntityImageFields(t, baseUrl, "image"),
      checkboxes: []
    }));

    // 4. Map file urls for mappings
    const mappings = rawMappings.map(map => mapCheckboxFiles(map, baseUrl));

    // 5. Assemble checkboxes and final tree structure
    tabs.forEach(tab => {
      const tabMappings = mappings.filter(m => m.tab_id === tab.id);
      tab.checkboxes = tabMappings.map(m => ({
        id: m.checkbox_id,
        label: m.checkbox_label,
        description: m.checkbox_description,
        files: m.checkbox_files,
        file_urls: m.file_urls,
        status: m.status,
      }));
    });

    const menus = matchedMenus.map(m => ({ ...m, tabs: [] }));
    menus.forEach(menu => {
      menu.tabs = tabs.filter(t => t.menu_id === menu.id);
    });

    res.json({ success: true, data: menus });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMenuAssociations = async (req: AuthRequest, res: Response) => {
  try {
    const menuTitle = String(req.query.menuTitle || "");
    const associatedId = Number(req.query.associatedId || 0);
    const parentAssociatedId = req.query.parentAssociatedId ? Number(req.query.parentAssociatedId) : null;

    if (!menuTitle || !associatedId) {
      return res.status(400).json({ success: false, message: "menuTitle and associatedId are required query parameters" });
    }

    const data = await service.getMenuAssociations(menuTitle, associatedId, parentAssociatedId);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const saveMenuAssociations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.user?.id || 1);
    const { menuTitle, associatedId, parentAssociatedId, menuIds } = req.body;

    if (!menuTitle || !associatedId || !Array.isArray(menuIds)) {
      return res.status(400).json({ success: false, message: "menuTitle, associatedId and menuIds (array) are required" });
    }

    const result = await service.saveMenuAssociations(menuTitle, associatedId, parentAssociatedId || null, menuIds, userId);
    res.json({ success: true, ...result });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};
