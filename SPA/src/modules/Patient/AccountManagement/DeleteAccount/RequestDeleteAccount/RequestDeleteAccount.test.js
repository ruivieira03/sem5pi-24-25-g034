// src/modules/Auth/RequestDeleteAccount/RequestDeleteAccount.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RequestDeleteAccount from './RequestDeleteAccount';

jest.mock('axios');

describe('RequestDeleteAccount Component', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders the component with proper text and button', () => {
        render(<RequestDeleteAccount />);

        expect(screen.getByText('Request Account Deletion')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Click the button below to request account deletion. A confirmation email will be sent to you.'
            )
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Request Delete Account' })).toBeInTheDocument();
    });

    test('displays error message if no token is found in localStorage', async () => {
        render(<RequestDeleteAccount />);

        fireEvent.click(screen.getByRole('button', { name: 'Request Delete Account' }));

        expect(await screen.findByText('No token found. Please log in.')).toBeInTheDocument();
    });

    test('displays success message on successful request', async () => {
        localStorage.setItem('authToken', 'mockAuthToken');
        axios.get.mockResolvedValueOnce({
            data: { message: 'Request successful. A confirmation email has been sent.' },
        });

        render(<RequestDeleteAccount />);

        fireEvent.click(screen.getByRole('button', { name: 'Request Delete Account' }));

        await waitFor(() => {
            expect(
                screen.getByText('Request successful. A confirmation email has been sent.')
            ).toBeInTheDocument();
        });

        expect(screen.queryByText('An error occurred. Please try again.')).not.toBeInTheDocument();
        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/account/request-delete-account',
            expect.objectContaining({
                headers: { Authorization: 'Bearer mockAuthToken' },
            })
        );
    });

    test('displays error message on request failure', async () => {
        localStorage.setItem('authToken', 'mockAuthToken');
        axios.get.mockRejectedValueOnce({
            response: { data: { message: 'Request failed due to server error.' } },
        });

        render(<RequestDeleteAccount />);

        fireEvent.click(screen.getByRole('button', { name: 'Request Delete Account' }));

        await waitFor(() => {
            expect(screen.getByText('Request failed due to server error.')).toBeInTheDocument();
        });

        expect(screen.queryByText('Request successful. A confirmation email has been sent.')).not.toBeInTheDocument();
    });

    test('displays generic error message when no specific error is provided', async () => {
        localStorage.setItem('authToken', 'mockAuthToken');
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<RequestDeleteAccount />);

        fireEvent.click(screen.getByRole('button', { name: 'Request Delete Account' }));

        await waitFor(() => {
            expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
        });

        expect(screen.queryByText('Request successful. A confirmation email has been sent.')).not.toBeInTheDocument();
    });
});
