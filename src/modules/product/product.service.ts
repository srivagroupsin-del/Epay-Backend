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
export const fetchProducts = async (params: any) => {
  return repo.getProducts(params);
};

/* =========================================
   FETCH SINGLE PRODUCT
========================================= */
export const fetchProductById = async (id: number) => {
  const rows = await repo.getProductById(id);

  if (!rows || rows.length === 0) {
    throw new Error("Product not found");
  }

  const dynamicMap = new Map<string, any>(); // ✅ FIXED

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

    // 🔥 FIXED DYNAMIC FIELD LOGIC
    if (row.field_id) {
      const key = `${row.mapping_id}_${row.field_id}`;

      if (!dynamicMap.has(key)) {
        dynamicMap.set(key, {
          mapping_id: row.mapping_id,
          field_id: row.field_id,
          field_name: row.field_name,
          display_name: row.display_name,
          value: row.value,
        });
      }
    }
  }

  product.alternative_names = Array.from(altSet);

  (product as any).dynamic_fields = Array.from(dynamicMap.values());

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

  const resolvedMappingIds = await resolveMappings(data.mappings);

  data.mappings = resolvedMappingIds;

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

  // 3️⃣ update mappings
  if (Array.isArray(data.mappings) && data.mappings.length > 0) {
    const resolvedMappingIds = await resolveMappings(data.mappings);
    await repo.updateProductMappings(id, resolvedMappingIds);
  }

  // 🔥 ADD THIS
  if (Array.isArray(data.dynamic_fields)) {
    await repo.updateProductDynamicFields(id, data.dynamic_fields);
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

  const resolvedMappingIds = await resolveMappings(mappings);

  await repo.updateProductMappings(productId, resolvedMappingIds);

  await logAudit({
    user_id: userId,
    module: "product",
    record_id: productId,
    action: "update",
    new_data: { mappings: resolvedMappingIds },
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

    resolved.push(rows[0].id);
  }

  return [...new Set(resolved)];
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
  userId: number,
) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1️⃣ product
    await repo.updateProductTx(product.id, product);

    // 🔥 ADD THIS BEFORE commit
    if (product.dynamic_fields) {
      await repo.updateProductDynamicFields(product.id, product.dynamic_fields);
    }

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

    // 3️⃣ mappings
    const uniqueMappings = [...new Set(mappings)];
    await repo.updateProductMappingsTx(product.id, uniqueMappings);

    await conn.commit();

    await logAudit({
      user_id: userId,
      module: "product",
      record_id: product.id,
      action: "update",
      new_data: { product, mappings, alternative_names },
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
