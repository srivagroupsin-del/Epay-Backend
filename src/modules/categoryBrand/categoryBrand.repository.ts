import pool from "../../config/db";

/**
 * Assign selected brands to a category
 * (react checkbox save)
 */
export const mapBrandsToCategory = async (
  categoryId: number,
  brandIds: number[],
) => {
  if (brandIds.length === 0) return;

  await pool.query(
    `INSERT INTO category_brand_mapping (category_id, brand_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE
       is_active = 1,
       status = 'active'`,
    [brandIds.map((id) => [categoryId, id])],
  );
};

/**
 * Soft-remove unselected brands
 */
export const unmapUnselectedBrands = async (
  categoryId: number,
  selectedBrandIds: number[],
) => {
  if (selectedBrandIds.length === 0) {
    await pool.query(
      `UPDATE category_brand_mapping
       SET is_active = 0
       WHERE category_id = ?`,
      [categoryId],
    );
    return;
  }

  await pool.query(
    `UPDATE category_brand_mapping
     SET is_active = 0
     WHERE category_id = ?
       AND brand_id NOT IN (?)`,
    [categoryId, selectedBrandIds],
  );
};

/**
 * Get brands mapped to category
 */
export const getBrandsByCategory = async (categoryId: number) => {
  const [rows] = await pool.query(
    `SELECT b.*
     FROM category_brand_mapping cbm
     LEFT JOIN brand b
       ON b.id = cbm.brand_id
       AND b.is_active = 1
     WHERE cbm.category_id = ?
       AND cbm.is_active = 1`,
    [categoryId],
  );
  return rows;
};

/* Get category by ID */
export const getCategoryById = async (id: number) => {
  const [[row]]: any = await pool.query(
    `SELECT *
     FROM category
     WHERE id = ?
       AND is_active = 1
     LIMIT 1`,
    [id],
  );
  return row || null;
};

/* Get mapped brands for a category */
export const getMappedBrands = async (categoryId: number) => {
  const [rows] = await pool.query(
    `SELECT
        b.id,
        COALESCE(b.brand_name, '-') AS brand_name,
        b.image
     FROM category_brand_mapping cbm
     LEFT JOIN brand b
       ON b.id = cbm.brand_id
       AND b.is_active = 1
     WHERE cbm.category_id = ?
       AND cbm.is_active = 1
     ORDER BY b.brand_name ASC`,
    [categoryId],
  );

  return rows;
};

export const getAllCategoryBrandMappings = async () => {
  const [rows] = await pool.query<any[]>(`
    SELECT
      -- Primary (either itself or parent)
      CASE 
        WHEN c.category_type = 'primary' THEN c.id
        ELSE p.id
      END AS primary_id,

      COALESCE(
        CASE 
          WHEN c.category_type = 'primary' THEN c.category_name
          ELSE p.category_name
        END, 
        '-'
      ) AS primary_name,

      -- Secondary (nullable if brand mapped directly to primary)
      CASE 
        WHEN c.category_type = 'secondary' THEN c.id
        ELSE NULL
      END AS secondary_id,

      COALESCE(
        CASE 
          WHEN c.category_type = 'secondary' THEN c.category_name
          ELSE NULL
        END,
        '-'
      ) AS secondary_name,

      b.id AS brand_id,
      COALESCE(b.brand_name, '-') AS brand_name

    FROM category_brand_mapping cbm

    LEFT JOIN brand b
      ON b.id = cbm.brand_id
     AND b.is_active = 1

    LEFT JOIN category c
      ON c.id = cbm.category_id
     AND c.is_active = 1

    LEFT JOIN category p
      ON p.id = c.parent_category_id
     AND p.is_active = 1

    WHERE cbm.is_active = 1;
  `);

  const tree: any = {};

  for (const r of rows) {
    if (!tree[r.primary_id]) {
      tree[r.primary_id] = {
        primary_id: r.primary_id,
        primary_name: r.primary_name,
        brands: [],          // 👈 primary-level brands
        secondaries: {}
      };
    }

    if (r.secondary_id) {
      if (!tree[r.primary_id].secondaries[r.secondary_id]) {
        tree[r.primary_id].secondaries[r.secondary_id] = {
          secondary_id: r.secondary_id,
          secondary_name: r.secondary_name,
          brands: []
        };
      }

      tree[r.primary_id].secondaries[r.secondary_id].brands.push({
        brand_id: r.brand_id,
        brand_name: r.brand_name
      });

    } else {
      // 👇 brand mapped directly to primary
      tree[r.primary_id].brands.push({
        brand_id: r.brand_id,
        brand_name: r.brand_name
      });
    }
  }

  return Object.values(tree).map((p: any) => ({
    ...p,
    secondaries: Object.values(p.secondaries)
  }));
};