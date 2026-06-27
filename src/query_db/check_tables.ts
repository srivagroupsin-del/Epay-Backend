import dotenv from "dotenv";
dotenv.config();
import pool from "../config/db";

async function main() {
  try {
    const [cols]: any = await pool.query("SHOW COLUMNS FROM product_category_brand");
    console.log("=== COLUMNS IN product_category_brand ===");
    console.log(cols.map((c: any) => ({ Field: c.Field, Type: c.Type })));
  } catch (err: any) {
    console.error(err);
  } finally {
    process.exit();
  }
}
main();
