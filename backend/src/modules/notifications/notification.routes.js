/**
 * notification.routes.js
 * Maps HTTP routes for the notification module to the controller actions.
 */
import { Router } from 'express';
import notificationController from './notification.controller.js';
import { verifyJWT } from '../../middleware/auth.middleware.js';
import asyncHandler from '../../libs/asyncHandler.js';
import { validate, markBulkReadValidation } from './notification.validation.js';

const router = Router();

// Apply global JWT validation guard across all notification endpoints
router.use(verifyJWT);

// GET /api/v1/notifications — List notifications
router.get('/', asyncHandler(notificationController.getNotifications));

// PATCH /api/v1/notifications/bulk-read — Bulk mark specific notifications as read
router.patch(
  '/bulk-read',
  validate(markBulkReadValidation),
  asyncHandler(notificationController.markBulkAsRead)
);

// PATCH /api/v1/notifications/mark-all-read — Mark all notifications as read
router.patch('/mark-all-read', asyncHandler(notificationController.markAllAsRead));

// PATCH /api/v1/notifications/:id/read — Mark individual notification as read
router.patch('/:id/read', asyncHandler(notificationController.markAsRead));

export default router;
