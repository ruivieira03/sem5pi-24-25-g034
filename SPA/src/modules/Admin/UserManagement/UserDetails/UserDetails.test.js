import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserDetails from './UserDetails';

jest.mock('axios');

describe('UserDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the UserDetails form correctly', () => {
        render(<UserDetails />);

        expect(screen.getByText('Get User Details')).toBeInTheDocument();
        expect(screen.getByLabelText('User ID:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fetch User' })).toBeInTheDocument();
    });

    test('displays an error message when no user ID is entered', () => {
        render(<UserDetails />);

        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);

        expect(screen.getByText('Please provide a valid user ID.')).toBeInTheDocument();
    });

    test('displays user details when a valid user ID is provided', async () => {
        const mockUserData = {
            id: '123',
            username: 'testuser',
            email: 'testuser@example.com',
            role: 'Admin',
            phoneNumber: '1234567890',
        };
    
        axios.get.mockResolvedValueOnce({ data: mockUserData });
    
        render(<UserDetails />);
    
        const userIdInput = screen.getByLabelText('User ID:');
        fireEvent.change(userIdInput, { target: { value: '123' } });
    
        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);
    
        await waitFor(() => {
            // Ensure the user details section is rendered
            expect(screen.getByText('User Details')).toBeInTheDocument();
    
            // Match partial text for each detail
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('123')).toBeInTheDocument();
    
            expect(screen.getByText('Username:')).toBeInTheDocument();
            expect(screen.getByText('testuser')).toBeInTheDocument();
    
            expect(screen.getByText('Email:')).toBeInTheDocument();
            expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    
            expect(screen.getByText('Role:')).toBeInTheDocument();
            expect(screen.getByText('Admin')).toBeInTheDocument();
    
            expect(screen.getByText('Phone Number:')).toBeInTheDocument();
            expect(screen.getByText('1234567890')).toBeInTheDocument();
        });
    
        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/SystemUser/123',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });
    

    test('displays an error message when the user is not found', async () => {
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<UserDetails />);

        const userIdInput = screen.getByLabelText('User ID:');
        fireEvent.change(userIdInput, { target: { value: 'invalid-id' } });

        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('User not found.')).toBeInTheDocument();
        });
    });

    test('displays a generic error message when a non-404 error occurs', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<UserDetails />);

        const userIdInput = screen.getByLabelText('User ID:');
        fireEvent.change(userIdInput, { target: { value: '123' } });

        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching user details.')
            ).toBeInTheDocument();
        });
    });
});
