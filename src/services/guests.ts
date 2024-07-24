import { getAll, create } from '../repositories/guests';

export interface SignupPayload {
  name: string;
  phone: string;
}

export const getAllGuests = async () => {
  return getAll();
};

export const signup = async (data: SignupPayload) => {
  return create(data);
};
