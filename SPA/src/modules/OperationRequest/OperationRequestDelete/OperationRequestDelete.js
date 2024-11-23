import React, { useState } from 'react';
import axios from 'axios';
import './OperationRequestDelete.css'; // Import CSS file for styling

function OperationRequestDelete({ operationRequest, authToken, onDeleteSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://localhost:5001/api/OperationRequest/${operationRequest.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setLoading(false);
            if (response.status === 200) {
                onDeleteSuccess(operationRequest.id); // Notify parent to remove operation request from UI
            } else {
                setError('Failed to delete operation request.');
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.Message || 'An error occurred.');
        }
    };

    return (
        <div className="delete-operation-request-overlay">
            <div className="delete-operation-request-modal">
                <h2 className="delete-operation-request-title">Delete Operation Request</h2>
                <p className="delete-operation-request-message">
                    Are you sure you want to delete the operation request for <strong>{operationRequest.patientID}</strong>?
                </p>
                {error && <p className="delete-operation-request-error">{error}</p>}
                <div className="delete-operation-request-actions">
                    <button
                        className="delete-operation-request-btn delete-operation-request-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button
                        className="delete-operation-request-btn delete-operation-request-cancel"
                        onClick={() => onDeleteSuccess(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OperationRequestDelete;