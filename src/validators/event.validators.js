import prisma from '../config/db.js';
import domainEvents, { EVENTS } from '../events/emitter.js';

const userSummary = { select: { id: true, name: true, email: true } };

const scopeForViewer = (viewer) => {
  if (viewer.role === 'customer') return { customerId: viewer.id };
  if (viewer.role === 'agent') {
    return { OR: [{ assignedAgentId: viewer.id }, { assignedAgentId: null }] };
  }
  return {};
};

export const getAllEvents = async ({ status, sortBy, order, page, pageSize }, viewer) => {
  const where = { ...scopeForViewer(viewer), ...(status ? { status } : {}) };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { customer: userSummary, assignedAgent: userSummary },
    }),
    prisma.event.count({ where }),
  ]);

  return { events, total };
};

export const getEventById = async (id, viewer) =>
  prisma.event.findFirst({
    where: { id, ...scopeForViewer(viewer) },
    include: {
      customer: userSummary,
      assignedAgent: userSummary,
    },
  });

export const createEvent = async ({ subject, description, customerId }) => {
  const event = await prisma.event.create({
    data: { subject, description, customerId },
    include: {
      customer: userSummary,
    },
  });

  domainEvents.emit(EVENTS.EVENT_CREATED, event);

  return event;
};

export const updateEvent = async (id, changes, previous) => {
  const event = await prisma.event.update({
    where: { id },
    data: changes,
    include: { customer: userSummary, assignedAgent: userSummary },
  });

  if (event.assignedAgentId !== null && event.assignedAgentId !== previous.assignedAgentId) {
    domainEvents.emit(EVENTS.EVENT_ASSIGNED, event);
  }

  if (event.status !== previous.status) {
    domainEvents.emit(EVENTS.EVENT_STATUS_CHANGED, event, previous.status);
  }

  return event;
};

export const deleteEvent = async (id) => prisma.event.delete({ where: { id } });