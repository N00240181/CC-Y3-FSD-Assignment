import { z } from 'zod';

export const eventIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createEventSchema = z.object({
  bandId: z.coerce.number().int().positive(),
  venueId: z.coerce.number().int().positive(),
  date: z.coerce.date(),
});

export const updateEventSchema = z.object({
  bandId: z.coerce.number().int().positive().optional(),
  venueId: z.coerce.number().int().positive().optional(),
  date: z.coerce.date().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field is required to update an event',
});

export const listEventsQuerySchema = z.object({
  sortBy: z.enum(['id', 'date', 'bandId', 'venueId']).optional().default('id'),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
});