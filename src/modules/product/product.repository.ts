import pool from "../../config/db";

/* ===============================
   CREATE PRODUCT + MAPPINGS
================================ */
export const createProduct = async (data: any) => {
  if (!Array.isArray(data.mappings) || data.mappings.length === 0) {
    throw new Error("At least one category-brand mapping is required");
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result]: any = await conn.query(
      `INSERT INTO product (
        product_name,
        model,
        series,
        mrp,
        description,
        info,
        note,
        system_note,
        base_image,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.product_name,
        data.model || null,
        data.series || null,
        data.mrp || null,
        data.description,
        data.info,
        data.note || null,
        data.system_note || null,
        data.base_image,
        data.status,
      ]
    );

    const productId = result.insertId;

    if (Array.isArray(data.alternative_names) && data.alternative_names.length) {
      const altValues = data.alternative_names.map((name: string) => [
        productId,
        name
      ]);

      await conn.query(
        `INSERT INTO product_alternative_names (product_id, alternative_name)
        VALUES ?`,
        [altValues]
      );
    }

    const values = data.mappings.map((id: number) => [productId, id]);

    await conn.query(
      `INSERT INTO product_category_brand (product_id, category_brand_id)
       VALUES ?`,
      [values]
    );

    await conn.commit();
    return productId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/* ===============================
   GET ALL PRODUCTS
================================ */
export const getProducts = async () => {
  const [rows] = await pool.query(`
     SELECT
    p.id,
    p.product_name,
    -- New columns for your dashboard headers
    GROUP_CONCAT(DISTINCT COALESCE(parent_c.category_name, c.category_name) ORDER BY COALESCE(parent_c.category_name, c.category_name) SEPARATOR ', ') AS primary_category,
    GROUP_CONCAT(DISTINCT CASE WHEN parent_c.id IS NOT NULL THEN c.category_name ELSE NULL END ORDER BY c.category_name SEPARATOR ', ') AS secondary_category,
    
    p.mrp,
    p.model,
    p.series,
    p.description,
    p.info,
    p.note,
    p.system_note,
    p.base_image,
    p.status,
    GROUP_CONCAT(DISTINCT b.brand_name ORDER BY b.brand_name SEPARATOR ', ') AS brands,
    GROUP_CONCAT(
        DISTINCT CONCAT(c.category_name, ' (', b.brand_name, ')')
        ORDER BY c.category_name
        SEPARATOR ', '
    ) AS mappings
FROM product p
LEFT JOIN product_category_brand pcb 
    ON pcb.product_id = p.id
LEFT JOIN category_brand_mapping cb 
    ON cb.id = pcb.category_brand_id
    AND cb.is_active = 1
LEFT JOIN brand b 
    ON b.id = cb.brand_id
    AND b.is_active = 1
LEFT JOIN category c 
    ON c.id = cb.category_id
    AND c.is_active = 1
-- Self-join to determine the hierarchy
LEFT JOIN category parent_c 
    ON c.parent_category_id = parent_c.id
    AND parent_c.is_active = 1
WHERE p.is_active = 1
GROUP BY p.id, p.product_name, p.mrp, p.status, p.model, p.series, p.description, p.info, p.note, p.system_note, p.base_image
`);

  return rows;
};

/* ===============================
   GET PRODUCT BY ID
================================ */
export const getProductById = async (id: number) => {
  const [rows]: any = await pool.query(
    `
    SELECT
      p.id,
      p.product_name,
      p.model,
      GROUP_CONCAT(pan.alternative_name) AS alternative_names,
      p.series,
      p.mrp,
      p.description,
      p.info,
      p.note,
      p.system_note,
      p.base_image,
      p.status,

      cb.id AS mapping_id,

      c.id AS category_id,
      c.category_name,
      c.category_type,

      pc.id AS primary_category_id,
      COALESCE(pc.category_name, '-') AS primary_category_name,

      b.id AS brand_id,
      COALESCE(b.brand_name, '-') AS brand_name

    FROM product p
    LEFT JOIN product_alternative_names pan
      ON pan.product_id = p.id

    LEFT JOIN product_category_brand pcb
      ON pcb.product_id = p.id

    LEFT JOIN category_brand_mapping cb
      ON cb.id = pcb.category_brand_id
      AND cb.is_active = 1

    LEFT JOIN category c
      ON c.id = cb.category_id
      AND c.is_active = 1

    LEFT JOIN category pc
      ON pc.id = c.parent_category_id
      AND pc.is_active = 1

    LEFT JOIN brand b
      ON b.id = cb.brand_id
      AND b.is_active = 1

    WHERE p.id = ?
      AND p.is_active = 1

    GROUP BY p.id, cb.id, c.id, pc.id, b.id
    `,
    [id]
  );

  if (!rows.length) return null;

  return rows; // return all rows, not only first
};

/* ===============================
   GET PRODUCT MAPPINGS
================================ */
export const getProductsWithMappings = async () => {
  const [rows]: any = await pool.query(`
SELECT 
    -- Primary Category
    COALESCE(parent_c.id, c.id) AS primary_category_id,
    COALESCE(parent_c.category_name, c.category_name) AS primary_category_name,
    
    -- Secondary Category (NULL if the product is mapped directly to a primary)
    CASE 
        WHEN parent_c.id IS NOT NULL THEN c.id 
        ELSE NULL 
    END AS secondary_category_id,
    CASE 
        WHEN parent_c.id IS NOT NULL THEN c.category_name 
        ELSE NULL 
    END AS secondary_category_name,
    
    -- Brand
    b.id AS brand_id,
    b.brand_name,
    
    -- Product
    p.id AS product_id,
    p.product_name,
    
    -- Mapping IDs (for debugging/internal use)
    pcb.id AS product_mapping_id,
    cb.id AS category_brand_mapping_id

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
ORDER BY 
    primary_category_name ASC, 
    (secondary_category_name IS NOT NULL) ASC, 
    secondary_category_name ASC,
    b.brand_name ASC, 
    p.product_name ASC;
  `);

  return rows;
};

/* ===============================
   UPDATE PRODUCT INFO ONLY
================================ */
export const updateProduct = async (id: number, data: any) => {
  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found");

  await pool.query(
    `UPDATE product SET
      product_name = ?,
      model = ?,
      series = ?,
      mrp = ?,
      description = ?,
      info = ?, 
      note = ?,
      system_note = ?,
      base_image = COALESCE(?, base_image),
      status = ?
     WHERE id = ?`,
    [
      data.product_name,
      data.model || null,
      data.series || null,
      data.mrp || null,
      data.description,
      data.info,
      data.note || null,
      data.system_note || null,
      data.base_image || null,
      data.status,
      id,
    ]
  );
};

export const updateProductAlternativeNames = async (
  productId: number,
  names: string[]
) => {

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    await conn.query(
      `DELETE FROM product_alternative_names WHERE product_id = ?`,
      [productId]
    );

    if (names.length) {
      const values = names.map(name => [productId, name]);

      await conn.query(
        `INSERT INTO product_alternative_names (product_id, alternative_name)
         VALUES ?`,
        [values]
      );
    }

    await conn.commit();

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/* ===============================
   UPDATE PRODUCT MAPPINGS
================================ */
export const updateProductMappings = async (
  productId: number,
  mappingIds: number[]
) => {
  // 1️⃣ Must be array
  if (!Array.isArray(mappingIds) || mappingIds.length === 0) {
    throw new Error("Mappings array cannot be empty");
  }

  // 2️⃣ Must contain integers
  if (!mappingIds.every(Number.isInteger)) {
    throw new Error("Invalid mapping IDs");
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      `DELETE FROM product_category_brand WHERE product_id = ?`,
      [productId]
    );

    const values = mappingIds.map(id => [productId, id]);

    await conn.query(
      `INSERT INTO product_category_brand (product_id, category_brand_id)
       VALUES ?`,
      [values]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const deleteProduct = async (id: number) => {
  await pool.query(`UPDATE product SET is_active = 0 WHERE id = ?`, [id]);
};

/* ===============================
   UPDATE MRP ONLY
================================ */
export const updateProductMRP = async (id: number, mrp: number) => {
  await pool.query(`UPDATE product SET mrp = ? WHERE id = ?`, [mrp, id]);
};

/* ===============================
   QR DATA FETCH
================================ */
export const getProductForQrPdf = async (productId: number) => {
  const [[row]]: any = await pool.query(
    `
    SELECT
      p.id,
      p.product_name,
      p.mrp,
      (SELECT GROUP_CONCAT(
         CONCAT(c.category_name, ' (', b.brand_name, ')')
         SEPARATOR ', '
       )
       FROM product_category_brand pcb
       LEFT JOIN category_brand_mapping cb ON cb.id = pcb.category_brand_id AND cb.is_active = 1
       LEFT JOIN brand b ON b.id = cb.brand_id AND b.is_active = 1
       LEFT JOIN category c ON c.id = cb.category_id AND c.is_active = 1
       WHERE pcb.product_id = p.id
      ) AS category_name,
      '' AS brand_name
    FROM product p
    WHERE p.id = ?
      AND p.is_active = 1
    LIMIT 1
    `,
    [productId]
  );

  return row || null;
};

export const updateProductTx = async (id: number, data: any) => {
  await pool.query(
    `UPDATE product SET product_name=?, mrp=? WHERE id=?`,
    [data.product_name, data.mrp, id]
  );
};

export const updateProductMappingsTx = async (
  productId: number,
  mappingIds: number[]
) => {
  await pool.query(
    `DELETE FROM product_category_brand WHERE product_id = ?`,
    [productId]
  );

  const values = mappingIds.map(id => [productId, id]);

  await pool.query(
    `INSERT INTO product_category_brand (product_id, category_brand_id)
     VALUES ?`,
    [values]
  );
};


export const createProductTax = async (data: any) => {

  const [result]: any = await pool.query(
    `INSERT INTO product_tax
     (product_id, gst_variant_id, hsn_code)
     VALUES (?, ?, ?)`,
    [
      data.product_id,
      data.gst_variant_id,
      data.hsn_code || null
    ]
  );

  return result.insertId;
};


/* ================= GET ALL ================= */

export const getAllProductTax = async () => {

  const [rows] = await pool.query(
    `SELECT
        pt.id,
        pt.product_id,
        p.product_name,

        pt.gst_variant_id,
        vf.value AS gst,

        pt.hsn_code,
        pt.status,
        pt.created,
        pt.updated

     FROM product_tax pt

     LEFT JOIN product p
        ON p.id = pt.product_id
        AND p.is_active = 1

     LEFT JOIN variants_fields vf
        ON vf.id = pt.gst_variant_id
        AND vf.is_active = 1

     WHERE pt.is_active = 1

     ORDER BY pt.id DESC`
  );

  return rows;
};


/* ================= GET BY ID ================= */

export const getProductTaxById = async (id: number) => {

  const [[row]]: any = await pool.query(
    `SELECT *
     FROM product_tax
     WHERE id = ?
       AND is_active = 1
     LIMIT 1`,
    [id]
  );

  return row || null;
};


/* ================= UPDATE ================= */

export const updateProductTax = async (id: number, data: any) => {

  await pool.query(
    `UPDATE product_tax
     SET product_id = ?,
         gst_variant_id = ?,
         hsn_code = ?,
         status = ?
     WHERE id = ?`,
    [
      data.product_id,
      data.gst_variant_id,
      data.hsn_code || null,
      data.status,
      id
    ]
  );

};


/* ================= DELETE ================= */

export const deleteProductTax = async (id: number) => {

  await pool.query(
    `UPDATE product_tax
     SET is_active = 0
     WHERE id = ?`,
    [id]
  );

};