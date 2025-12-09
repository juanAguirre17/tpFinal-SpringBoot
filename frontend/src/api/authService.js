import api from './api';


export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/authenticate', { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    getToken: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.token : null;
    }
};
