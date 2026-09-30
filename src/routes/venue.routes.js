import express from 'express';
import * as venueController from '../controllers/venue.controller.js';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import {
    createVenueSchema,
    updateVenueSchema,
    listVenuesQuerySchema,
    venueIdParamSchema,
} from '../validators/venue.validators.js';

const router = express.Router();

router.get('/', validate({ query: listVenuesQuerySchema }), venueController.getAllVenues);
router.post('/', authenticate, authorize('customer'), validate({ body: createVenueSchema }), venueController.createVenue);
router.get('/:id', validate({ params: venueIdParamSchema }), venueController.getVenueById);
router.patch('/:id', authenticate, authorize('agent', 'admin'), validate({ params: venueIdParamSchema, body: updateVenueSchema }), venueController.updateVenue);
router.delete('/:id', authenticate, authorize('agent', 'admin'), validate({ params: venueIdParamSchema }), venueController.deleteVenue);

export default router;