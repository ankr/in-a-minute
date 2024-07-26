import {
  CreateGuestPayload,
  fetchAllGuests,
  fetchAllGuestsForProperty,
  storeGuest,
} from '../repositories/guests';

export const getAllGuests = async () => {
  return fetchAllGuests();
};

export const signupGuest = (data: CreateGuestPayload) => {
  return storeGuest(data);
};

export const getAllGuestsForProperty = async (propertyId: number) => {
  return fetchAllGuestsForProperty(propertyId);
};
