/*
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdatePatientProfile from './UpdatePatientProfile';

jest.mock('axios'); // Certifica-te de que o mock está configurado

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
        allergiesOrMedicalConditions: 'None',
        appointmentHistory: 'No appointments yet',
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
        process.env.REACT_APP_API_BASE_URL = 'https://localhost:5001'; // Garantir definição da variável de ambiente
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
        expect(screen.getByLabelText('Allergies or Medical Conditions:')).toHaveValue('None');
        expect(screen.getByLabelText('Appointment History:')).toHaveValue('No appointments yet');
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
            `${process.env.REACT_APP_API_BASE_URL}/api/Patient/update/${mockPatient.id}`,
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

    test('cancels update and navigates back', () => {
        render(
            <UpdatePatientProfile
                patient={mockPatient}
                authToken={mockAuthToken}
                onUpdateSuccess={mockOnUpdateSuccess}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
});


*/