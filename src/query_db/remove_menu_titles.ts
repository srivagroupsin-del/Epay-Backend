import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db";

async function main() {
  try {
    const [cols]: any = await pool.query("SHOW COLUMNS FROM multitab_menus");
    const colNames = cols.map((c: any) => c.Field);

    // 1. Drop foreign key if it exists
    if (colNames.includes("menu_title_id")) {
      console.log("Dropping foreign key constraint fk_mt_menus_title...");
      try {
        await pool.query("ALTER TABLE multitab_menus DROP FOREIGN KEY fk_mt_menus_title");
      } catch (fkError) {
        console.log("Could not drop foreign key constraint (might not exist or different name):", fkError);
      }
    }

    // 2. Drop columns
    const drops = [];
    if (colNames.includes("menu_title_id")) {
      drops.push("DROP COLUMN menu_title_id");
    }
    if (colNames.includes("associated_id")) {
      drops.push("DROP COLUMN associated_id");
    }
    if (colNames.includes("parent_associated_id")) {
      drops.push("DROP COLUMN parent_associated_id");
    }

    if (drops.length > 0) {
      console.log(`Dropping columns: ${drops.join(", ")}...`);
      await pool.query(`ALTER TABLE multitab_menus ${drops.join(", ")}`);
      console.log("Columns dropped successfully.");
    } else {
      console.log("No columns to drop.");
    }

  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    process.exit();
  }
}

main();
