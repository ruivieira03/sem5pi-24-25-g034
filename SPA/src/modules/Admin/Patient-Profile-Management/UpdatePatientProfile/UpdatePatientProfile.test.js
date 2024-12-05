import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdatePatientProfile from './UpdatePatientProfile';

jest.mock('axios');

describe('UpdatePatientProfile Component', () => {
    const mockPatient = {
        id: 'e2ac787d-91e2-4e64-a35a-5e2266b85ca8',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123456789',
        emergencyContact: '987654321',
        allergiesOrMedicalConditions: ['Peanuts', 'Dust'],
        appointmentHistory: ['Check-up on 2024-01-01'],
    };

    const mockAuthToken = 'mockAuthToken';
    const mockOnUpdateSuccess = jest.fn();
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders update form with patient data', () => {
        render(
            <UpdatePatientProfile
                patient={mockPatient}
                authToken={mockAuthToken}
                onUpdateSuccess={mockOnUpdateSuccess}
            />
        );

        expect(screen.getByLabelText('First Name:')).toHaveValue('John');
        expect(screen.getByLabelText('Last Name:')).toHaveValue('Doe');
        expect(screen.getByLabelText('Email:')).toHaveValue('john.doe@example.com');
        expect(screen.getByLabelText('Phone Number:')).toHaveValue('123456789');
        expect(screen.getByLabelText('Emergency Contact:')).toHaveValue('987654321');
        expect(screen.getByDisplayValue('Peanuts')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Dust')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Check-up on 2024-01-01')).toBeInTheDocument();
    });

    test('updates patient profile successfully', async () => {
        axios.put.mockResolvedValueOnce({
            data: { ...mockPatient, firstName: 'Johnny' },
        });

        render(
            <UpdatePatientProfile
                patient={mockPatient}
                authToken={mockAuthToken}
                onUpdateSuccess={mockOnUpdateSuccess}
            />
        );

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'Johnny' } });
        fireEvent.click(screen.getByText('Update'));

        expect(screen.getByText('Updating...')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockOnUpdateSuccess).toHaveBeenCalledWith({
                ...mockPatient,
                firstName: 'Johnny',
            });
        });

        expect(axios.put).toHaveBeenCalledWith(
            `https://localhost:5001/api/Patient/update/${mockPatient.id}`,
            expect.objectContaining({ firstName: 'Johnny' }),
            expect.objectContaining({
                headers: { Authorization: `Bearer ${mockAuthToken}` },
            })
        );
    });

    test('displays error message on failed update', async () => {
        axios.put.mockRejectedValueOnce(new Error('Failed to update'));

        render(
            <UpdatePatientProfile
                patient={mockPatient}
                authToken={mockAuthToken}
                onUpdateSuccess={mockOnUpdateSuccess}
            />
        );

        fireEvent.click(screen.getByText('Update'));

        await waitFor(() => {
            expect(screen.getByText('Failed to update patient profile.')).toBeInTheDocument();
        });
    });

  
});
