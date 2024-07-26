import { fetchAllProperties } from '../repositories/properties';
import { fetchAllGuestsForProperty } from '../repositories/guests';

export const getAllProperties = async () => {
  return fetchAllProperties();
};
