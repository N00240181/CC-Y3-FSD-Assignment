// Aggregates one express.Router() per resource, same as the support desk
// case study. Mount your own resources here as you add them.
import express from 'express';
import welcomeRoutes from './welcome.routes.js';
/* import eventRoutes from './event.routes.js';
import venueRoutes from './venue.routes.js'; jest test on events doesn't work here for now */

const router = express.Router();

router.use('/', welcomeRoutes);

export default router;
