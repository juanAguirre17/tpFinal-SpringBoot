import api from './api';

export const leadService = {

    create: async (leadData) => {
        // leadData: { name, email, phone, message, propertyId }
        const response = await api.post('/leads', leadData);
        return response.data;
    },

    getByProperty: async (propertyId) => {
        const response = await api.get(`/leads/property/${propertyId}`);
        return response.data;
    },

    getMyLeads: async () => {
        const response = await api.get('/leads/my-leads');
        return response.data;
    },

    listAll: async () => {
        const response = await api.get('/leads');
        return response.data;
    }
};


