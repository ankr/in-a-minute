import { fetchAllProperties, fetchProperty } from '../repositories/properties';

export const getAllProperties = async () => {
  return fetchAllProperties();
};

export const getProperty = async (propertyId: number) => {
  return fetchProperty(propertyId);
};
