import { Guests, Properties } from '@prisma/client';
import { storeMessage } from '../src/repositories/messages';
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

  return (owner: Guests) => {
    const property: CreatePropertyPayload = {
      name: `Property (${c++})`,
      ownerId: owner.id,
    };

    return storeProperty(property);
  };
})();

/**
 * Create a reservation for a guest and a property.
 */
export const createReservation = (guest: Guests, property: Properties) => {
  const reservation: CreateReservationPayload = {
    guestId: guest.id,
    propertyId: property.id,
    checkIn: new Date('2021-01-01'),
    checkOut: new Date('2021-01-05'),
  };

  return storeReservation(reservation);
};

/**
 * Create a message for a guest and a property.
 */
export const createMessage = (
  guest: Guests,
  property: Properties,
  message: string
) => {
  return storeMessage({ guest, property, message });
};
