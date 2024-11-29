import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for Router context
import axios from 'axios';
import UserList from './UserList';

jest.mock('axios');

describe('UserList Component', () => {
    const mockUsers = [
        { id: '1', username: 'UserOne', role: 'Admin' },
        { id: '2', username: 'UserTwo', role: 'User' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken');
    });

    test('renders loading state initially', () => {
        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );
        expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    test('displays users after successful fetch', async () => {
        axios.get.mockResolvedValueOnce({ data: mockUsers });

        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('System Users')).toBeInTheDocument();
            expect(screen.getByText('UserOne')).toBeInTheDocument();
            expect(screen.getByText('UserTwo')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith('https://localhost:5001/api/SystemUser', {
            headers: { Authorization: 'Bearer mockAuthToken' },
        });
    });

    test('displays an error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Error fetching users.')).toBeInTheDocument();
        });
    });

    test('handles delete user interaction', async () => {
        axios.get.mockResolvedValueOnce({ data: mockUsers });

        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('UserOne')).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Delete User')).toBeInTheDocument();
        });
    });

    test('handles update user interaction', async () => {
        axios.get.mockResolvedValueOnce({ data: mockUsers });

        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('UserOne')).toBeInTheDocument();
        });

        const updateButton = screen.getAllByText('Update')[0];
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText('Update User')).toBeInTheDocument();
        });
    });

    test('displays "No users found" when the list is empty', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <UserList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('No users found.')).toBeInTheDocument();
        });
    });
});
