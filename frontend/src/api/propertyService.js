import api from './api';

export const propertyService = {

  getAll: async () => {
    const response = await api.get('/properties');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
  create: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },
  update: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/properties/${id}`);
  },
  getMyProperties: async () => {
    const response = await api.get('/properties/my-properties');
    return response.data;
  }
};

export default api;
