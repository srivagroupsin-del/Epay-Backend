import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  try {
    const [menus] = await pool.query("SELECT * FROM multitab_menus");
    console.log("=== MENUS ===");
    console.log(menus);

    const [tabs] = await pool.query("SELECT * FROM multitab_tabs");
    console.log("=== TABS ===");
    console.log(tabs);

    const [checkboxes] = await pool.query("SELECT * FROM multitab_checkboxes");
    console.log("=== CHECKBOXES ===");
    console.log(checkboxes);

    const [mappings] = await pool.query("SELECT * FROM multitab_mappings");
    console.log("=== MAPPINGS ===");
    console.log(mappings);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

main();
