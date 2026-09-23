import express from 'express';
import * as bookingController from '../controllers/booking.controller.js';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import {
    createBookingSchema,
    updateBookingSchema,
    listBookingsQuerySchema,
    bookingIdParamSchema,
} from '../validators/booking.validators.js';

const router = express.Router();

router.use(authenticate);

router.get('/', validate({ query: listBookingsQuerySchema }), bookingController.getAllBookings);
router.post('/', authorize('customer'), validate({ body: createBookingSchema }), bookingController.createBooking);
router.get('/:id', validate({ params: bookingIdParamSchema }), bookingController.getBookingById);
router.patch('/:id', authorize('agent', 'admin'), validate({ params: bookingIdParamSchema, body: updateBookingSchema }), bookingController.updateBooking);
router.delete('/:id', authorize('agent', 'admin'), validate({ params: bookingIdParamSchema }), bookingController.deleteBooking);

export default router;