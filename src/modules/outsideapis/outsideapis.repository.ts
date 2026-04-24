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
