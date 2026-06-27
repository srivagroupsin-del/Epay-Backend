import * as repo from "./product.repository";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { logAudit } from "../audit/audit.service";
import pool from "../../config/db";
import { ensureUniqueActive } from "../../utils/uniqueCheck";

/* =========================================
   FETCH ALL PRODUCTS
========================================= */
const parseIds = (val: string | null): number[] =>
  val ? val.split(",").map(Number) : [];

export const fetchProducts = async (params: any) => {
  const result = await repo.getProducts(params);

  const data = (result.data as any[]).map((row) => ({
    ...row,
    brand_ids: parseIds(row.brand_ids),
    primary_category_ids: parseIds(row.primary_category_ids),
    secondary_category_ids: parseIds(row.secondary_category_ids),
  }));

  return { ...result, data };
};

/* =========================================
   FETCH SINGLE PRODUCT
========================================= */
export const fetchProductById = async (id: number) => {
  const rows = await repo.getProductById(id);

  if (!rows || rows.length === 0) {
    throw new Error("Product not found");
  }

  const first = rows[0];

  const product = {
    id: first.id,
    product_name: first.product_name,
    model: first.model,
    series: first.series,
    mrp: first.mrp,
    description: first.description,
    info: first.info,
    note: first.note,
    system_note: first.system_note,
    base_image: first.base_image,
    status: first.status,
    alternative_names: [] as string[],
    mappings: [] as any[],
    brands: "" as string,
    categories: "" as string,
    barcodes: [] as any[]
  };

  const altSet = new Set<string>();
  const mapSet = new Set<number>();

  for (const row of rows) {
    // ✅ alternative names
    if (row.alternative_name) {
      altSet.add(row.alternative_name);
    }

    // ✅ mappings
    if (row.mapping_id && !mapSet.has(row.mapping_id)) {
      mapSet.add(row.mapping_id);

      product.mappings.push({
        mapping_id: row.mapping_id,
        category_id: row.category_id,
        category_name: row.category_name,
        category_type: row.category_type,
        primary_category_id: row.primary_category_id,
        primary_category_name: row.primary_category_name,
        brand_id: row.brand_id,
        brand_name: row.brand_name,
      });
    }
  }

  product.alternative_names = Array.from(altSet);

  const brandNames = Array.from(new Set(product.mappings.map((m: any) => m.brand_name).filter(Boolean)));
  product.brands = brandNames.join(', ');

  const categoryNames = Array.from(new Set(product.mappings.map((m: any) => m.category_name).filter(Boolean)));
  product.categories = categoryNames.join(', ');

  // Fetch barcodes
  const [barcodeRows]: any = await pool.query(
    `SELECT pb.category_id, c.category_name, pb.barcode 
     FROM product_barcodes pb
     LEFT JOIN category c ON c.id = pb.category_id
     WHERE pb.product_id = ?`,
    [id]
  );
  product.barcodes = barcodeRows.map((row: any) => ({
    category_id: row.category_id,
    category_name: row.category_name,
    barcode: row.barcode
  }));

  return product;
};

/* =========================================
   CREATE PRODUCT
========================================= */
export const createProduct = async (data: any, userId: number) => {
  await ensureUniqueActive("product", "model", data.model);

  if (!Array.isArray(data.mappings) || data.mappings.length === 0) {
    throw new Error("Mappings must be a non-empty array");
  }

  const resolved = await resolveMappings(data.mappings);

  data.mappings = resolved.resolvedIds;

  const id = await repo.createProduct(data);

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: id,
    action: "create",
    new_data: data,
  });

  return { id, message: "Product created successfully" };
};

