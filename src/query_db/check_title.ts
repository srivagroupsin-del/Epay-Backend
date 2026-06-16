import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  try {
    const [titles] = await pool.query("SELECT * FROM menu_title");
    console.log(titles);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

main();
