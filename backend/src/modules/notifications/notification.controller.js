/**
 * notification.controller.js
 * Handles HTTP request/response flow for the notification module.
 */
import ApiResponse from '../../libs/apiResponse.js';
import notificationService from './notification.service.js';

class NotificationController {
  /**
   * Paginated, filtered notifications for the logged-in user.
   * GET /api/v1/notifications
   */
  async getNotifications(req, res) {
    const userId = req.user._id;
    const query = req.query;

    const result = await notificationService.getUserNotifications(userId, query);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          notifications: result.notifications,
          meta: result.meta
        },
        'Notifications retrieved successfully'
      )
    );
  }

  /**
   * Marks a specific notification as read.
   * PATCH /api/v1/notifications/:id/read
   */
  async markAsRead(req, res) {
    const userId = req.user._id;
    const notificationId = req.params.id;

    const updatedNotification = await notificationService.markAsRead(notificationId, userId);

    return res.status(200).json(
      new ApiResponse(200, updatedNotification, 'Notification marked as read successfully')
    );
  }

  /**
   * Marks multiple specified user notifications as read.
   * PATCH /api/v1/notifications/bulk-read
   */
  async markBulkAsRead(req, res) {
    const userId = req.user._id;
    const { ids } = req.body;

    const result = await notificationService.markBulkAsRead(userId, ids);

    return res.status(200).json(
      new ApiResponse(200, result, `${result.count} notifications marked as read successfully`)
    );
  }

  /**
   * Marks all user notifications as read.
   * PATCH /api/v1/notifications/mark-all-read
   */
  async markAllAsRead(req, res) {
    const userId = req.user._id;

    await notificationService.markAllAsRead(userId);

    return res.status(200).json(
      new ApiResponse(200, null, 'All notifications marked as read successfully')
    );
  }
}

export default new NotificationController();
