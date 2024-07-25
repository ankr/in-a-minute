import { CreateGuestPayload, storeGuest } from '../src/repositories/guests';

/**
 * Create a guest with a random name and phone number, and store it in database.
 */
export const createGuest = (() => {
  let c = 0;

  return () => {
    const user: CreateGuestPayload = {
      name: `Guest (${c++})`,
      phone: `${(Math.random() * 1e9) | 0}`.match(/.{1,3}/g)!.join(' '),
    };

    return storeGuest(user);
  };
})();
