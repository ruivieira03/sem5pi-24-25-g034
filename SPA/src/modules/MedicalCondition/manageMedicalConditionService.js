import axios from 'axios';

 const API_URL = 'http://localhost:4000/api/medicalConditions';
//const API_URL = 'http://10.9.22.94:4000/api/medicalConditions';

// Fetch all medical conditions
export const fetchMedicalConditions = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data.data; // Ensure this matches your API response structure
    } catch (error) {
        console.error('Error fetching medical conditions:', error);
        throw error;
    }
};

// Fetch a specific medical condition by name
export const fetchMedicalConditionByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name/${encodeURIComponent(name)}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching medical condition by name:', error);
        throw error;
    }
};

// Add a new medical condition
export const addMedicalCondition = async (newMedicalCondition) => {
    try {
        const response = await axios.post(API_URL, newMedicalCondition, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding medical condition:', error);
        throw error;
    }
};

// Update an existing medical condition by ID
export const updateMedicalCondition = async (_id, updatedMedicalCondition) => {
    try {
        const response = await axios.put(`${API_URL}/${_id}`, updatedMedicalCondition, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating medical condition:', error);
        throw error;
    }
};

// Soft delete a medical condition by domainId
export const deleteMedicalCondition = async (domainId) => {
    try {
        await axios.patch(`${API_URL}/${domainId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
    } catch (error) {
        console.error('Error soft deleting medical condition:', error);
        throw error;
    }
};
