import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PatientProfileList from './PatientProfileList';

jest.mock('axios');

describe('PatientProfileList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken');
    });

    test('renders patient profiles list successfully', async () => {
        const mockPatients = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '123456789',
                emergencyContact: '987654321',
                allergies: 'None',
                appointmentHistory: 'No appointments yet',
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                phoneNumber: '987654321',
                emergencyContact: '123456789',
                allergies: 'Peanuts',
                appointmentHistory: 'Follow-up needed',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: mockPatients });

        render(<PatientProfileList />);

        expect(screen.getByText('Loading Profiles...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Patient Profiles')).toBeInTheDocument();
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_BASE_URL}/api/Patient/getAll`,
            expect.any(Object)
        );
    });

    test('displays error message when API fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Error fetching data'));

        render(<PatientProfileList />);

        expect(screen.getByText('Loading Profiles...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Error fetching Profiles.')).toBeInTheDocument();
        });
    });

    test('displays no profiles message when list is empty', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<PatientProfileList />);

        expect(screen.getByText('Loading Profiles...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('No Profiles found.')).toBeInTheDocument();
        });
    });
});
