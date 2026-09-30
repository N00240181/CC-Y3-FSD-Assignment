import prisma from '../config/db.js';
import domainEvents from '../events/emitter.js';
import domainVenues, { VENUES } from '../events/emitter.js';

export const getAllVenues = async ({ sortBy, order, page, pageSize }) => {
  const [venues, total] = await Promise.all([
    prisma.venue.findMany({
      where: {},
      orderBy: { [sortBy]: order },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { name: true, location: true, capacity: true },
    }),
    prisma.venue.count({ where: {} }),
  ]);

  return { venues, total };
};

export const getVenueById = async (id) =>
  prisma.venue.findFirst({
    where: { id },
    include: { name: true, location: true, capacity: true },
  });

export const createVenue = async ({ name, location, capacity }) => {
  const venue = await prisma.venue.create({
    data: { name, location, capacity },
    include: { name: true, location: true, capacity: true },
  });

  domainEvents.emit(EVENTS.VENUE_CREATED, venue);

  return venue;
};

export const updateVenue = async (id, changes) =>
  prisma.venue.update({
    where: { id },
    data: changes,
    include: { name: true, location: true, capacity: true },
  });

export const deleteVenue = async (id) => prisma.venue.delete({ where: { id } });