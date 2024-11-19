// src/modules/Auth/Logout.js

import React from 'react';

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

    return <div>Logging out...</div>;
}

export default Logout;
