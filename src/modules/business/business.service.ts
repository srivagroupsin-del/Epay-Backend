import * as repo from "./business.repository";

export const getAllBusinesses = async () => {
  const data = await repo.getAllBusinesses();

  return {
    count: (data as any[]).length,
    data,
  };
};

export const getBusinessById = async (id: number) => {
  const business = await repo.getBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  return business;
};