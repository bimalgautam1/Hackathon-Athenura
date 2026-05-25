/**
 * index.js
 * Main Socket.IO entry point.
 * Performs JWT authorization during connection handshakes and registers modular domain handlers.
 */
import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.js';
// Placeholder handlers are not imported yet because they don't have default exports.
// Once implemented, they can be imported and registered here.
import registerNotificationHandler from './handlers/notification.handler.js';
import registerHackathonRoom from './rooms/hackathon.room.js';
import registerUserRoom from './rooms/user.room.js';

/**
 * Registers all socket event listeners on the provided io instance.
 * Called once from server.js during application startup.
 * @param {import('socket.io').Server} io
 */
export const initSockets = (io) => {
  if (!io) {
    console.error('[Socket] No io instance passed to initSockets — aborting');
    return;
  }

  // ── Connection Authentication Handshake Middleware ─────────────────
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
      if (!token) {
        return next(new Error('Authentication error: Token required'));
      }

      const decoded = jwt.verify(token, envConfig.accessTokenSecret);
      socket.user = decoded; // Bind verified token context to socket state
      next();
    } catch (err) {
      console.error(`[Socket Auth Failure] Client connection rejected: ${err.message}`);
      return next(new Error('Authentication error: Invalid access token'));
    }
  });

  // ── Connection Listener ────────────────────────────────────────────
  io.on('connection', (socket) => {
    console.log(`[Socket] Secure connection established: ${socket.id} (User ID: ${socket.user._id}, Role: ${socket.user.role})`);

    // Register modular room setups
    registerUserRoom(io, socket);
    registerHackathonRoom(io, socket);
    // registerJudgeRoom(io, socket); // Unused currently

    // Register Modular Subsystem Handlers
    registerNotificationHandler(io, socket);
    // registerLeaderboardHandler(io, socket);
    // registerResultsHandler(io, socket);
    // registerTeamHandler(io, socket);

    // Detailed Disconnect Cleanup and Memory Diagnostics Logging
    socket.on('disconnect', (reason) => {
      console.log(`[Socket] Client disconnected: ${socket.id} — reason: ${reason} — User ID: ${socket.user._id}`);
      // Socket.IO automatically purges socket room memberships on disconnect
    });
  });

  console.log('[Socket] Initialised');
};
