import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import './DeletePatientProfile.css';

function DeletePatientProfile({ Patient, authToken, onDeleteSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!Patient || !Patient.id) {
            console.error('Invalid Patient object:', Patient);
            setError('Invalid Patient data.');
            return;
        }

        setLoading(true);
        console.log('Patient object received for deletion:', Patient);

        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/Patient/delete/${Patient.id}`,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);

            if (response.status === 200) {
                onDeleteSuccess(Patient.id);
            } else {
                setError('Failed to delete the profile.');
            }
        } catch (err) {
            console.error('Error during delete request:', err);
            setLoading(false);
            setError('An error occurred while deleting the profile.');
        }
    };

    return (
        <div className="delete-Patient-overlay">
            <div className="delete-Patient-modal">
                <h2 className="delete-Patient-title">Delete Patient</h2>
                <p>Are you sure you want to delete the profile of {Patient?.firstName}?</p>
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
                        className="delete-Patient-btn delete-Patient-cancel"
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