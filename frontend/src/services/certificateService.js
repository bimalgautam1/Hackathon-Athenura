import api from './api';

export const certificateService = {
  getMyCertificates: (page, limit) => api.get(`/certificates/me?page=${page || 1}&limit=${limit || 20}`),
  downloadCertificate: (certificateId) => api.get(`/certificates/${certificateId}/download`),
};