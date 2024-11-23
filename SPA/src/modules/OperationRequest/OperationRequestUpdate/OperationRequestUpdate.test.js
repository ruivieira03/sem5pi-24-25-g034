import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // For mocking useNavigate
import axios from 'axios';
import OperationRequestUpdate from './OperationRequestUpdate';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('OperationRequestUpdate Component', () => {
    const mockOperationRequest = {
        id: '0df70f0e-5226-4a96-a578-d9d6b7758a22',
        patientID: '12345',
        doctorID: '67890',
        operationTypeID: 'type1',
        deadlineDate: '2023-12-31',
        priority: 6,
    };
    const mockAuthToken = 'mockAuthToken';
    const mockOnUpdateSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the update operation request form', () => {
        render(
            <Router>
                <OperationRequestUpdate
                    operationRequest={mockOperationRequest}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        expect(screen.getByText('Update Operation Request')).toBeInTheDocument();
        expect(screen.getByLabelText('Patient ID:')).toHaveValue('12345');
        expect(screen.getByLabelText('Doctor ID:')).toHaveValue('67890');
        expect(screen.getByLabelText('Operation Type ID:')).toHaveValue('type1');
        expect(screen.getByLabelText('Deadline Date:')).toHaveValue('2023-12-31');
        expect(screen.getByLabelText('Priority:')).toHaveValue('6');
    });

    test('updates form input values on change', () => {
        render(
            <Router>
                <OperationRequestUpdate
                    operationRequest={mockOperationRequest}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const patientIDInput = screen.getByLabelText('Patient ID:');
        fireEvent.change(patientIDInput, { target: { name: 'patientID', value: '54321' } });
        expect(patientIDInput.value).toBe('54321');

        const priorityInput = screen.getByLabelText('Priority:');
        fireEvent.change(priorityInput, { target: { name: 'priority', value: '7' } });
        expect(priorityInput.value).toBe('7');
    });

    test('calls onUpdateSuccess on successful update', async () => {
        axios.put.mockResolvedValueOnce({ data: { id: '0df70f0e-5226-4a96-a578-d9d6b7758a22', priority: 7 } });

        render(
            <Router>
                <OperationRequestUpdate
                    operationRequest={mockOperationRequest}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(mockOnUpdateSuccess).toHaveBeenCalledWith({ id: '0df70f0e-5226-4a96-a578-d9d6b7758a22', priority: 7 });
        });

        expect(axios.put).toHaveBeenCalledWith(
            `https://localhost:5001/api/OperationRequest/${mockOperationRequest.id}`,
            {
                id: '0df70f0e-5226-4a96-a578-d9d6b7758a22',
                patientID: '12345',
                doctorID: '67890',
                operationTypeID: 'type1',
                deadlineDate: '2023-12-31',
                priority: 6,
            },
            {
                headers: { Authorization: `Bearer ${mockAuthToken}` },
            }
        );
    });

    test('displays an error message on update failure', async () => {
        axios.put.mockRejectedValueOnce(new Error('Failed to update operation request.'));

        render(
            <Router>
                <OperationRequestUpdate
                    operationRequest={mockOperationRequest}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText('Failed to update operation request.')).toBeInTheDocument();
        });

        expect(mockOnUpdateSuccess).not.toHaveBeenCalled();
    });

    test('navigates back to admin page on cancel', () => {
        render(
            <Router>
                <OperationRequestUpdate
                    operationRequest={mockOperationRequest}
                    authToken={mockAuthToken}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Router>
        );

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
});