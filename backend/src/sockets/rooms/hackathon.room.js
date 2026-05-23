/**
  hackathon.room.js
  Defines hackathon-scoped rooms for broadcasts tied to one event.
 */
import { SOCKET_EVENTS } from '../events.js';
import reviewQueueService from '../../modules/admin/results/reviewQueue.service.js';

export default (io, socket) => {
  // Join Hackathon Room
  socket.on(SOCKET_EVENTS.CLIENT.JOIN_HACKATHON, async (hackathonId) => {
    const room = `hackathon:${hackathonId}`;
    socket.join(room);
    console.log(`[Socket Room] Socket ${socket.id} joined room ${room}`);
    
    // Optionally emit initial progress on join
    try {
      const progress = await reviewQueueService.getProgress(hackathonId);
      socket.emit(SOCKET_EVENTS.SERVER.PROGRESS_UPDATE, progress);
    } catch (err) {
      console.error(`[Socket Room] Failed to fetch initial progress on join: ${err.message}`);
    }
  });

  // Leave Hackathon Room
  socket.on(SOCKET_EVENTS.CLIENT.LEAVE_HACKATHON, (hackathonId) => {
    const room = `hackathon:${hackathonId}`;
    socket.leave(room);
    console.log(`[Socket Room] Socket ${socket.id} left room ${room}`);
  });

  // Request Progress explicitly
  socket.on(SOCKET_EVENTS.CLIENT.REQUEST_PROGRESS, async (hackathonId) => {
    try {
      const progress = await reviewQueueService.getProgress(hackathonId);
      socket.emit(SOCKET_EVENTS.SERVER.PROGRESS_UPDATE, progress);
    } catch (err) {
      console.error(`[Socket Room] Failed to fetch requested progress: ${err.message}`);
      socket.emit(SOCKET_EVENTS.SERVER.ERROR, { message: 'Failed to fetch hackathon progress.' });
    }
  });
};
