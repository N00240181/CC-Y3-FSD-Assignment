import { z } from 'zod';

export const venueIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createVenueSchema = z.object({
  name: z.coerce.string(),
  location: z.coerce.string(),
  capacity: z.coerce.number().int().positive(),
});

export const updateVenueSchema = z.object({
  name: z.coerce.string(),
  location: z.coerce.string(),
  capacity: z.coerce.number().int().positive(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field is required to update a venue',
});

export const listVenuesQuerySchema = z.object({
  sortBy: z.enum(['id', 'name', 'location', 'capacity']).optional().default('id'),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
});