/**
 * notification.handler.js
 * Modular socket handler registering subscribers and actions for the notifications scope.
 */

export default (io, socket) => {
  // Currently, no client-to-server notification events are defined in events.js.
  // The private user room joining logic has been moved to rooms/user.room.js.
  // Use this file to add listeners for things like "mark-notification-read" in the future.
};
