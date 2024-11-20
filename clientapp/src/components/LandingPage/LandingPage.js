import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page-container">
            <h1>Welcome to the Healthcare Application</h1>
            <p>Please choose an option:</p>
            <div className="landing-buttons">
                <Link to="/login">
                    <button className="btn-login">Login</button>
                </Link>
                <Link to="/register-patient">
                    <button className="btn-register">Register as Patient</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
