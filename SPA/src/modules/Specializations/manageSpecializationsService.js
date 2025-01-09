import axios from 'axios';
import { API_URL_NODE } from '../../config';

const API_URL = API_URL_NODE + ':4000/api/specializations';

// Fetch all specializations
export const fetchSpecializations = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data.data; // Ensure this matches your API response structure
    } catch (error) {
        console.error('Error fetching specializations:', error);
        throw error;
    }
};

// Fetch a specific specialization by name
export const fetchSpecializationByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name/${encodeURIComponent(name)}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching specialization by name:', error);
        throw error;
    }
};

// Add a new specialization
export const addSpecialization = async (newSpecialization) => {
    try {
        const response = await axios.post(API_URL, newSpecialization, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding specialization:', error);
        throw error;
    }
};

// Update an existing specialization by ID
export const updateSpecialization = async (_id, updatedSpecialization) => {
    try {
        const response = await axios.put(`${API_URL}/${_id}`, updatedSpecialization, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating specialization:', error);
        throw error;
    }
};

// Soft delete an specialization by domainId
export const deleteSpecialization = async (domainId) => {
    try {
        await axios.patch(`${API_URL}/${domainId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
    } catch (error) {
        console.error('Error soft deleting specialization:', error);
        throw error;
    }

};
