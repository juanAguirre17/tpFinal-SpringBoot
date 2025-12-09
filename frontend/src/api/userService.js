import api from './api';

export const userService = {
    getMe: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },
    updateProfile: async (userData) => {
        const response = await api.put('/users/profile', userData);
        return response.data;
    }
};
