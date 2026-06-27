import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  try {
    const [cols]: any = await pool.query("SHOW COLUMNS FROM multitab_menus");
    const colNames = cols.map((c: any) => c.Field);
    
    if (!colNames.includes("associated_id")) {
      console.log("Adding associated_id column...");
      await pool.query("ALTER TABLE multitab_menus ADD COLUMN associated_id INT DEFAULT NULL");
    }
    
    if (!colNames.includes("parent_associated_id")) {
      console.log("Adding parent_associated_id column...");
      await pool.query("ALTER TABLE multitab_menus ADD COLUMN parent_associated_id INT DEFAULT NULL");
    }
    
    console.log("Database updated successfully.");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    process.exit();
  }
}

main();
