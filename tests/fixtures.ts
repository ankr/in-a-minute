import { CreateGuestPayload, storeGuest } from '../src/repositories/guests';
import {
  CreatePropertyPayload,
  storeProperty,
} from '../src/repositories/properties';
import {
  CreateReservationPayload,
  storeReservation,
} from '../src/repositories/reservations';

/**
 * Create a guest with a random name and phone number.
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

/**
 * Create a property with a random name.
 */
export const createProperty = (() => {
  let c = 0;

  return (ownerId: number) => {
    const property: CreatePropertyPayload = {
      name: `Property (${c++})`,
      ownerId,
    };

    return storeProperty(property);
  };
})();

/**
 * Create a reservation for a guest and a property.
 */
export const createReservation = (guestId: number, propertyId: number) => {
  const reservation: CreateReservationPayload = {
    guestId,
    propertyId,
    checkIn: new Date('2021-01-01'),
    checkOut: new Date('2021-01-05'),
  };

  return storeReservation(reservation);
};
