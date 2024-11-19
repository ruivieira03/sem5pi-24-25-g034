import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './RegisterUser.css'; // Import the CSS file

function RegisterUser  () {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '', // Add phoneNumber to the state
        role: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

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
            // Construct the payload with user input
            const payload = { ...formData };
            const response = await axios.post(
                'https://localhost:5001/api/SystemUser',
                payload,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                }
            );

            if (response.status === 201) {
                setSuccess (true);
                setFormData({ username: '', email: '', phoneNumber: '', role: '' }); // Reset form data
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }

        // Removed the redirection logic
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
                        type="tel" // Use 'tel' type for phone number input
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

export default RegisterUser ;