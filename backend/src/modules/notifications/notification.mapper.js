/**
 * notification.mapper.js
 * Sanitizes notification database documents before they are transmitted over public endpoints or sockets.
 */

/**
 * Maps a single notification document to a public-safe response format.
 * @param {object} notification - Database notification document
 * @returns {object|null} Public-safe notification payload
 */
export const toResponse = (notification) => {
  if (!notification) return null;

  return {
    id: notification._id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    isRead: notification.isRead || false,
    createdAt: notification.createdAt,
    data: notification.data || null
  };
};

/**
 * Maps an array of notification documents to a public-safe response format.
 * @param {Array<object>} notifications - Array of database notification documents
 * @returns {Array<object>} Sanitized notification payloads
 */
export const toResponseList = (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return [];
  return notifications.map(toResponse).filter(Boolean);
};

export default {
  toResponse,
  toResponseList
};
