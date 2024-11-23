import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from './CommonMenu';
import UserList from '../modules/Admin/UserList';
import RegisterUser from '../modules/Admin/RegisterUser';
import './AdminMenu.css'; // Import new CSS file for styling
import OperationRequestList from '../modules/OperationRequest/OperationRequestList';

function AdminMenu() {
    return (
        <div className="admin-menu-container">
            <CommonMenu />
            <h2 className="admin-menu-header">Admin Menu</h2>

            <ul className="admin-menu-list">
                <li><Link className="admin-menu-link" to="/admin/register-user">Register User</Link></li>
                <li><Link className="admin-menu-link" to="/admin/user-list">User List</Link></li>
                <li><Link className="admin-menu-link" to="/profile">Profile</Link></li>

                <li><Link className="admin-menu-link" to="/admin/operation-requests">Operation Requests</Link></li>
                <li><Link className="admin-menu-link" to="/api/OperationRequest/5">Operation Request by ID</Link></li>
                <li><Link className="admin-menu-link" to="/api/OperationRequest/patient/5">Operation Request by Patient</Link></li>
                <li><Link className="admin-menu-link" to="/api/OperationRequest/type/5">Operation Request by Type</Link></li>
                <li><Link className="admin-menu-link" to="/api/OperationRequest/priority/5">Operation Request by Priority</Link></li>
            </ul>


            <div className="admin-menu-logout">
                <Link to="/logout">Logout</Link>
            </div>

            <Routes>
                <Route path="user-list" element={<UserList />} />
                <Route path="register-user" element={<RegisterUser />} />
                <Route path="operation-requests" element={<OperationRequestList />} />
            </Routes>
        </div>
    );
}

export default AdminMenu;
