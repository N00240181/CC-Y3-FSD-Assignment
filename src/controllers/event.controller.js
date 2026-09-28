import * as eventService from '../services/event.service.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendResource, sendCollection } from '../utils/response.js';

export const getAllEvents = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;
  const { events, total } = await eventService.getAllEvents(req.query, req.user);

  sendCollection(res, events, {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id, req.user);

  if (!event) {
    throw new ApiError(404, `Event ${req.params.id} not found`);
  }

  sendResource(res, event);
});

export const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.createEvent({ ...req.body, customerId: req.user.id });
  sendResource(res, event, 201);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const existing = await eventService.getEventById(req.params.id, req.user);

  if (!existing) {
    throw new ApiError(404, `Event ${req.params.id} not found`);
  }

  const event = await eventService.updateEvent(req.params.id, req.body, existing);
  sendResource(res, event);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const existing = await eventService.getEventById(req.params.id, req.user);

  if (!existing) {
    throw new ApiError(404, `Event ${req.params.id} not found`);
  }

  await eventService.deleteEvent(req.params.id);
  res.status(204).end();
});

export const getWelcome = async (req, res) => {
  sendResource(res, { message: 'Hello world!' });
};