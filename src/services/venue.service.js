import prisma from '../config/db.js';
import domainEvents, { EVENTS } from '../events/emitter.js';

export const getAllVenues = async ({ sortBy = 'id', order = 'asc', page = 1, pageSize = 20 }) => {
  const [venues, total] = await Promise.all([
    prisma.venue.findMany({
      where: {},
      orderBy: { [sortBy]: order },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.venue.count({ where: {} }),
  ]);

  return { venues, total };
};

export const getVenueById = async (id) =>
  prisma.venue.findFirst({
    where: { id },
  });

export const createVenue = async ({ name, location, capacity }) => {
  const venue = await prisma.venue.create({
    data: { name, location, capacity },
  });

  domainEvents.emit(EVENTS.VENUE_CREATED, venue);

  return venue;
};

export const updateVenue = async (id, changes) =>
  prisma.venue.update({
    where: { id },
    data: changes,
  });

export const deleteVenue = async (id) => prisma.venue.delete({ where: { id } });