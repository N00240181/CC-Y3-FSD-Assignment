import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { getWelcome } from '../controllers/booking.controller.js';
import bookingRoutes from './booking.routes.js';

const router = express.Router();

router.get('/', asyncHandler(getWelcome));
router.use('/bookings', bookingRoutes )

export default router;
