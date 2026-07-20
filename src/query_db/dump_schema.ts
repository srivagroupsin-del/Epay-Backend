import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  const tables = [
    "multitab_menus",
    "multitab_tabs",
    "multitab_checkboxes",
    "multitab_mappings",
    "multitab_menu_associations"
  ];
  
  for (const table of tables) {
    try {
      const [rows]: any = await pool.query(`SHOW CREATE TABLE ${table}`);
      console.log(`=== SCHEMA FOR ${table} ===`);
      console.log(rows[0]["Create Table"]);
      console.log("\n");
    } catch (e: any) {
      console.error(`Error showing table ${table}:`, e.message);
    }
  }
  process.exit();
}

main();
