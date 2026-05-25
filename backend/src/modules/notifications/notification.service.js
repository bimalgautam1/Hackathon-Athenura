/**
 * notification.service.js
 * Implements core business logic rules and notification dispatch handlers.
 */
import notificationRepository from './notification.repository.js';
import { emitNotification } from './notification.socket.js';
import notificationMapper from './notification.mapper.js';
import ApiError from '../../libs/apiError.js';

class NotificationService {
  /**
   * Dispatches a notification to the database, schedules its background email sending,
   * and pushes a secure real-time WebSocket event to the active user session.
   * 
   * @param {string} recipientId - MongoDB User ID of target user
   * @param {object} payload - Notification data details
   * @param {string} payload.title - Display title
   * @param {string} payload.message - Body content
   * @param {string} payload.type - Event type enum
   * @param {object} [payload.data=null] - Dynamic deep-link context payload
   * @param {object} [payload.emailOptions] - Dynamic email properties
   * @param {boolean} [payload.emailOptions.sendEmail=false] - Flag to enqueue background email
   * @param {string} [payload.emailOptions.to] - Recipient email target
   * @param {string} [payload.emailOptions.type] - Template enum key
   * @param {object} [payload.emailOptions.payload] - Variables matching SMTP template
   * @returns {Promise<object>} Public-safe mapped notification representation
   */
  async notify(recipientId, { title, message, type, data = null, emailOptions = {} }) {
    if (!recipientId) {
      throw new ApiError(400, 'Recipient ID is required to dispatch notification');
    }

    const newNotificationData = {
      recipient: recipientId,
      title,
      message,
      type,
      data
    };

    // Configure background email processor if requested
    if (emailOptions && emailOptions.sendEmail) {
      if (!emailOptions.to || !emailOptions.type) {
        console.warn(`[NotificationService] Skipping email dispatch for ${recipientId}: recipient email or template type missing`);
      } else {
        newNotificationData.emailStatus = 'pending';
        newNotificationData.emailData = {
          to: emailOptions.to,
          type: emailOptions.type,
          payload: emailOptions.payload || {}
        };
      }
    }

    // Save notification in database
    const notificationDoc = await notificationRepository.create(newNotificationData);

    // Sanitize database record for frontend transmission
    const sanitizedResponse = notificationMapper.toResponse(notificationDoc);

    // Securely push the notification to the online user session
    emitNotification(recipientId, sanitizedResponse);

    return sanitizedResponse;
  }

  /**
   * Fetches paginated and filtered notifications for a given user.
   * @param {string} userId - Recipient User ID
   * @param {object} [query={}] - URL Query criteria (page, limit, isRead)
   * @returns {Promise<object>} Paginated notifications with meta
   */
  async getUserNotifications(userId, query = {}) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    let isRead;
    if (query.isRead === 'true') isRead = true;
    if (query.isRead === 'false') isRead = false;

    const [docs, totalCount, unreadCount] = await Promise.all([
      notificationRepository.findByUserId(userId, { isRead, limit, skip }),
      notificationRepository.countByUserId(userId, { isRead }),
      notificationRepository.countByUserId(userId, { isRead: false })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      notifications: notificationMapper.toResponseList(docs),
      meta: {
        totalCount,
        unreadCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  /**
   * Marks a specific notification as read, checking recipient ownership.
   * @param {string} notificationId - Target notification ID
   * @param {string} userId - Request user ID
   * @returns {Promise<object>} Sanitized updated notification record
   */
  async markAsRead(notificationId, userId) {
    const notification = await notificationRepository.findById(notificationId);
    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    if (notification.recipient.toString() !== userId.toString()) {
      throw new ApiError(403, 'Unauthorized to access this notification');
    }

    const updatedDoc = await notificationRepository.updateReadStatus(notificationId, true);
    return notificationMapper.toResponse(updatedDoc);
  }

  /**
   * Bulk updates a specified list of user notifications to read.
   * @param {string} userId - Target User ID
   * @param {Array<string>} ids - Array of target notification IDs
   * @returns {Promise<object>} Status report details
   */
  async markBulkAsRead(userId, ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new ApiError(400, 'Array of notification IDs is required for bulk update');
    }

    await notificationRepository.updateBulkReadStatus(userId, ids, true);
    return { success: true, count: ids.length };
  }

  /**
   * Marks all notifications for a user as read.
   * @param {string} userId - User ID
   * @returns {Promise<object>} Status details
   */
  async markAllAsRead(userId) {
    await notificationRepository.updateManyReadStatus(userId, true);
    return { success: true };
  }
}

export default new NotificationService();
