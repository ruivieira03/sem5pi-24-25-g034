import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ user, authToken, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `https://localhost:5001/api/SystemUser/${user.id}`,
                formData, // Send updated data
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

    return (
        <div className="update-user">
            <h3>Update User</h3>
            {error && <p className="error">{error}</p>}
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Role:
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Phone Number:
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
            </label>
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
};

export default UpdateUser;
