import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OperationRequestByType from './OperationRequestByType';

jest.mock('axios');

describe('OperationRequestByType Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the OperationRequestByType form correctly', () => {
        render(<OperationRequestByType />);

        expect(screen.getByText('Get Operation Request Details by Type ID')).toBeInTheDocument();
        expect(screen.getByLabelText('Operation Type ID:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fetch Request' })).toBeInTheDocument();
    });

    test('displays an error message when no operation type ID is entered', () => {
        render(<OperationRequestByType />);

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        expect(screen.getByText('Please provide a valid operation type ID.')).toBeInTheDocument();
    });

    test('displays operation request details when a valid operation type ID is provided', async () => {
        const mockRequestData = [
            {
                id: '123',
                patientID: 'patient123',
                doctorID: 'doctor123',
                operationTypeID: 'type123',
                deadlineDate: '2023-12-31T00:00:00Z',
                priority: 1,
            },
            {
                id: '124',
                patientID: 'patient124',
                doctorID: 'doctor124',
                operationTypeID: 'type123',
                deadlineDate: '2023-11-30T00:00:00Z',
                priority: 2,
            },
        ];

        axios.get.mockResolvedValueOnce({ data: mockRequestData });

        render(<OperationRequestByType />);

        const operationTypeIdInput = screen.getByLabelText('Operation Type ID:');
        fireEvent.change(operationTypeIdInput, { target: { value: 'type123' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('Operation Request Details')).toBeInTheDocument();
            expect(screen.getAllByText('ID:').length).toBe(2);
            expect(screen.getByText('123')).toBeInTheDocument();
            expect(screen.getByText('124')).toBeInTheDocument();
            expect(screen.getAllByText('Patient ID:').length).toBe(2);
            expect(screen.getByText('patient123')).toBeInTheDocument();
            expect(screen.getByText('patient124')).toBeInTheDocument();
            expect(screen.getByText('doctor123')).toBeInTheDocument();
            expect(screen.getByText('doctor124')).toBeInTheDocument();
            expect(screen.getAllByText('type123').length).toBe(2);
            expect(screen.getByText('12/31/2023')).toBeInTheDocument();
            expect(screen.getByText('11/30/2023')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/OperationRequest/type/type123',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    test('displays an error message when the operation request is not found', async () => {
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<OperationRequestByType />);

        const operationTypeIdInput = screen.getByLabelText('Operation Type ID:');
        fireEvent.change(operationTypeIdInput, { target: { value: 'invalid-id' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('Operation request not found.')).toBeInTheDocument();
        });
    });

    test('displays a generic error message when a non-404 error occurs', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<OperationRequestByType />);

        const operationTypeIdInput = screen.getByLabelText('Operation Type ID:');
        fireEvent.change(operationTypeIdInput, { target: { value: 'type123' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching operation request details.')
            ).toBeInTheDocument();
        });
    });
});