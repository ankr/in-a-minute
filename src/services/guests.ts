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

export const getAllMessagesForGuest = async (guestId: number) => {
  return fetchAllMessagesForGuest(guestId);
};
