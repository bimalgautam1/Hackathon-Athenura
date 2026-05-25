/**
 * notification.socket.js
 * Pushes real-time notification events to the correct Socket.IO rooms.
 */
import { getIO } from '../../config/socket.js';
import { SOCKET_EVENTS } from '../../sockets/events.js';

/**
 * Emits a real-time notification event to the targeted user.
 * @param {string} userId - ID of the recipient user
 * @param {object} notification - Sanitized notification mapper output
 */
export const emitNotification = (userId, notification) => {
  try {
    const io = getIO();
    const room = `user:${userId}`;
    
    io.to(room).emit(SOCKET_EVENTS.SERVER.NOTIFICATION_RECEIVED, notification);
    console.log(`[Socket] Emitted secure notification to room: ${room} — Event: ${SOCKET_EVENTS.SERVER.NOTIFICATION_RECEIVED}`);
  } catch (err) {
    console.error('Socket emitNotification error:', err.message);
  }
};

export default {
  emitNotification
};
