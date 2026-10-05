// Aggregates one express.Router() per resource, same as the support desk
// case study. Mount your own resources here as you add them.
import express from 'express';
import authRoutes from './auth.routes.js';
import welcomeRoutes from './welcome.routes.js';
import venueRoutes from './venue.routes.js';
import eventRoutes from './event.routes.js';

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);
router.use('/', welcomeRoutes);

export default router;
