import api from './api';

export const userService = {
  getProfile: () => api.get('/users/me'),
  getMyResults: () => api.get('/users/me/results'),
  getDashboardStats: () => api.get('/users/me/dashboard'),
  getUserActivity: (limit) => api.get(`/users/me/activity${limit ? `?limit=${limit}` : ''}`),
  updateProfile: (data) => api.patch('/users/me', data),
  getActiveHackathons: (limit) => api.get(`/users/me/active-hackathons${limit ? `?limit=${limit}` : ''}`),
  getUserCertificates: (limit) => api.get(`/users/me/certificates${limit ? `?limit=${limit}` : ''}`),
};
