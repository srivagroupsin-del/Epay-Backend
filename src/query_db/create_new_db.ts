import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

async function main() {
  // Connect to MySQL server without database first
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "0000",
  });

  try {
    console.log("Connected to MySQL server. Creating new database srivagroupsin_multitab_db...");
    await connection.query("CREATE DATABASE IF NOT EXISTS srivagroupsin_multitab_db");
    await connection.query("USE srivagroupsin_multitab_db");

    console.log("Creating tables inside srivagroupsin_multitab_db...");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`multitab_menus\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
        \`menu_name\` varchar(255) NOT NULL,
        \`description\` text,
        \`status\` enum('active','inactive') NOT NULL DEFAULT 'active',
        \`is_active\` tinyint(1) NOT NULL DEFAULT '1',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`multitab_tabs\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
        \`menu_id\` bigint unsigned NOT NULL,
        \`tab_name\` varchar(255) NOT NULL,
        \`tab_title\` varchar(255) NOT NULL,
        \`description\` text,
        \`image\` varchar(255) DEFAULT NULL,
        \`status\` enum('active','inactive') NOT NULL DEFAULT 'active',
        \`is_active\` tinyint(1) NOT NULL DEFAULT '1',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`fk_mt_tabs_menu\` (\`menu_id\`),
        CONSTRAINT \`fk_mt_tabs_menu\` FOREIGN KEY (\`menu_id\`) REFERENCES \`multitab_menus\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`multitab_checkboxes\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
        \`label\` varchar(255) NOT NULL,
        \`files\` json DEFAULT NULL,
        \`description\` text,
        \`status\` enum('active','inactive') NOT NULL DEFAULT 'active',
        \`is_active\` tinyint(1) NOT NULL DEFAULT '1',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`multitab_mappings\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
        \`tab_id\` bigint unsigned NOT NULL,
        \`checkbox_id\` bigint unsigned NOT NULL,
        \`status\` enum('active','inactive') NOT NULL DEFAULT 'active',
        \`is_active\` tinyint(1) NOT NULL DEFAULT '1',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`uniq_tab_cb\` (\`tab_id\`,\`checkbox_id\`),
        KEY \`fk_mt_mappings_cb\` (\`checkbox_id\`),
        CONSTRAINT \`fk_mt_mappings_cb\` FOREIGN KEY (\`checkbox_id\`) REFERENCES \`multitab_checkboxes\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`fk_mt_mappings_tab\` FOREIGN KEY (\`tab_id\`) REFERENCES \`multitab_tabs\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`multitab_menu_associations\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`menu_id\` bigint unsigned NOT NULL,
        \`menu_title\` varchar(100) NOT NULL,
        \`associated_id\` int NOT NULL,
        \`parent_associated_id\` int DEFAULT NULL,
        \`status\` varchar(20) DEFAULT 'active',
        \`is_active\` tinyint DEFAULT '1',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`menu_id\` (\`menu_id\`),
        CONSTRAINT \`multitab_menu_associations_ibfk_1\` FOREIGN KEY (\`menu_id\`) REFERENCES \`multitab_menus\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    console.log("Database and tables created successfully in srivagroupsin_multitab_db!");

  } catch (error) {
    console.error("Error creating database/tables:", error);
  } finally {
    await connection.end();
    process.exit();
  }
}

main();
