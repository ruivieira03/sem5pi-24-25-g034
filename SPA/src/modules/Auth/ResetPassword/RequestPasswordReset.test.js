import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RequestPasswordReset from './RequestPasswordReset';

jest.mock('axios');

describe('RequestPasswordReset Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form and input fields correctly', () => {
        render(<RequestPasswordReset />);

        expect(screen.getByText('Request Password Reset')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByText('Send Reset Link')).toBeInTheDocument();
    });

    test('shows error if email is empty', async () => {
        render(<RequestPasswordReset />);

        const button = screen.getByText('Send Reset Link');
        fireEvent.click(button);

        expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    });

    test('sends a reset link on valid email input', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Password reset link sent!' } });

        render(<RequestPasswordReset />);

        const emailInput = screen.getByPlaceholderText('Enter your email');
        const button = screen.getByText('Send Reset Link');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/account/request-password-reset',
            { email: 'test@example.com' }
        ));

        expect(await screen.findByText('Password reset link sent!')).toBeInTheDocument();
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
    });

    test('shows error message on API error', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Invalid email address.' } },
        });

        render(<RequestPasswordReset />);

        const emailInput = screen.getByPlaceholderText('Enter your email');
        const button = screen.getByText('Send Reset Link');

        fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
        fireEvent.click(button);

        await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/account/request-password-reset',
            { email: 'invalid@example.com' }
        ));

        expect(await screen.findByText('Invalid email address.')).toBeInTheDocument();
        expect(screen.queryByText('Password reset link sent!')).not.toBeInTheDocument();
    });

    test('shows a generic error message on network failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network Error'));

        render(<RequestPasswordReset />);

        const emailInput = screen.getByPlaceholderText('Enter your email');
        const button = screen.getByText('Send Reset Link');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        expect(await screen.findByText('An error occurred. Please try again.')).toBeInTheDocument();
    });
});
