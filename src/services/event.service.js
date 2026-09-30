import prisma from '../config/db.js';
import domainEvents, { EVENTS } from '../events/emitter.js';

export const getAllEvents = async ({ sortBy, order, page, pageSize }) => {
  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where: {},
      orderBy: { [sortBy]: order },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { band: true, venue: true },
    }),
    prisma.event.count({ where: {} }),
  ]);

  return { events, total };
};

export const getEventById = async (id) =>
  prisma.event.findFirst({
    where: { id },
    include: { band: true, venue: true },
  });

export const createEvent = async ({ bandId, venueId, date }) => {
  const event = await prisma.event.create({
    data: { bandId, venueId, date },
    include: { band: true, venue: true },
  });

  domainEvents.emit(EVENTS.EVENT_CREATED, event);

  return event;
};

export const updateEvent = async (id, changes) =>
  prisma.event.update({
    where: { id },
    data: changes,
    include: { band: true, venue: true },
  });

export const deleteEvent = async (id) => prisma.event.delete({ where: { id } });