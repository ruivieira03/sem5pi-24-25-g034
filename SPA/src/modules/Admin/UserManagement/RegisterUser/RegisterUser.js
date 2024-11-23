import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './RegisterUser.css';

function RegisterUser() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const payload = { ...formData };
            const response = await axios.post(
                `${API_BASE_URL}/api/SystemUser`, // Use API_BASE_URL here
                payload,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                }
            );

            if (response.status === 201) {
                setSuccess(true);
                setFormData({ username: '', email: '', phoneNumber: '', role: '' });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-user-container">
            <h2>Register New User</h2>
            {success && <p className="success">Registration successful! Please check your email for further instructions.</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default RegisterUser;
