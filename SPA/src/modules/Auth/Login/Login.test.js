import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

jest.mock('axios'); // Mock axios

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate, // Mock useNavigate
}));

describe('Login Component', () => {
    let originalConsoleError;

    beforeEach(() => {
        jest.clearAllMocks();

        // Suppress console.error during tests
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        // Restore original console.error
        console.error = originalConsoleError;
    });

    test('renders the login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('displays an error message on failed login', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() =>
            expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument()
        );
    });

    test('redirects to Admin menu on successful Admin login', async () => {
        axios.post.mockResolvedValueOnce({
            data: { token: 'mockToken', role: 'Admin' },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'adminuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'adminpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/admin/AdminMenu')
        );
    });

    test('redirects to Doctor menu on successful Doctor login', async () => {
        axios.post.mockResolvedValueOnce({
            data: { token: 'mockToken', role: 'Doctor' },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'doctoruser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'doctorpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/doctor/DoctorMenu')
        );
    });

    test('redirects to Patient menu on successful Patient login', async () => {
        axios.post.mockResolvedValueOnce({
            data: { token: 'mockToken', role: 'Patient' },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'patientuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'patientpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/patient/PatientMenu')
        );
    });

    test('redirects to default route if role is unrecognized', async () => {
        axios.post.mockResolvedValueOnce({
            data: { token: 'mockToken', role: 'Unknown' },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'unknownuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'unknownpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/')
        );
    });
});
