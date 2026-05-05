import pool from "../../config/db";

export const getProducts = async ({
  limit,
  offset,
  search,
  brand,
  category,
  status,
}: any) => {
  let where = `WHERE p.is_active = 1`;
  const values: any[] = [];

  // 🔍 SEARCH
  if (search) {
    where += `
    AND (
      p.product_name LIKE ?
      OR p.model LIKE ?

      -- 🔥 ALTERNATIVE NAMES
      OR EXISTS (
        SELECT 1 FROM product_alternative_names pan
        WHERE pan.product_id = p.id
        AND pan.alternative_name LIKE ?
      )

      -- 🔥 DYNAMIC FIELDS (barcode, gst, etc.)
      OR EXISTS (
        SELECT 1 FROM product_dynamic_fields pdf
        WHERE pdf.product_id = p.id
        AND pdf.value LIKE ?
      )
    )
  `;

    values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  // 🏷️ BRAND FILTER
  if (brand) {
    where += ` AND b.brand_name = ?`;
    values.push(brand);
  }

  // 📦 CATEGORY FILTER
  if (category) {
    where += ` AND c.category_name = ?`;
    values.push(category);
  }

  // ⚡ STATUS FILTER
  if (status) {
    where += ` AND p.status = ?`;
    values.push(status);
  }

  const dataQuery = `
    SELECT
      p.id,
      p.product_name,
      p.mrp,
      p.model,
      p.series,
      p.base_image,
      p.status,

      GROUP_CONCAT(DISTINCT b.brand_name) AS brands,
      GROUP_CONCAT(DISTINCT c.category_name) AS categories

    FROM product p

    LEFT JOIN product_category_brand pcb 
      ON pcb.product_id = p.id

    LEFT JOIN category_brand_mapping cb 
      ON cb.id = pcb.category_brand_id

    LEFT JOIN brand b 
      ON b.id = cb.brand_id

    LEFT JOIN category c 
      ON c.id = cb.category_id

    ${where}

    GROUP BY p.id

    ORDER BY p.id DESC

    LIMIT ? OFFSET ?
  `;

  values.push(limit, offset);

  const [rows] = await pool.query(dataQuery, values);

  // 🔥 TOTAL COUNT (for pagination UI)
  const countQuery = `
    SELECT COUNT(DISTINCT p.id) as total
    FROM product p
    LEFT JOIN product_category_brand pcb 
      ON pcb.product_id = p.id
    LEFT JOIN category_brand_mapping cb 
      ON cb.id = pcb.category_brand_id
    LEFT JOIN brand b 
      ON b.id = cb.brand_id
    LEFT JOIN category c 
      ON c.id = cb.category_id
    ${where}
  `;

  const [countResult]: any = await pool.query(
    countQuery,
    values.slice(0, values.length - 2),
  );

  return {
    data: rows,
    total: countResult[0].total,
  };
};

export const getProductById = async (id: number) => {
  const [rows]: any = await pool.query(
    `
    SELECT
      p.id,
      p.product_name,
      p.model,
      p.series,
      p.mrp,
      p.description,
      p.info,
      p.note,
      p.system_note,
      p.base_image,
      p.status,

      pan.alternative_name,

      cb.id AS mapping_id,
      c.id AS category_id,
      c.category_name,
      c.category_type,
      pc.id AS primary_category_id,
      pc.category_name AS primary_category_name,
      b.id AS brand_id,
      b.brand_name,

      pdf.field_id,
      pdf.value,
      f.field_name,
      f.display_name

    FROM product p

    LEFT JOIN product_alternative_names pan
      ON pan.product_id = p.id

    LEFT JOIN product_category_brand pcb
      ON pcb.product_id = p.id

    LEFT JOIN category_brand_mapping cb
      ON cb.id = pcb.category_brand_id

    LEFT JOIN category c
      ON c.id = cb.category_id

    LEFT JOIN category pc
      ON pc.id = c.parent_category_id

    LEFT JOIN brand b
      ON b.id = cb.brand_id

    LEFT JOIN product_dynamic_fields pdf 
    ON pdf.product_id = p.id 
    AND pdf.category_brand_id = pcb.category_brand_id

    LEFT JOIN multitab_fields f
    ON f.id = pdf.field_id

    WHERE p.id = ?
      AND p.is_active = 1
    `,
    [id],
  );

  if (!rows.length) return null;

  return rows; // ✅ IMPORTANT (NOT rows[0])
};

export const productUrlKey = async () => {
  const [rows] = await pool.query<any[]>(`
    SELECT
      p.id,
      p.product_name,
      p.model,
      p.series,
      b.brand_name,
      c.category_name,
      pan.alternative_name
    FROM product p

    LEFT JOIN product_category_brand pcb 
      ON pcb.product_id = p.id

    LEFT JOIN category_brand_mapping cb 
      ON cb.id = pcb.category_brand_id

    LEFT JOIN brand b 
      ON b.id = cb.brand_id

    LEFT JOIN category c 
      ON c.id = cb.category_id

    LEFT JOIN product_alternative_names pan
      ON pan.product_id = p.id

    WHERE p.is_active = 1
    LIMIT 1
  `);

  return {
    keys: rows.length ? Object.keys(rows[0]) : [],
  };
};

export const getProductsWithMappings = async (search: string = "") => {
  // 🔒 Safety
  search = search?.trim() || "";

  // 🔍 Search
  const searchQuery = search
    ? `AND (
        p.product_name LIKE ? OR
        b.brand_name LIKE ? OR
        c.category_name LIKE ? OR
        parent_c.category_name LIKE ?
      )`
    : "";

  const searchParams = search
    ? [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
    : [];

  // 🔹 MAIN QUERY
  const [rows]: any = await pool.query(
    `
SELECT 
    COALESCE(parent_c.id, c.id) AS primary_category_id,
    COALESCE(parent_c.category_name, c.category_name) AS primary_category_name,
    COALESCE(parent_c.description, c.description) AS primary_category_description,
    
    CASE 
        WHEN parent_c.id IS NOT NULL THEN c.id 
        ELSE NULL 
    END AS secondary_category_id,

    CASE 
        WHEN parent_c.id IS NOT NULL THEN c.category_name 
        ELSE NULL 
    END AS secondary_category_name,

    CASE 
        WHEN parent_c.id IS NOT NULL THEN c.description 
        ELSE NULL 
    END AS secondary_category_description,
    
    b.id AS brand_id,
    b.brand_name,
    b.description AS brand_description,
    
    p.id AS product_id,
    p.product_name,
    p.description AS product_description

FROM product p

LEFT JOIN product_category_brand pcb 
    ON p.id = pcb.product_id

LEFT JOIN category_brand_mapping cb 
    ON pcb.category_brand_id = cb.id
    AND cb.is_active = 1

LEFT JOIN category c 
    ON cb.category_id = c.id
    AND c.is_active = 1

LEFT JOIN category parent_c 
    ON c.parent_category_id = parent_c.id
    AND parent_c.is_active = 1

LEFT JOIN brand b 
    ON cb.brand_id = b.id
    AND b.is_active = 1

WHERE p.is_active = 1
${searchQuery}

ORDER BY 
    primary_category_name ASC,
    CASE WHEN parent_c.id IS NULL THEN 0 ELSE 1 END ASC,
    secondary_category_name ASC,
    b.brand_name ASC,
    p.product_name ASC
`,
    [...searchParams],
  );

  // 🔹 COUNT
  const [countResult]: any = await pool.query(
    `
SELECT COUNT(DISTINCT p.id) as total
FROM product p
LEFT JOIN product_category_brand pcb ON p.id = pcb.product_id
LEFT JOIN category_brand_mapping cb ON pcb.category_brand_id = cb.id AND cb.is_active = 1
LEFT JOIN category c ON cb.category_id = c.id AND c.is_active = 1
LEFT JOIN category parent_c ON c.parent_category_id = parent_c.id AND parent_c.is_active = 1
LEFT JOIN brand b ON cb.brand_id = b.id AND b.is_active = 1
WHERE p.is_active = 1
${searchQuery}
`,
    searchParams,
  );

  // 🌳 TREE BUILD
  const categoryMap = new Map();

  for (const row of rows) {
    // ❗ only skip if product missing
    if (!row.product_id) continue;

    const primaryId = row.primary_category_id || 0;

    if (!categoryMap.has(primaryId)) {
      categoryMap.set(primaryId, {
        primary_category_id: primaryId,
        primary_category_name: row.primary_category_name || "Uncategorized",
        primary_category_description: row.primary_category_description,
        secondary_categories: new Map(),
        brands: new Map(),
      });
    }

    const category = categoryMap.get(primaryId);

    // 🔸 WITH SECONDARY CATEGORY
    if (row.secondary_category_id) {
      if (!category.secondary_categories.has(row.secondary_category_id)) {
        category.secondary_categories.set(row.secondary_category_id, {
          secondary_category_id: row.secondary_category_id,
          secondary_category_name: row.secondary_category_name,
          secondary_category_description: row.secondary_category_description,
          brands: new Map(),
        });
      }

      const sec = category.secondary_categories.get(row.secondary_category_id);

      const brandId = row.brand_id || 0;

      if (!sec.brands.has(brandId)) {
        sec.brands.set(brandId, {
          brand_id: row.brand_id,
          brand_name: row.brand_name || "No Brand",
          brand_description: row.brand_description,
          products: [],
        });
      }

      sec.brands.get(brandId).products.push({
        product_id: row.product_id,
        product_name: row.product_name,
        product_description: row.product_description,
      });
    } else {
      // 🔸 DIRECT UNDER PRIMARY
      const brandId = row.brand_id || 0;

      if (!category.brands.has(brandId)) {
        category.brands.set(brandId, {
          brand_id: row.brand_id,
          brand_name: row.brand_name || "No Brand",
          brand_description: row.brand_description,
          products: [],
        });
      }

      category.brands.get(brandId).products.push({
        product_id: row.product_id,
        product_name: row.product_name,
        product_description: row.product_description,
      });
    }
  }

  // 🔄 Convert Maps → Arrays
  const finalData = Array.from(categoryMap.values()).map((cat: any) => ({
    primary_category_id: cat.primary_category_id,
    primary_category_name: cat.primary_category_name,
    primary_category_description: cat.primary_category_description,

    secondary_categories: Array.from(cat.secondary_categories.values()).map(
      (sec: any) => ({
        ...sec,
        brands: Array.from(sec.brands.values()),
      }),
    ),

    brands: Array.from(cat.brands.values()),
  }));

  return {
    data: finalData,
  };
};