/* =========================================
   UPDATE PRODUCT (INFO + OPTIONAL MAPPINGS)
========================================= */
export const updateProduct = async (id: number, data: any, userId: number) => {
  await ensureUniqueActive("product", "model", data.model, id);

  // 1️⃣ update product
  await repo.updateProduct(id, data);

  // 2️⃣ update alternative names ✅ ADD THIS
  if (Array.isArray(data.alternative_names)) {
    await repo.updateProductAlternativeNames(id, data.alternative_names);
  }

  // 🔥 update barcodes
  if (Array.isArray(data.barcodes)) {
    await repo.updateProductBarcodes(id, data.barcodes);
  }

  // 3️⃣ update mappings
  if (Array.isArray(data.mappings) && data.mappings.length > 0) {
    const resolved = await resolveMappings(data.mappings);
    await repo.updateProductMappings(id, resolved.resolvedIds);
  }

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: id,
    action: "update",
    new_data: data,
  });

  return { message: "Product updated successfully" };
};
/* =========================================
   UPDATE ONLY MAPPINGS
========================================= */
export const updateProductMappings = async (
  productId: number,
  mappings: any[],
  userId: number,
) => {
  if (!Array.isArray(mappings) || mappings.length === 0) {
    throw new Error("Mappings must be a non-empty array");
  }

  const resolved = await resolveMappings(mappings);

  await repo.updateProductMappings(productId, resolved.resolvedIds);

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: productId,
    action: "update",
    new_data: { mappings: resolved.resolvedIds },
  });

  return { message: "Product mappings updated successfully" };
};

/* =========================================
   DELETE PRODUCT
========================================= */
export const removeProduct = async (id: number, userId: number) => {
  const product = await repo.getProductById(id);
  if (!product) throw new Error("Product not found");

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteProduct(id);

  return { message: "Product deleted successfully" };
};

/* =========================================
   UPDATE MRP
========================================= */
export const updateMRP = async (id: number, mrp: number, userId: number) => {
  await repo.updateProductMRP(id, mrp);

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: id,
    action: "update",
    new_data: { mrp },
  });

  return { message: "MRP updated successfully" };
};

/* =========================================
   BULK UPDATE MAPPINGS
========================================= */
export const bulkUpdateMappings = async (
  productIds: number[],
  mappingIds: number[],
  userId: number,
) => {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error("productIds must be a non-empty array");
  }

  if (!Array.isArray(mappingIds) || mappingIds.length === 0) {
    throw new Error("Mappings must be a non-empty array");
  }

  if (!productIds.every(Number.isInteger)) {
    throw new Error("Invalid product IDs");
  }

  if (!mappingIds.every(Number.isInteger)) {
    throw new Error("Invalid mapping IDs");
  }

  const uniqueMappings = [...new Set(mappingIds)];

  for (const pid of productIds) {
    await repo.updateProductMappings(pid, uniqueMappings);

    await logAudit({
      user_id: userId,
      module: "product",
      record_id: pid,
      action: "update",
      new_data: { mappings: uniqueMappings },
    });
  }

  return { message: "Bulk mapping update completed" };
};

/* =========================================
   RESOLVE CATEGORY + BRAND → MAPPING ID
========================================= */
const resolveMappings = async (mappings: any[]) => {
  const resolved: number[] = [];
  const categoryMap = new Map<number, number>();

  for (const m of mappings) {
    const primaryId = Number(m.primary_id);
    const secondaryId = Number(m.secondary_id);
    const brandId = Number(m.brand_id);

    if (!brandId) {
      throw new Error("Invalid brand ID");
    }

    let categoryId = secondaryId > 0 ? secondaryId : primaryId;

    if (!categoryId) {
      throw new Error("Invalid category ID");
    }

    // 🔎 First try exact category (secondary if present)
    let [rows]: any = await pool.query(
      `
      SELECT id
      FROM category_brand_mapping
      WHERE category_id = ?
        AND brand_id = ?
        AND is_active = 1
      `,
      [categoryId, brandId],
    );

    // 🔥 Fallback to primary if secondary mapping not found
    if (!rows.length && secondaryId > 0) {
      [rows] = await pool.query(
        `
        SELECT id
        FROM category_brand_mapping
        WHERE category_id = ?
          AND brand_id = ?
          AND is_active = 1
        `,
        [primaryId, brandId],
      );
    }

    if (!rows.length) {
      throw new Error(
        `Invalid category-brand combination (Category: ${categoryId}, Brand: ${brandId})`,
      );
    }

    const mappingId = rows[0].id;
    resolved.push(mappingId);

    // 🔥 Store mapping for dynamic fields
    categoryMap.set(primaryId, mappingId);
    if (secondaryId > 0) {
      categoryMap.set(secondaryId, mappingId);
    }
  }

  return {
    resolvedIds: [...new Set(resolved)],
    categoryMap,
  };
};

