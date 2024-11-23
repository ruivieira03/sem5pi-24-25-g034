// src/components/CommonMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './CommonMenu.css'; // Import the CSS file

function CommonMenu() {
    return (
        <div className="common-menu">
            <ul>
                {/* Common menu items */}
                <li><Link to="/">Landing Page</Link></li>
                <li><Link to="/about">About</Link></li>
                
            </ul>
        </div>
    );
}

export default CommonMenu;