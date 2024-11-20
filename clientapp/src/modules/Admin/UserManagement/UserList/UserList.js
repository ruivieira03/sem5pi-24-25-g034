import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUser from '../DeleteUser/DeleteUser';
import UpdateUser from '../UpdateUser/UpdateUser';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingUser, setDeletingUser] = useState(null);
    const [updatingUser, setUpdatingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:5001/api/SystemUser', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [authToken]);

    const handleDeleteSuccess = (userId) => {
        if (userId) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            alert('User deleted successfully.');
        }
        setDeletingUser(null);
    };

    const handleUpdateSuccess = (updatedUser) => {
        if (updatedUser) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
                )
            );
            alert('User updated successfully.');
        }
        setUpdatingUser(null);
    };

    if (loading) return <div className="user-list-container">Loading users...</div>;
    if (error) return <div className="user-list-container">{error}</div>;

    return (
        <div className="user-list-container">
            <h2>System Users</h2>
            <ul className="user-list">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="user-item">
                            <span>
                                {user.username} - {user.role}
                            </span>
                            <button onClick={() => setDeletingUser(user)}>Delete</button>
                            <button onClick={() => setUpdatingUser(user)}>Update</button>
                        </li>
                    ))
                ) : (
                    <li className="user-item">No users found.</li>
                )}
            </ul>

            {deletingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <DeleteUser
                            user={deletingUser}
                            authToken={authToken}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    </div>
                </div>
            )}

            {updatingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <UpdateUser
                            user={updatingUser}
                            authToken={authToken}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
