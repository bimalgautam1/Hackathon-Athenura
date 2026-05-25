/**
 * notification.repository.js
 * Encapsulates MongoDB read/write operations for the notification model, maintaining service isolation.
 */
import Notification from './notification.model.js';

class NotificationRepository {
  /**
   * Creates a new notification document.
   * @param {object} data - Notification creation payload
   * @returns {Promise<object>} Created notification document
   */
  async create(data) {
    return await Notification.create(data);
  }

  /**
   * Fetches paginated notification records for a user, sorted chronologically.
   * @param {string} userId - Target recipient user ID
   * @param {object} [options={}] - Query options (limit, skip, isRead)
   * @returns {Promise<Array<object>>} Notification documents
   */
  async findByUserId(userId, options = {}) {
    const { isRead, limit = 20, skip = 0 } = options;
    const query = { recipient: userId };

    if (isRead !== undefined) {
      query.isRead = isRead;
    }

    return await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  /**
   * Counts notifications matching specified criteria.
   * @param {string} userId - Recipient user ID
   * @param {object} [options={}] - Filter criteria (isRead)
   * @returns {Promise<number>} Number of matching documents
   */
  async countByUserId(userId, options = {}) {
    const { isRead } = options;
    const query = { recipient: userId };

    if (isRead !== undefined) {
      query.isRead = isRead;
    }

    return await Notification.countDocuments(query);
  }

  /**
   * Fetches a notification by its ID.
   * @param {string} id - Notification document ID
   * @returns {Promise<object|null>} Notification document or null
   */
  async findById(id) {
    return await Notification.findById(id);
  }

  /**
   * Updates isRead status on a specific notification document.
   * @param {string} id - Notification ID
   * @param {boolean} isRead - Read state to set
   * @returns {Promise<object|null>} Updated notification document
   */
  async updateReadStatus(id, isRead) {
    return await Notification.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );
  }

  /**
   * Updates read state on all notifications for a given user.
   * @param {string} userId - Target user ID
   * @param {boolean} isRead - Read state to apply
   * @returns {Promise<object>} Write execution details
   */
  async updateManyReadStatus(userId, isRead) {
    return await Notification.updateMany(
      { recipient: userId, isRead: !isRead },
      { isRead }
    );
  }

  /**
   * Bulk marks a specified list of user notifications as read.
   * @param {string} userId - User ID verifying ownership
   * @param {Array<string>} ids - Array of notification IDs to update
   * @param {boolean} isRead - Read state to apply
   * @returns {Promise<object>} Write execution details
   */
  async updateBulkReadStatus(userId, ids, isRead) {
    return await Notification.updateMany(
      {
        recipient: userId,
        _id: { $in: ids },
        isRead: !isRead
      },
      { isRead }
    );
  }
}

export default new NotificationRepository();
