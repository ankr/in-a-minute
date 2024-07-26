import {
  CreateGuestPayload,
  fetchAllGuests,
  fetchGuest,
  fetchAllGuestsForProperty,
  storeGuest,
} from '../repositories/guests';

export const getAllGuests = async () => {
  return fetchAllGuests();
};

export const getGuest = (guestId: number) => {
  return fetchGuest(guestId);
};

export const createGuest = (data: CreateGuestPayload) => {
  return storeGuest(data);
};

export const getAllGuestsForProperty = (propertyId: number) => {
  return fetchAllGuestsForProperty(propertyId);
};
