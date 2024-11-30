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
                `${API_BASE_URL}/api/Patient/delete/${Patient.id}`, // Use optional chaining
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setLoading(false);
            if (response.status === 200) {
                onDeleteSuccess(Patient?.id); // Use optional chaining para evitar erros
            } else {
                setError('Failed to delete the profile.');
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred while deleting the profile.');
        }
    };

    return (
        <div className="delete-Patient-overlay">
            <div className="delete-Patient-modal">
                <h2 className="delete-Patient-title">Delete Patient</h2>
                <p className="delete-Patient-message">
                    Are you sure you want to delete{' '}
                    <strong>{Patient?.MedicalRecordNumber || 'Unknown Patient'}</strong>?
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
