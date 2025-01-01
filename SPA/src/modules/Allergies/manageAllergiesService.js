import axios from 'axios';

const API_URL = 'http://localhost:4000/api/allergies';

// Fetch all allergies
export const fetchAllergies = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data.data; // Ensure this matches your API response structure
    } catch (error) {
        console.error('Error fetching allergies:', error);
        throw error;
    }
};

// Fetch a specific allergy by name
export const fetchAllergyByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name/${encodeURIComponent(name)}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching allergy by name:', error);
        throw error;
    }
};

// Add a new allergy
export const addAllergy = async (newAllergy) => {
    try {
        const response = await axios.post(API_URL, newAllergy, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding allergy:', error);
        throw error;
    }
};

// Update an existing allergy by ID
export const updateAllergy = async (_id, updatedAllergy) => {
    try {
        const response = await axios.put(`${API_URL}/${_id}`, updatedAllergy, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating allergy:', error);
        throw error;
    }
};

// Soft delete an allergy by domainId
export const deleteAllergy = async (domainId) => {
    try {
        await axios.patch(`${API_URL}/${domainId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
    } catch (error) {
        console.error('Error soft deleting allergy:', error);
        throw error;
    }

};
