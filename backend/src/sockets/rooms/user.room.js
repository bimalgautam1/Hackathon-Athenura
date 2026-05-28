/**
  user.room.js
  Defines how individual user-specific rooms are named and joined.
 */

export default (io, socket) => {
  if (socket.user && socket.user._id) {
    const userRoom = `user:${socket.user._id}`;
    socket.join(userRoom);
    console.log(`[Socket Room] Secure client ${socket.id} auto-joined private user room: ${userRoom}`);
  }
};
