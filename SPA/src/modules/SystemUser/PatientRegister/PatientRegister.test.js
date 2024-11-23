import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PatientRegister from './PatientRegister';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('PatientRegister Component', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
        jest.useFakeTimers(); // Handle timeouts in tests
    });

    test('renders form elements correctly', () => {
        render(
            <MemoryRouter>
                <PatientRegister />
            </MemoryRouter>
        );

        // Check if form elements are rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(
            <MemoryRouter>
                <PatientRegister />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);

        fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });

        expect(usernameInput.value).toBe('JohnDoe');
        expect(emailInput.value).toBe('john.doe@example.com');
        expect(passwordInput.value).toBe('password123');
        expect(phoneNumberInput.value).toBe('1234567890');
    });

    test('submits form successfully', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });
        render(
            <MemoryRouter>
                <PatientRegister />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);
        const submitButton = screen.getByRole('button', { name: /register/i });

        // Fill out form
        fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });

        // Submit form
        fireEvent.click(submitButton);

        // Verify API call
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://localhost:5001/api/SystemUser/register-patient',
                {
                    username: 'JohnDoe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                    phoneNumber: '1234567890',
                    role: 'Patient',
                }
            );
        });

        // Verify success message
        expect(await screen.findByText(/registration successful/i)).toBeInTheDocument();

        // Verify navigation after 3 seconds
        jest.runAllTimers();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('handles registration error', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Email already in use.' } },
        });
        render(
            <MemoryRouter>
                <PatientRegister />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);
        const submitButton = screen.getByRole('button', { name: /register/i });

        // Fill out form
        fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });

        // Submit form
        fireEvent.click(submitButton);

        // Verify API call
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://localhost:5001/api/SystemUser/register-patient',
                {
                    username: 'JohnDoe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                    phoneNumber: '1234567890',
                    role: 'Patient',
                }
            );
        });

        // Verify error message
        expect(await screen.findByText(/email already in use/i)).toBeInTheDocument();

        // Ensure navigation is not triggered
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('disables submit button when loading', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });
        render(
            <MemoryRouter>
                <PatientRegister />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const phoneNumberInput = screen.getByLabelText(/phone number/i);
        const submitButton = screen.getByRole('button', { name: /register/i });

        // Fill out form
        fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });

        // Submit form
        fireEvent.click(submitButton);

        // Button should show loading state
        expect(submitButton).toHaveTextContent('Registering...');
        expect(submitButton).toBeDisabled();

        // Wait for request to complete
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
    });
});
