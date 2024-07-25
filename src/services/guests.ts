import {
  CreateGuestPayload,
  fetchAllGuests,
  storeGuest,
} from '../repositories/guests';

export const getAllGuests = async () => {
  return fetchAllGuests();
};

export const signupGuest = (data: CreateGuestPayload) => {
  return storeGuest(data);
};
