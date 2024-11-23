import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterUser from './RegisterUser';
import axios from 'axios';

jest.mock('axios');

describe('RegisterUser Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the registration form', () => {
        render(<RegisterUser />);

        expect(screen.getByText('Register New User')).toBeInTheDocument();
        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number:')).toBeInTheDocument();
        expect(screen.getByLabelText('Role:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('updates form input values on change', () => {
        render(<RegisterUser />);

        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { name: 'username', value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');

        const emailInput = screen.getByLabelText('Email:');
        fireEvent.change(emailInput, { target: { name: 'email', value: 'testuser@example.com' } });
        expect(emailInput.value).toBe('testuser@example.com');
    });

    test('displays success message on successful registration', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<RegisterUser />);

        const usernameInput = screen.getByLabelText('Username:');
        const emailInput = screen.getByLabelText('Email:');
        const phoneNumberInput = screen.getByLabelText('Phone Number:');
        const roleInput = screen.getByLabelText('Role:');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.change(usernameInput, { target: { name: 'username', value: 'testuser' } });
        fireEvent.change(emailInput, { target: { name: 'email', value: 'testuser@example.com' } });
        fireEvent.change(phoneNumberInput, { target: { name: 'phoneNumber', value: '1234567890' } });
        fireEvent.change(roleInput, { target: { name: 'role', value: 'Admin' } });

        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Registering...');

        await screen.findByText('Registration successful! Please check your email for further instructions.');

        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/SystemUser',
            {
                username: 'testuser',
                email: 'testuser@example.com',
                phoneNumber: '1234567890',
                role: 'Admin',
            },
            {
                headers: { Authorization: 'Bearer mockAuthToken' },
            }
        );

        expect(screen.getByText('Registration successful! Please check your email for further instructions.')).toBeInTheDocument();
    });

    test('displays error message on registration failure', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Failed to register user.' } },
        });

        render(<RegisterUser />);

        const usernameInput = screen.getByLabelText('Username:');
        const emailInput = screen.getByLabelText('Email:');
        const phoneNumberInput = screen.getByLabelText('Phone Number:');
        const roleInput = screen.getByLabelText('Role:');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.change(usernameInput, { target: { name: 'username', value: 'testuser' } });
        fireEvent.change(emailInput, { target: { name: 'email', value: 'testuser@example.com' } });
        fireEvent.change(phoneNumberInput, { target: { name: 'phoneNumber', value: '1234567890' } });
        fireEvent.change(roleInput, { target: { name: 'role', value: 'Admin' } });

        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Registering...');

        await screen.findByText('Failed to register user.');

        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/SystemUser',
            {
                username: 'testuser',
                email: 'testuser@example.com',
                phoneNumber: '1234567890',
                role: 'Admin',
            },
            {
                headers: { Authorization: 'Bearer mockAuthToken' },
            }
        );

        expect(screen.getByText('Failed to register user.')).toBeInTheDocument();
    });
});
