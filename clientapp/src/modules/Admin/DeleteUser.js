import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="delete-user-modal">
            <p>Are you sure you want to delete {user.username}?</p>
            {error && <p className="error">{error}</p>}
            <button onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <button onClick={() => onDeleteSuccess(null)}>Cancel</button>
        </div>
    );
}

export default DeleteUser;
