import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmEmail from './ConfirmEmail';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('ConfirmEmail Component', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    test('redirects to home if email or token is missing', () => {
        useLocation.mockReturnValue({ search: '' });

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>
        );

        // Verify alert is shown
        expect(window.alert).toHaveBeenCalledWith('Email or token is missing.');

    });

    test('sets email and token from query parameters', () => {
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=mockToken123',
        });

        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>
        );

        // Verify query parameters are extracted and stored in state
        expect(screen.queryByText('Are you sure you want to confirm your email address?')).toBeInTheDocument();
    });

    test('handles successful email confirmation', async () => {
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=mockToken123',
        });
        axios.get.mockResolvedValueOnce({ data: { message: 'Email confirmed successfully.' } });

        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>
        );

        // Trigger email confirmation
        fireEvent.click(screen.getByText('Yes, Confirm My Email'));

        // Verify API call
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                'https://localhost:5001/api/account/confirm-email?email=test@example.com&token=mockToken123'
            );
        });

        // Verify success message
        expect(await screen.findByText('Email confirmed successfully.')).toBeInTheDocument();

    });

    test('handles error during email confirmation', async () => {
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=mockToken123',
        });
        axios.get.mockRejectedValueOnce({
            response: { data: { message: 'Invalid token or email.' } },
        });

        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>
        );

        // Trigger email confirmation
        fireEvent.click(screen.getByText('Yes, Confirm My Email'));

        // Verify API call
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                'https://localhost:5001/api/account/confirm-email?email=test@example.com&token=mockToken123'
            );
        });

        // Verify error message
        expect(await screen.findByText('Invalid token or email.')).toBeInTheDocument();
    });

    test('displays alert when email confirmation is canceled', () => {
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=mockToken123',
        });

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MemoryRouter>
                <ConfirmEmail />
            </MemoryRouter>
        );

        // Trigger cancel action
        fireEvent.click(screen.getByText('Cancel'));

        // Verify alert is shown
        expect(window.alert).toHaveBeenCalledWith('Email confirmation canceled.');
    });
});
