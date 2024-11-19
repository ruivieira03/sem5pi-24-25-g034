import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingUser, setDeletingUser] = useState(null);
    const [updatingUser, setUpdatingUser] = useState(null);

    // Fetch users from API
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
        setDeletingUser(null); // Close delete modal
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
        setUpdatingUser(null); // Close update modal
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
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
                    <li>No users found.</li>
                )}
            </ul>

            {/* Delete User Modal */}
            {deletingUser && (
                <div className="modal">
                    <DeleteUser
                        user={deletingUser}
                        authToken={authToken}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                </div>
            )}

            {/* Update User Modal */}
            {updatingUser && (
                <div className="modal">
                    <UpdateUser
                        user={updatingUser}
                        authToken={authToken}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                </div>
            )}
        </div>
    );
}

export default UserList;
