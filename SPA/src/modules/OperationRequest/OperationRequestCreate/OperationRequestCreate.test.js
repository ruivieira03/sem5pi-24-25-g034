import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OperationRequestCreate from './OperationRequestCreate';
import axios from 'axios';

jest.mock('axios');

describe('OperationRequestCreate Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the create operation request form', () => {
        render(<OperationRequestCreate />);

        expect(screen.getByText('Create Operation Request')).toBeInTheDocument();
        expect(screen.getByLabelText('Patient ID:')).toBeInTheDocument();
        expect(screen.getByLabelText('Doctor ID:')).toBeInTheDocument();
        expect(screen.getByLabelText('Operation Type ID:')).toBeInTheDocument();
        expect(screen.getByLabelText('Deadline Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    test('updates form input values on change', () => {
        render(<OperationRequestCreate />);

        const patientIDInput = screen.getByLabelText('Patient ID:');
        fireEvent.change(patientIDInput, { target: { name: 'patientID', value: '12345' } });
        expect(patientIDInput.value).toBe('12345');

        const priorityInput = screen.getByLabelText('Priority:');
        fireEvent.change(priorityInput, { target: { name: 'priority', value: '1' } });
        expect(priorityInput.value).toBe('1');
    });

    test('displays success message on successful creation', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<OperationRequestCreate />);

        const patientIDInput = screen.getByLabelText('Patient ID:');
        const doctorIDInput = screen.getByLabelText('Doctor ID:');
        const operationTypeIDInput = screen.getByLabelText('Operation Type ID:');
        const deadlineDateInput = screen.getByLabelText('Deadline Date:');
        const priorityInput = screen.getByLabelText('Priority:');
        const submitButton = screen.getByRole('button', { name: 'Create' });

        fireEvent.change(patientIDInput, { target: { name: 'patientID', value: '12345' } });
        fireEvent.change(doctorIDInput, { target: { name: 'doctorID', value: '67890' } });
        fireEvent.change(operationTypeIDInput, { target: { name: 'operationTypeID', value: 'type1' } });
        fireEvent.change(deadlineDateInput, { target: { name: 'deadlineDate', value: '2023-12-31' } });
        fireEvent.change(priorityInput, { target: { name: 'priority', value: '1' } });

        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Creating...');

        await waitFor(() => {
            expect(screen.getByText('Operation request created successfully!')).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/OperationRequest/create',
            {
                patientID: '12345',
                doctorID: '67890',
                operationTypeID: 'type1',
                deadlineDate: '2023-12-31',
                priority: '1',
            },
            {
                headers: { Authorization: 'Bearer mockAuthToken' },
            }
        );
    });

    test('displays error message on creation failure', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Failed to create operation request.' } },
        });

        render(<OperationRequestCreate />);

        const patientIDInput = screen.getByLabelText('Patient ID:');
        const doctorIDInput = screen.getByLabelText('Doctor ID:');
        const operationTypeIDInput = screen.getByLabelText('Operation Type ID:');
        const deadlineDateInput = screen.getByLabelText('Deadline Date:');
        const priorityInput = screen.getByLabelText('Priority:');
        const submitButton = screen.getByRole('button', { name: 'Create' });

        fireEvent.change(patientIDInput, { target: { name: 'patientID', value: '12345' } });
        fireEvent.change(doctorIDInput, { target: { name: 'doctorID', value: '67890' } });
        fireEvent.change(operationTypeIDInput, { target: { name: 'operationTypeID', value: 'type1' } });
        fireEvent.change(deadlineDateInput, { target: { name: 'deadlineDate', value: '2023-12-31' } });
        fireEvent.change(priorityInput, { target: { name: 'priority', value: '1' } });

        fireEvent.click(submitButton);

        expect(submitButton).toHaveTextContent('Creating...');

        await waitFor(() => {
            expect(screen.getByText('Failed to create operation request.')).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith(
            'https://localhost:5001/api/OperationRequest/create',
            {
                patientID: '12345',
                doctorID: '67890',
                operationTypeID: 'type1',
                deadlineDate: '2023-12-31',
                priority: '1',
            },
            {
                headers: { Authorization: 'Bearer mockAuthToken' },
            }
        );
    });
});