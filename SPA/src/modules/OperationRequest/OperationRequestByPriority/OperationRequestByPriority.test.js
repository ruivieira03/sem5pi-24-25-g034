import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OperationRequestByPriority from './OperationRequestByPriority';

jest.mock('axios');

describe('OperationRequestByPriority Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the OperationRequestByPriority form correctly', () => {
        render(<OperationRequestByPriority />);

        expect(screen.getByText('Get Operation Request Details by Priority')).toBeInTheDocument();
        expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fetch Request' })).toBeInTheDocument();
    });

    test('displays an error message when no priority is entered', () => {
        render(<OperationRequestByPriority />);

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        expect(screen.getByText('Please provide a valid priority.')).toBeInTheDocument();
    });

    test('displays operation request details when a valid priority is provided', async () => {
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
                operationTypeID: 'type124',
                deadlineDate: '2023-11-30T00:00:00Z',
                priority: 1,
            },
        ];

        axios.get.mockResolvedValueOnce({ data: mockRequestData });

        render(<OperationRequestByPriority />);

        const priorityInput = screen.getByLabelText('Priority:');
        fireEvent.change(priorityInput, { target: { value: '1' } });

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
            expect(screen.getByText('type123')).toBeInTheDocument();
            expect(screen.getByText('type124')).toBeInTheDocument();
            expect(screen.getByText('12/31/2023')).toBeInTheDocument();
            expect(screen.getByText('11/30/2023')).toBeInTheDocument();
            expect(screen.getAllByText('1').length).toBe(2);
        });

        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/OperationRequest/priority/1',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    test('displays an error message when the operation request is not found', async () => {
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<OperationRequestByPriority />);

        const priorityInput = screen.getByLabelText('Priority:');
        fireEvent.change(priorityInput, { target: { value: '99' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('Operation request not found.')).toBeInTheDocument();
        });
    });

    test('displays a generic error message when a non-404 error occurs', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<OperationRequestByPriority />);

        const priorityInput = screen.getByLabelText('Priority:');
        fireEvent.change(priorityInput, { target: { value: '1' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching operation request details.')
            ).toBeInTheDocument();
        });
    });
});