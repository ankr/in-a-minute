import { getConnection } from '../db';

const db = getConnection();

export interface CreateGuestPayload {
  name: string;
  phone: string;
}

export const fetchAllGuests = async () => {
  return await db.guests.findMany();
};

export const fetchAllGuestsForProperty = (propertyId: number) => {
  return db.guests.findMany({
    where: {
      Reservations: {
        some: {
          Property: {
            id: propertyId,
          },
        },
      },
    },
  });
};

export const storeGuest = ({ name, phone }: CreateGuestPayload) => {
  return db.guests.create({
    data: {
      name,
      phone,
    },
  });
};
