/**
  reviewQueue.routes.js
  Routes for managing the Admin Review Queue.
 */
import { Router } from 'express';
import asyncHandler from '../../../libs/asyncHandler.js';
import { verifyJWT, verifyAdmin } from '../../../middleware/auth.middleware.js';
import reviewQueueController from './reviewQueue.controller.js';

const router = Router();

// GET /admin/review-queue
router.get('/', verifyJWT, verifyAdmin, asyncHandler(reviewQueueController.listQueueItems));

// POST /admin/review-queue/:queueId/resolve
router.post('/:queueId/resolve', verifyJWT, verifyAdmin, asyncHandler(reviewQueueController.resolveItem));

export default router;
