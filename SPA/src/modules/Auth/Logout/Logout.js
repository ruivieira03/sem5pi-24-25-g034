import React from 'react';
import './Logout.css';

function Logout() {

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');

        // Redirect to login page
        window.location.href = '/';
    };

    // Trigger logout when the component is mounted
    React.useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div className="logout-container">
            <div className="logout-spinner"></div>
            <p className="logout-message">Logging out, please wait...</p>
        </div>
    );
}

export default Logout;
