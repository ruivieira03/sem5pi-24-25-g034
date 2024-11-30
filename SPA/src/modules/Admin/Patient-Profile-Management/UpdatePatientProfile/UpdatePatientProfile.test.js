import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // For mocking useNavigate
import axios from 'axios';
import UpdateUser from './UpdatePatientProfile';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('UpdateUser Component', () => {
    const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'Admin',
        phoneNumber: '1234567890',
    };
    const mockAuthToken = 'mockAuthToken';
    const mockOnUpdateSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the update user form', () => {
        render(
            <Router>
                <UpdateUser
                    user={mockUser}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        expect(screen.getByText('Update User')).toBeInTheDocument();
        expect(screen.getByLabelText('Username:')).toHaveValue('testuser');
        expect(screen.getByLabelText('Email:')).toHaveValue('testuser@example.com');
        expect(screen.getByLabelText('Role:')).toHaveValue('Admin');
        expect(screen.getByLabelText('Phone Number:')).toHaveValue('1234567890');
    });

    test('updates form input values on change', () => {
        render(
            <Router>
                <UpdateUser
                    user={mockUser}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { name: 'username', value: 'updateduser' } });
        expect(usernameInput.value).toBe('updateduser');

        const emailInput = screen.getByLabelText('Email:');
        fireEvent.change(emailInput, { target: { name: 'email', value: 'updated@example.com' } });
        expect(emailInput.value).toBe('updated@example.com');
    });

    test('calls onUpdateSuccess on successful update', async () => {
        axios.put.mockResolvedValueOnce({ data: { id: 1, username: 'updateduser' } });

        render(
            <Router>
                <UpdateUser
                    user={mockUser}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(mockOnUpdateSuccess).toHaveBeenCalledWith({ id: 1, username: 'updateduser' });
        });

        expect(axios.put).toHaveBeenCalledWith(
            `https://localhost:5001/api/SystemUser/${mockUser.id}`,
            {
                username: 'testuser',
                email: 'testuser@example.com',
                role: 'Admin',
                phoneNumber: '1234567890',
            },
            {
                headers: { Authorization: `Bearer ${mockAuthToken}` },
            }
        );
    });

    test('displays an error message on update failure', async () => {
        axios.put.mockRejectedValueOnce(new Error('Failed to update user.'));

        render(
            <Router>
                <UpdateUser
                    user={mockUser}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText('Failed to update user.')).toBeInTheDocument();
        });

        expect(mockOnUpdateSuccess).not.toHaveBeenCalled();
    });

    test('navigates back to admin page on cancel', () => {
        render(
            <Router>
                <UpdateUser
                    user={mockUser}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
});
