import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './UpdateUser.css';

const UpdateUser = ({ user, authToken, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_BASE_URL}/api/SystemUser/${user.id}`, // Use API_BASE_URL here
                formData,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);
            onUpdateSuccess(response.data); // Notify parent of successful update
        } catch (err) {
            setLoading(false);
            setError('Failed to update user.');
        }
    };

    const handleCancel = () => {
        navigate('/admin'); // Redirect to /admin
    };

    return (
        <div className="update-user-container">
            <h3>Update User</h3>
            {error && <p className="error">{error}</p>}
            <form className="update-user-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div className="button-group">
                    <button
                        type="button"
                        className="update-button"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleCancel} // Navigate to /admin
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
