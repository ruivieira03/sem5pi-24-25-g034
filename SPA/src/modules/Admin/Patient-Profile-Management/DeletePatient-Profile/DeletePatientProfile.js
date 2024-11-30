import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import './DeletePatientProfile.css'; // Import CSS file for styling

function DeletePatientProfile({ Patient, authToken, onDeleteSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/Patient/${Patient.id}/`, // Use API_BASE_URL here
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setLoading(false);
            if (response.status === 200) {
                onDeleteSuccess(Patient.id); // Notify parent to remove Patient Profile from UI
            } else {
                setError('Failed to delete Profile.');
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.Message || 'An error occurred.');
        }
    };

    return (
        <div className="delete-Patient-overlay">
            <div className="delete-Patient-modal">
                <h2 className="delete-Patient-title">Delete User</h2>
                <p className="delete-Patient-message">
                    Are you sure you want to delete <strong>{Patient.username}</strong>?
                </p>
                {error && <p className="delete-Patient-error">{error}</p>}
                <div className="delete-Patient-actions">
                    <button
                        className="delete-Patient-btn delete-Patient-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button
                        className="delete-Patient-btn delete-Patient Profile-cancel"
                        onClick={() => onDeleteSuccess(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePatientProfile;
