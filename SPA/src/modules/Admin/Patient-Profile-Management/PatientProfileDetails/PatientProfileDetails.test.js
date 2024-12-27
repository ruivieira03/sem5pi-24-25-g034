import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
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
        expect(screen.getByRole('button', { name: 'Fetch User' })).toBeInTheDocument();
    });

    test('displays user details when a valid username is provided', async () => {
        const mockUserData = {
            username: 'testuser',
            email: 'testuser@example.com',
            role: 'Admin',
            phoneNumber: '1234567890',
        };
    
        axios.get.mockResolvedValueOnce({ data: mockUserData });
    
        render(<UserDetails />);
    
        // Target the input field using the placeholder
        const usernameInput = screen.getByPlaceholderText('Enter Username');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
        const fetchButton = screen.getByRole('button', { name: 'Fetch User' });
        fireEvent.click(fetchButton);
    
        await waitFor(() => {
            // Check that user details are displayed
            const userDetailsSection = screen.getByText('User Details').closest('div');
    
            const { getByText } = within(userDetailsSection);
    
            expect(getByText('Username:')).toBeInTheDocument();
            expect(getByText(mockUserData.username)).toBeInTheDocument();
    
            expect(getByText('Email:')).toBeInTheDocument();
            expect(getByText(mockUserData.email)).toBeInTheDocument();
    
            expect(getByText('Role:')).toBeInTheDocument();
            expect(getByText(mockUserData.role)).toBeInTheDocument();
    
            expect(getByText('Phone Number:')).toBeInTheDocument();
            expect(getByText(mockUserData.phoneNumber)).toBeInTheDocument();
        });
    
        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/SystemUser/username/testuser',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    
    
        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/SystemUser/username/testuser',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    test('displays an error message when the user is not found', async () => {
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<UserDetails />);

        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'invalid-username' } });

        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('User not found.')).toBeInTheDocument();
        });
    });

    test('displays a generic error message when a non-404 error occurs', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<UserDetails />);

        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });

        const fetchButton = screen.getByText('Fetch User');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching user details.')
            ).toBeInTheDocument();
        });
    });

});
