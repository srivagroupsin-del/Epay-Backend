import * as repo from "./outsideapis.repository";

export const fetchProducts = async (params: any) => {
  return repo.getProducts(params);
};

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



  return product;
};

export const fetchProductKeys = async () => {
  return repo.productUrlKey();
};

export const fetchProductMappings = async (search: string = "", baseUrl: string = "") => {
  return repo.getProductsWithMappings(search, baseUrl);
};

export const updateMRP = async (id: number, mrp: number) => {
  await repo.updateProductMRP(id, mrp);
  return { message: "MRP updated successfully" };
};