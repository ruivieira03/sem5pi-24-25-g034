import axios from 'axios';
import './PatientUpdate.css'; // Import the CSS file

const PatientUpdate = ({ profileData, setProfileData, setError, setSuccess }) => {
    const token = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('https://localhost:5001/api/account/update-profile', profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Profile updated successfully!');
            setError('');
            setProfileData(response.data); // Update the state with the new profile data
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
            setSuccess('');
        }
    };

    return (
        <div class ="patient-update-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Emergency Contact:</label>
                    <input
                        type="text"
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default PatientUpdate;