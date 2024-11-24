import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Profile from './Profile';

jest.mock('axios');

describe('Profile Component', () => {
    const mockProfileData = {
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'Admin',
    };

    let originalConsoleLog;
    let originalConsoleError;

    beforeEach(() => {
        jest.clearAllMocks();

        // Suppress console logs and errors during tests
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        console.log = jest.fn();
        console.error = jest.fn();
    });

    afterEach(() => {
        // Restore original console methods after each test
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    test('displays loading message initially', () => {
        render(<Profile />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays profile data when fetched successfully', async () => {
        // Mock API call
        axios.get.mockResolvedValueOnce({ data: mockProfileData });
        localStorage.setItem('authToken', 'mockToken');

        render(<Profile />);

        // Wait for the profile data to appear
        await waitFor(() => screen.getByText('Profile'));

        expect(screen.getByText('Username: testuser')).toBeInTheDocument();
        expect(screen.getByText('Email: testuser@example.com')).toBeInTheDocument();
        expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    });

    test('displays error message if no token is found in localStorage', async () => {
        localStorage.removeItem('authToken'); // Ensure no token exists

        render(<Profile />);

        await waitFor(() => screen.getByText('No token found. Please log in.'));
        expect(screen.getByText('No token found. Please log in.')).toBeInTheDocument();
    });

    test('displays error message if API call fails', async () => {
        // Mock API failure
        axios.get.mockRejectedValueOnce({
            response: { data: 'Unauthorized access' },
        });
        localStorage.setItem('authToken', 'invalidToken');

        render(<Profile />);

        await waitFor(() =>
            screen.getByText('Error fetching profile: Unauthorized access')
        );
        expect(
            screen.getByText('Error fetching profile: Unauthorized access')
        ).toBeInTheDocument();
    });

    test('displays generic error message for network or unknown errors', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        localStorage.setItem('authToken', 'mockToken');

        render(<Profile />);

        await waitFor(() =>
            screen.getByText('Error fetching profile: Network Error')
        );
        expect(
            screen.getByText('Error fetching profile: Network Error')
        ).toBeInTheDocument();
    });
});
