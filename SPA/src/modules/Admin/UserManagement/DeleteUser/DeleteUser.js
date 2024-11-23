import React, { useState } from 'react';
import axios from 'axios';
import './DeleteUser.css'; // Import CSS file for styling


function DeleteUser({ user, authToken, onDeleteSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://localhost:5001/api/SystemUser/${user.id}/hard`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setLoading(false);
            if (response.status === 200) {
                onDeleteSuccess(user.id); // Notify parent to remove user from UI
            } else {
                setError('Failed to delete user.');
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.Message || 'An error occurred.');
        }
    };

    return (
        <div className="delete-user-overlay">
            <div className="delete-user-modal">
                <h2 className="delete-user-title">Delete User</h2>
                <p className="delete-user-message">
                    Are you sure you want to delete <strong>{user.username}</strong>?
                </p>
                {error && <p className="delete-user-error">{error}</p>}
                <div className="delete-user-actions">
                    <button
                        className="delete-user-btn delete-user-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button
                        className="delete-user-btn delete-user-cancel"
                        onClick={() => onDeleteSuccess(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;
