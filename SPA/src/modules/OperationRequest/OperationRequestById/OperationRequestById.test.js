import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OperationRequestById from './OperationRequestById';

jest.mock('axios');

describe('OperationRequestById Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken'); // Mock auth token
    });

    test('renders the OperationRequestById form correctly', () => {
        render(<OperationRequestById />);

        expect(screen.getByText('Get Operation Request Details')).toBeInTheDocument();
        expect(screen.getByLabelText('Operation Request ID:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fetch Request' })).toBeInTheDocument();
    });

    test('displays an error message when no operation request ID is entered', () => {
        render(<OperationRequestById />);

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        expect(screen.getByText('Please provide a valid operation request ID.')).toBeInTheDocument();
    });

    test('displays operation request details when a valid ID is provided', async () => {
        const mockRequestData = {
            id: '123',
            patientID: 'patient123',
            doctorID: 'doctor123',
            operationTypeID: 'type123',
            deadlineDate: '2023-12-31T00:00:00Z',
            priority: 1,
        };

        axios.get.mockResolvedValueOnce({ data: mockRequestData });

        render(<OperationRequestById />);

        const requestIdInput = screen.getByLabelText('Operation Request ID:');
        fireEvent.change(requestIdInput, { target: { value: '123' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('Operation Request Details')).toBeInTheDocument();
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('123')).toBeInTheDocument();
            expect(screen.getByText('Patient ID:')).toBeInTheDocument();
            expect(screen.getByText('patient123')).toBeInTheDocument();
            expect(screen.getByText('Doctor ID:')).toBeInTheDocument();
            expect(screen.getByText('doctor123')).toBeInTheDocument();
            expect(screen.getByText('Operation Type ID:')).toBeInTheDocument();
            expect(screen.getByText('type123')).toBeInTheDocument();
            expect(screen.getByText('Deadline Date:')).toBeInTheDocument();
            expect(screen.getByText('12/31/2023')).toBeInTheDocument();
            expect(screen.getByText('Priority:')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith(
            'https://localhost:5001/api/OperationRequest/123',
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );
    });

    test('displays an error message when the operation request is not found', async () => {
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        render(<OperationRequestById />);

        const requestIdInput = screen.getByLabelText('Operation Request ID:');
        fireEvent.change(requestIdInput, { target: { value: 'invalid-id' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText('Operation request not found.')).toBeInTheDocument();
        });
    });

    test('displays a generic error message when a non-404 error occurs', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<OperationRequestById />);

        const requestIdInput = screen.getByLabelText('Operation Request ID:');
        fireEvent.change(requestIdInput, { target: { value: '123' } });

        const fetchButton = screen.getByText('Fetch Request');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while fetching operation request details.')
            ).toBeInTheDocument();
        });
    });
});