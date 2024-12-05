import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPatientProfile from './RegisterPatientProfile';
import axios from 'axios';

jest.mock('axios');

describe('RegisterPatientProfile Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    // Teste 1: Verificar se o formulário é renderizado corretamente
    test('renders the patient profile registration form', () => {
        render(<RegisterPatientProfile />);
    
        expect(screen.getByText('Register new Patient Profile on the System')).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Emergency Contact:/i)).toBeInTheDocument();
    
        // Busca os campos como 'Allergies or Medical Conditions' e 'Appointment History' diretamente    
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });
    
    test('successful registration with all attributes', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<RegisterPatientProfile />);

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { name: 'FirstName', value: 'Joana' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { name: 'LastName', value: 'Almeida' } });
    fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { name: 'DateOfBirth', value: '1992-09-22' } });
    fireEvent.change(screen.getByLabelText('Gender:'), { target: { name: 'Gender', value: 'female' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'joana.almeida@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Emergency Contact:'), { target: { name: 'EmergencyContact', value: '1234567890' } });


    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await screen.findByText('Registration successful!');
    expect(axios.post).toHaveBeenCalledWith(
        'https://localhost:5001/api/Patient/register-profile',
        expect.objectContaining({
            FirstName: 'Joana',
            LastName: 'Almeida',
            DateOfBirth: '1992-09-22',
            Gender: 'female',
            Email: 'joana.almeida@example.com',
            PhoneNumber: '9876543210',
            EmergencyContact: '1234567890',w
        }),
        { headers: { Authorization: 'Bearer mockAuthToken' } }
    );
});

    });

    // Teste 3: Registro sem `allergies` e `appointmentHistory`
    test('successful registration without allergies and appointment history', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<RegisterPatientProfile />);

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { name: 'FirstName', value: 'Pedro' } });
        fireEvent.change(screen.getByLabelText('Last Name:'), { target: { name: 'LastName', value: 'Ferreira' } });
        fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { name: 'DateOfBirth', value: '1998-01-15' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { name: 'Gender', value: 'male' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'pedro.ferreira@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '1234567890' } });
        fireEvent.change(screen.getByLabelText('Emergency Contact:'), { target: { name: 'EmergencyContact', value: '0987654321' } });

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('Registration successful!');
        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/Patient/register-profile',
            expect.objectContaining({
                FirstName: 'Pedro',
                LastName: 'Ferreira',
                DateOfBirth: '1998-01-15',
                Gender: 'male',
                Email: 'pedro.ferreira@example.com',
                PhoneNumber: '1234567890',
                EmergencyContact: '0987654321',
                allergiesOrMedicalConditions: [],
                appointmentHistory: [],
            }),
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    // Teste 4: Email já existe
    test('displays error message when email already exists', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Email already exists in the system.' } },
        });

        render(<RegisterPatientProfile />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'existing.email@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('Email already exists in the system.');
        expect(axios.post).toHaveBeenCalled();
    });

    // Teste 5: Número de telefone já existe
    test('displays error message when phone number already exists', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Phone number already exists in the system.' } },
        });

        render(<RegisterPatientProfile />);

        fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '9876543210' } });
        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('Phone number already exists in the system.');
        expect(axios.post).toHaveBeenCalled();
    });

    // Teste 6: Campo obrigatório vazio
    test('displays error message when a required field is missing (First Name)', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'First Name is required.' } },
        });

        render(<RegisterPatientProfile />);

        fireEvent.change(screen.getByLabelText('Last Name:'), { target: { name: 'LastName', value: 'Silva' } });
        fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { name: 'DateOfBirth', value: '2000-10-10' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { name: 'Gender', value: 'male' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '1234567890' } });

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('First Name is required.');
        expect(axios.post).toHaveBeenCalled();
    });

    // Teste 7: Erro genérico no servidor
    test('displays generic error message when server returns an error', async () => {
        axios.post.mockRejectedValueOnce(new Error('Something went wrong'));

        render(<RegisterPatientProfile />);

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await waitFor(() => {
            expect(screen.getByText('An error occurred during Profile registration.')).toBeInTheDocument();
        });
    });

