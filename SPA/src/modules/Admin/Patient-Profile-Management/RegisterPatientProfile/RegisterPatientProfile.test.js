import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
        expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number:')).toBeInTheDocument();
        expect(screen.getByLabelText('Emergency Contact:')).toBeInTheDocument();
        expect(screen.getByLabelText('Allergies:')).toBeInTheDocument();
        expect(screen.getByLabelText('Medical History:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    // Caso de Sucesso 2  all with no allergies

    test('successful registration with medical history', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<RegisterPatientProfile />);

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { name: 'FirstName', value: 'Carlos' } });
        fireEvent.change(screen.getByLabelText('Last Name:'), { target: { name: 'LastName', value: 'Silva' } });
        fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { name: 'DateOfBirth', value: '1980-03-15' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { name: 'Gender', value: 'male' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'carlos.silva@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '1234567890' } });
        fireEvent.change(screen.getByLabelText('Medical History:'), { target: { name: 'MedicalHistory', value: 'Diabetes, Hypertension' } });

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('Registration successful!');
        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/Patient/register-profile',
            expect.objectContaining({
                FirstName: 'Carlos',
                LastName: 'Silva',
                MedicalHistory: 'Diabetes, Hypertension',
            }),
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

     // Caso de Sucesso 1: Todos os atributos preenchidos
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
        fireEvent.change(screen.getByLabelText('Allergies:'), { target: { name: 'Allergies', value: 'Pollen, Nuts' } });
        fireEvent.change(screen.getByLabelText('Medical History:'), { target: { name: 'MedicalHistory', value: 'Asthma' } });

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
                EmergencyContact: '1234567890',
                Allergies: 'Pollen, Nuts',
                MedicalHistory: 'Asthma',
            }),
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    // Caso de Sucesso 2: Sem `allergies` e `medicalHistory`
    test('successful registration without allergies and medical history', async () => {
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
                Allergies: '', // Ausente
                MedicalHistory: '', // Ausente
            }),
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });





    // Caso de insucesso 1
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
          // Caso de insucesso 2
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


   
    // Caso de Insucesso 3: Algum atributo em branco (First Name)
    test('displays error message when  any Required atribute missing (firstName on this Case', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'First Name is required.' } },
        });

        render(<RegisterPatientProfile />);

        // Não preencher `FirstName`
        fireEvent.change(screen.getByLabelText('Last Name:'), { target: { name: 'LastName', value: 'Silva' } });
        fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { name: 'DateOfBirth', value: '2000-10-10' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { name: 'Gender', value: 'male' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { name: 'Email', value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { name: 'PhoneNumber', value: '1234567890' } });

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await screen.findByText('First Name is required.');
        expect(axios.post).toHaveBeenCalled();
    });
});



