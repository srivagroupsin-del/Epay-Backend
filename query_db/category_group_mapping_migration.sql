-- Migration script for category_group_mapping table
-- Run this SQL to add the unique key constraint

-- Add unique key for business_id, category_group_id, category_id, category_level
-- This ensures each combination is unique per business

-- First, check if the unique key already exists
-- If not, add it:

-- ALTER TABLE category_group_mapping
-- ADD CONSTRAINT unique_mapping UNIQUE (business_id, category_group_id, category_id, category_level);

-- Note: If there are existing duplicate records, you may need to clean them up first:
-- Example cleanup query:
-- DELETE FROM category_group_mapping 
-- WHERE id NOT IN (
--     SELECT MAX(id) 
--     FROM category_group_mapping 
--     GROUP BY business_id, category_group_id, category_id, category_level
-- );

-- Also ensure is_active is part of the unique constraint if you want to allow 
-- inactive duplicates (soft delete pattern):
-- ALTER TABLE category_group_mapping
-- ADD CONSTRAINT unique_mapping UNIQUE (business_id, category_group_id, category_id, category_level, is_active);

-- If the table doesn't exist yet, here's the full CREATE TABLE statement:

-- CREATE TABLE IF NOT EXISTS category_group_mapping (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     business_id INT NOT NULL,
--     category_group_id INT NOT NULL,
--     category_id INT NOT NULL,
--     category_level INT NOT NULL,
--     addjson JSON,
--     is_active TINYINT(1) DEFAULT 1,
--     created DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     UNIQUE KEY unique_mapping (business_id, category_group_id, category_id, category_level)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
