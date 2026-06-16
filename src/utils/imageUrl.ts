import { Request } from "express";

/**
 * Constructs the base URL of the request dynamically, using the IMAGE_BASE_URL env var if available.
 */
export const getBaseUrl = (req: Request): string => {
  if (process.env.IMAGE_BASE_URL) {
    return process.env.IMAGE_BASE_URL;
  }
  const host = req.get("host") || "localhost:5000";
  let protocol = req.protocol || "http";
  
  if (req.headers["x-forwarded-proto"]) {
    protocol = Array.isArray(req.headers["x-forwarded-proto"])
      ? req.headers["x-forwarded-proto"][0]
      : req.headers["x-forwarded-proto"];
  } else if (!host.includes("localhost") && !host.includes("127.0.0.1") && !host.includes("192.168.")) {
    protocol = "https";
  }
  return `${protocol}://${host}`;
};

/**
 * Generates the complete image URL for a given product base_image
 */
export const getProductImageUrl = (baseImage: string | null | undefined, baseUrl: string): string | null => {
  if (baseImage === null || baseImage === undefined) {
    return null;
  }
  if (baseImage === "") {
    return "";
  }
  if (baseImage.startsWith("http://") || baseImage.startsWith("https://")) {
    return baseImage;
  }
  const cleanPath = baseImage.replace(/^\/?uploads\//, "");
  return `${baseUrl}/uploads/${cleanPath}`;
};

/**
 * Maps a product object to include image_url, image, and image_id fields.
 * Ensures backward compatibility by keeping existing image and image_id fields,
 * or defaulting them if not present.
 */
export const mapProductImageFields = (product: any, baseUrl: string): any => {
  if (!product) return product;

  // Retrieve base_image
  const baseImage = product.base_image;
  const imageUrl = getProductImageUrl(baseImage, baseUrl);

  // According to requirements:
  // - Retain the current image_id field in all API responses.
  // - The existing image field must remain unchanged and should not be removed or modified.
  // - If a product has no image, return null or an empty string for image_url.
  // To ensure backward compatibility, if image or image_id are not on the object,
  // we default them to baseImage or null/empty.
  const imageIdValue = product.image_id !== undefined ? product.image_id : (baseImage || null);
  const imageValue = product.image !== undefined ? product.image : (baseImage || null);

  return {
    ...product,
    image_id: imageIdValue,
    image: imageValue,
    image_url: imageUrl,
  };
};

/**
 * Maps a generic entity object to include image_url while retaining the existing image / image_path field.
 */
export const mapEntityImageFields = (entity: any, baseUrl: string, fieldName: string = "image"): any => {
  if (!entity) return entity;

  const baseImage = entity[fieldName] !== undefined ? entity[fieldName] : (entity.image || entity.image_path || entity.base_image);
  const imageUrl = getProductImageUrl(baseImage, baseUrl);

  return {
    ...entity,
    image_url: imageUrl,
  };
};
