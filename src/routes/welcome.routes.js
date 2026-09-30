import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { getWelcome } from '../controllers/event.controller.js';
import eventRoutes from './event.routes.js';


const router = express.Router();

router.get('/', asyncHandler(getWelcome));
router.use('/events', eventRoutes);


export default router;
