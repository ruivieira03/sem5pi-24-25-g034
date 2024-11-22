import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from '../CommonMenu/CommonMenu';
import UserList from '../../modules/Admin/UserManagement/UserList/UserList';
import RegisterUser from '../../modules/Admin/UserManagement/RegisterUser/RegisterUser';
import Profile from '../../modules/Auth/Profile/Profile';
import UserDetails from '../../modules/Admin/UserManagement/UserDetails/UserDetails';
import './AdminMenu.css'; // Import new CSS file for styling

function AdminMenu() {
    return (
        <div className="admin-container">
            {/* Left-side menu */}
            <nav className="admin-menu">
                <CommonMenu />
                <h2 className="admin-menu-header">Admin Menu</h2>
                <ul className="admin-menu-list">
                    <li>
                        <Link className="admin-menu-link" to="/admin">Admin Initial Page </Link>
                    </li>

                    <li>
                        <Link className="admin-menu-link" to="register-user">Register User</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="user-list">User List</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="user-details/:id">User Information</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="profile">Profile</Link>
                    </li>
                </ul>
                <div className="admin-menu-logout">
                    <Link to="/logout" className="admin-menu-link">Logout</Link>
                </div>
            </nav>

            {/* Content area */}
            <div className="admin-content">
                <Routes>
                    <Route path="user-list" element={<UserList />} />
                    <Route path="user-details/:id" element={<UserDetails />} />
                    <Route path="register-user" element={<RegisterUser />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                        path="*"
                        element={
                            <div className="welcome-container">
                                <h1 className="welcome-message">Welcome to Admin Panel</h1>
                                <p className="welcome-description">
                                    Use the menu on the left to navigate through administrative functions.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default AdminMenu;