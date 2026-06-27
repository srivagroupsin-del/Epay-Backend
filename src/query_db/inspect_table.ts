import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  try {
    const [createTable]: any = await pool.query("SHOW CREATE TABLE multitab_menus");
    console.log("=== SHOW CREATE TABLE multitab_menus ===");
    console.log(createTable[0]["Create Table"]);

    const [cols]: any = await pool.query("SHOW COLUMNS FROM multitab_menus");
    console.log("=== COLUMNS ===");
    console.log(cols);
  } catch (error) {
    console.error("Error inspecting table:", error);
  } finally {
    process.exit();
  }
}

main();
