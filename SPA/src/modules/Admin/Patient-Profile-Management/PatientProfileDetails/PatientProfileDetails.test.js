import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PatientProfileDetails from './PatientProfileDetails';

// Mock do Axios
jest.mock('axios');

describe('PatientProfileDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken');
    });

    test('fetches and displays patient details successfully', async () => {
        const mockPatient = {
            email: 'john.doe@example.com',
            phoneNumber: '123456789',
            medicalRecordNumber: 'MRN1q2345',
            emergencyContact: '987654321',
        };

        // Configurar o mock para simular a resposta da API
        axios.get.mockResolvedValueOnce({ data: mockPatient });

        render(<PatientProfileDetails />);

        // Simular entrada do usuário no campo de email
        fireEvent.change(screen.getByLabelText('Email or PhoneNumber:'), {
            target: { value: 'john.doe@example.com' },
        });

        // Clicar no botão para buscar detalhes do paciente
        fireEvent.click(screen.getByText('Fetch Patient Profile'));

        // Esperar que os dados do paciente sejam exibidos
        await waitFor(() => {
            expect(screen.getByText('Patient Profile Details:')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('123456789')).toBeInTheDocument();
            expect(screen.getByText('MRN12345')).toBeInTheDocument();
            expect(screen.getByText('987654321')).toBeInTheDocument();
        });

        // Verificar se o mock do Axios foi chamado corretamente
        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_BASE_URL}/api/Patient/email/john.doe@example.com`,
            expect.objectContaining({
                headers: { Authorization: `Bearer mockAuthToken` },
            })
        );
    });

    test('displays error message when patient is not found', async () => {
        // Configurar o mock para simular um erro 404
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<PatientProfileDetails />);

        // Simular entrada do usuário no campo de email
        fireEvent.change(screen.getByLabelText('Email or PhoneNumber:'), {
            target: { value: 'unknown@example.com' },
        });

        // Clicar no botão para buscar detalhes do paciente
        fireEvent.click(screen.getByText('Fetch Patient Profile'));

        // Esperar que a mensagem de erro seja exibida
        await waitFor(() => {
            expect(screen.getByText('Patient Profile not found.')).toBeInTheDocument();
        });
    });

    test('displays validation error when email is missing', () => {
        render(<PatientProfileDetails />);

        // Clicar no botão sem preencher o campo de email
        fireEvent.click(screen.getByText('Fetch Patient Profile'));

        // Verificar se a mensagem de validação é exibida
        expect(screen.getByText('Please provide a valid email.')).toBeInTheDocument();
    });

    test('displays a generic error message on other API errors', async () => {
        // Configurar o mock para simular um erro genérico
        axios.get.mockRejectedValueOnce(new Error('Something went wrong'));

        render(<PatientProfileDetails />);

        // Simular entrada do usuário no campo de email
        fireEvent.change(screen.getByLabelText('Email or PhoneNumber:'), {
            target: { value: 'john.doe@example.com' },
        });

        // Clicar no botão para buscar detalhes do paciente
        fireEvent.click(screen.getByText('Fetch Patient Profile'));

        // Esperar que a mensagem de erro genérica seja exibida
        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching Patient Profile details.')
            ).toBeInTheDocument();
        });
    });
});

