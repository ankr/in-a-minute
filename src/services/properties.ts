import { fetchAllProperties } from '../repositories/properties';
import { fetchAllGuestsForProperty } from '../repositories/guests';

export const getAllProperties = async () => {
  return fetchAllProperties();
};

export const getGuestsForProperty = async (propertyId: number) => {
  const guests = await fetchAllGuestsForProperty(propertyId);

  return guests;
};
