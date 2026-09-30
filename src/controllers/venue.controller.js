import * as venueService from '../services/venue.service.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendResource, sendCollection } from '../utils/response.js';

export const getAllVenues = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;
  const { venues, total } = await venueService.getAllVenues(req.query, req.user);

  sendCollection(res, venues, {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
});

export const getVenueById = asyncHandler(async (req, res) => {
  const venue = await venueService.getVenueById(req.params.id, req.user);

  if (!venue) {
    throw new ApiError(404, `Venue ${req.params.id} not found`);
  }

  sendResource(res, venue);
});

export const createVenue = asyncHandler(async (req, res) => {
  const venue = await venueService.createVenue({ ...req.body, customerId: req.user.id });
  sendResource(res, venue, 201);
});

export const updateVenue = asyncHandler(async (req, res) => {
  const existing = await venueService.getVenueById(req.params.id, req.user);

  if (!existing) {
    throw new ApiError(404, `Venue ${req.params.id} not found`);
  }

  const venue = await venueService.updateVenue(req.params.id, req.body, existing);
  sendResource(res, venue);
});

export const deleteVenue = asyncHandler(async (req, res) => {
  const existing = await venueService.getVenueById(req.params.id, req.user);

  if (!existing) {
    throw new ApiError(404, `Venue ${req.params.id} not found`);
  }

  await venueService.deleteVenue(req.params.id);
  res.status(204).end();
});

export const getWelcome = async (req, res) => {
  sendResource(res, { message: 'Hello world!' });
};