import businessPool from "../../config/businessDb";

export const getAllBusinesses = async () => {
  const [rows] = await businessPool.query(
    `SELECT id, name, created_at
     FROM businesses
     WHERE is_active = 1`
  );

  return rows;
};

export const getBusinessById = async (id: number) => {
  const [rows]: any = await businessPool.query(
    `SELECT id, name, created_at
     FROM businesses
     WHERE id = ?
       AND is_active = 1`,
    [id]
  );

  return rows[0] || null;
};