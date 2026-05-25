import api from './api';

export const notificationService = {
  getNotifications: (unreadOnly) => api.get(`/notifications${unreadOnly ? '?unread=true' : ''}`),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
};