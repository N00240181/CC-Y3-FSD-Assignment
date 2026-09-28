import express from 'express';
import * as eventController from '../controllers/event.controller.js';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import {
    createEventSchema,
    updateEventSchema,
    listEventsQuerySchema,
    eventIdParamSchema,
} from '../validators/event.validators.js';

const router = express.Router();

router.use(authenticate);

router.get('/', validate({ query: listEventsQuerySchema }), eventController.getAllEvents);
router.post('/', authorize('customer'), validate({ body: createEventSchema }), eventController.createEvent);
router.get('/:id', validate({ params: eventIdParamSchema }), eventController.getEventById);
router.patch('/:id', authorize('agent', 'admin'), validate({ params: eventIdParamSchema, body: updateEventSchema }), eventController.updateEvent);
router.delete('/:id', authorize('agent', 'admin'), validate({ params: eventIdParamSchema }), eventController.deleteEvent);

export default router;