import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConfirmDeleteAccount from './ConfirmDeleteAccount';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

describe('ConfirmDeleteAccount Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        const { useNavigate, useLocation } = jest.requireMock('react-router-dom');
        useNavigate.mockReturnValue(mockNavigate);
        useLocation.mockReturnValue({ search: '' }); // Default mock for useLocation
        window.alert = jest.fn(); // Mock alert globally
    });

    test('alerts and navigates to home if email or token is missing', async () => {
        const { useLocation } = jest.requireMock('react-router-dom');
        useLocation.mockReturnValue({ search: '' }); // Simulate missing email and token

        render(
            <MemoryRouter>
                <ConfirmDeleteAccount />
            </MemoryRouter>
        );

        expect(window.alert).toHaveBeenCalledWith('Email or token is missing.');
    });

    test('handles successful account deletion and displays success message', async () => {
        const { useLocation } = jest.requireMock('react-router-dom');
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=validToken',
        }); // Simulate valid query parameters

        axios.get.mockResolvedValueOnce({
            data: { message: 'Account deleted successfully.' },
        });

        render(
            <MemoryRouter>
                <ConfirmDeleteAccount />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Yes, Delete My Account'));

        await waitFor(() => {
            expect(screen.getByText('Account deleted successfully.')).toBeInTheDocument();
        });
    });

    test('handles error when account deletion fails', async () => {
        const { useLocation } = jest.requireMock('react-router-dom');
        useLocation.mockReturnValue({
            search: '?email=test@example.com&token=invalidToken',
        }); // Simulate valid query parameters

        axios.get.mockRejectedValueOnce({
            response: { data: { message: 'Failed to delete the account.' } },
        });

        render(
            <MemoryRouter>
                <ConfirmDeleteAccount />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Yes, Delete My Account'));

        await waitFor(() => {
            expect(screen.getByText('Failed to delete the account.')).toBeInTheDocument();
        });
    });
});