export const fetchProductMappings = async () => {
  return repo.getProductsWithMappings();
};

/**
 * GENERATE QR PDF
 */
export const generateProductQrPdf = async (productId: number) => {
  const product = await repo.getProductForQrPdf(productId);
  if (!product) throw new Error("Product not found");

  const qrText =
    `Product: ${product.product_name}\n` +
    `Price: ${product.mrp}\n` +
    `Brand: ${product.brand_name}\n` +
    `Category: ${product.category_name}`;

  const qrImage = await QRCode.toDataURL(qrText);

  const fileName = `${product.product_name.replace(/\s+/g, "_")}-qr.pdf`;
  const filePath = path.join("uploads/qrcodes", fileName);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(18).text("Product QR Code", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Product Name: ${product.product_name}`);
  doc.text(`Brand: ${product.brand_name}`);
  doc.text(`Category: ${product.category_name}`);
  doc.text(`Price: ₹${product.mrp}`);
  doc.moveDown();

  doc.image(qrImage, { fit: [200, 200], align: "center" });

  doc.end();

  await new Promise((resolve) => stream.on("finish", resolve));

  return { fileName, filePath };
};

export const updateFullProduct = async (
  product: any,
  mappings: number[],
  alternative_names: string[],
  barcodes: any[],
  userId: number,
) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1️⃣ product
    await repo.updateProductTx(product.id, product);

    // 2️⃣ alternative names
    await conn.query(
      `DELETE FROM product_alternative_names WHERE product_id = ?`,
      [product.id],
    );

    if (alternative_names?.length) {
      const values = alternative_names.map((name) => [product.id, name]);

      await conn.query(
        `INSERT INTO product_alternative_names (product_id, alternative_name)
         VALUES ?`,
        [values],
      );
    }

    // 🔥 BARCODES
    await conn.query(
      `DELETE FROM product_barcodes WHERE product_id = ?`,
      [product.id],
    );

    if (barcodes?.length) {
      const values = barcodes.map((b: any) => [product.id, b.category_id, b.barcode]);

      await conn.query(
        `INSERT INTO product_barcodes (product_id, category_id, barcode)
         VALUES ?`,
        [values],
      );
    }

    // 3️⃣ mappings
    const uniqueMappings = [...new Set(mappings)];
    await repo.updateProductMappingsTx(product.id, uniqueMappings);

    await conn.commit();

    await logAudit({
      user_id: userId,
      module: "product",
      record_id: product.id,
      action: "update",
      new_data: { product, mappings, alternative_names, barcodes },
    });

    return { message: "Product updated successfully" };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const createProductTax = async (data: any, userId: number) => {
  const id = await repo.createProductTax(data);

  await logAudit({
    user_id: userId,
    module: "product_tax",
    record_id: id,
    action: "create",
    new_data: JSON.stringify(data),
  });

  return {
    id,
    message: "Product tax created successfully",
  };
};

/* GET */

export const fetchProductTax = async () => {
  return repo.getAllProductTax();
};

export const fetchProductTaxById = async (id: number) => {
  return repo.getProductTaxById(id);
};

/* UPDATE */

export const updateProductTax = async (
  id: number,
  data: any,
  userId: number,
) => {
  const old = await repo.getProductTaxById(id);

  if (!old) {
    throw new Error("Product tax not found");
  }

  await repo.updateProductTax(id, data);

  await logAudit({
    user_id: userId,
    module: "product_tax",
    record_id: id,
    action: "update",
    new_data: JSON.stringify(data),
  });

  return {
    message: "Product tax updated successfully",
  };
};

/* DELETE */

export const removeProductTax = async (id: number, userId: number) => {
  await logAudit({
    user_id: userId,
    module: "product_tax",
    record_id: id,
    action: "delete",
    new_data: null,
  });

  await repo.deleteProductTax(id);

  return {
    message: "Product tax deleted successfully",
  };
};

/* =========================================
   FETCH PRODUCT STRUCTURE
========================================= */
export const fetchProductStructure = async () => {
  const columns = await repo.getProductStructure();

  const enrichedFields = columns.map((col: any) => {
    let type = "string";
    const lowerType = col.Type.toLowerCase();

    if (
      lowerType.includes("int") ||
      lowerType.includes("decimal") ||
      lowerType.includes("double") ||
      lowerType.includes("float")
    ) {
      type = "number";
    } else if (
      lowerType.includes("date") ||
      lowerType.includes("time") ||
      lowerType.includes("timestamp")
    ) {
      type = "date";
    } else if (
      lowerType.includes("tinyint(1)") ||
      lowerType.includes("boolean") ||
      lowerType.includes("bit")
    ) {
      type = "boolean";
    }

    const label = col.Field
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      field: col.Field,
      type: type,
      dbType: col.Type,
      isNullable: col.Null === "YES",
      isPrimaryKey: col.Key === "PRI",
      defaultValue: col.Default,
      extra: col.Extra,
      label: label,
    };
  });

  const relationalFields = [
    {
      field: "alternative_names",
      type: "array",
      dbType: "varchar(255)[] (via product_alternative_names)",
      isNullable: true,
      isPrimaryKey: false,
      defaultValue: null,
      extra: "Relational - list of alternative names for search",
      label: "Alternative Names",
    },
    {
      field: "barcodes",
      type: "array",
      dbType: "relation[] (via product_barcodes)",
      isNullable: true,
      isPrimaryKey: false,
      defaultValue: null,
      extra: "Relational - barcodes per category",
      label: "Barcodes",
    },
    {
      field: "mappings",
      type: "array",
      dbType: "relation[] (via product_category_brand)",
      isNullable: false,
      isPrimaryKey: false,
      defaultValue: null,
      extra: "Relational - brand & category mapping combinations",
      label: "Category-Brand Mappings",
    },
  ];

  return {
    tableName: "product",
    fields: [...enrichedFields, ...relationalFields],
  };
};



export const fetchProductByBarcode = async (barcode: string) => {
  const [rows]: any = await pool.query(
    "SELECT product_id FROM product_barcodes WHERE barcode = ? AND is_active = 1",
    [barcode]
  );
  if (!rows || rows.length === 0) {
    const [modelRows]: any = await pool.query(
      "SELECT id FROM product WHERE model = ? AND is_active = 1",
      [barcode]
    );
    if (!modelRows || modelRows.length === 0) {
      throw new Error("Product not found for the given barcode");
    }
    return fetchProductById(modelRows[0].id);
  }
  return fetchProductById(rows[0].product_id);
};

export const generateProductBarcode = async (productId: number, categoryId: number | undefined, userId: number) => {
  let targetCategoryId = categoryId;
  
  if (!targetCategoryId) {
    const [mappings]: any = await pool.query(
      `SELECT cb.category_id 
       FROM product_category_brand pcb
       JOIN category_brand_mapping cb ON cb.id = pcb.category_brand_id
       WHERE pcb.product_id = ? AND pcb.is_active = 1 AND cb.is_active = 1
       LIMIT 1`,
      [productId]
    );
    if (!mappings || !mappings.length) {
      throw new Error("Product must be mapped to a category before generating a barcode.");
    }
    targetCategoryId = mappings[0].category_id;
  }

  let barcode = "";
  let isUnique = false;
  let attempts = 0;
  
  while (!isUnique && attempts < 10) {
    attempts++;
    barcode = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    const [rows]: any = await pool.query(
      "SELECT 1 FROM product_barcodes WHERE barcode = ? AND is_active = 1 LIMIT 1",
      [barcode]
    );
    if (rows.length === 0) {
      isUnique = true;
    }
  }

  if (!isUnique) {
    throw new Error("Failed to generate a unique barcode. Please try again.");
  }

  await pool.query(
    `INSERT INTO product_barcodes (product_id, category_id, barcode)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE barcode = VALUES(barcode)`,
    [productId, targetCategoryId, barcode]
  );

  await logAudit({
    user_id: userId,
    module: "product_barcodes",
    record_id: productId,
    action: "create",
    new_data: { product_id: productId, category_id: targetCategoryId, barcode },
  });

  return {
    category_id: targetCategoryId,
    barcode,
  };
};

