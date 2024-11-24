import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OperationRequestDelete from './OperationRequestDelete';
import axios from 'axios';

jest.mock('axios'); // Mock axios globally

describe('OperationRequestDelete Component', () => {
    const mockOperationRequest = { id: '0df70f0e-5226-4a96-a578-d9d6b7758a22', patientID: '12345' };
    const mockAuthToken = 'mockAuthToken';
    const mockOnDeleteSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    test('renders the delete confirmation modal', () => {
        render(<OperationRequestDelete operationRequest={mockOperationRequest} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        expect(screen.getByText('Delete Operation Request')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete the operation request for/i)).toBeInTheDocument();
        expect(screen.getByText(mockOperationRequest.patientID)).toBeInTheDocument();
        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('calls onDeleteSuccess with operation request ID on successful delete', async () => {
        // Mock the API call to simulate success
        axios.delete.mockResolvedValueOnce({ status: 200 });

        render(<OperationRequestDelete operationRequest={mockOperationRequest} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const confirmButton = screen.getByText('Confirm Delete');
        fireEvent.click(confirmButton);

        // Wait for the mock API call to resolve
        await waitFor(() => {
            expect(mockOnDeleteSuccess).toHaveBeenCalledWith(mockOperationRequest.id);
        });
    });

    test('displays an error message on delete failure', async () => {
        // Mock the API call to simulate failure
        axios.delete.mockRejectedValueOnce({
            response: { data: { Message: 'Failed to delete operation request.' } },
        });

        render(<OperationRequestDelete operationRequest={mockOperationRequest} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const confirmButton = screen.getByText('Confirm Delete');
        fireEvent.click(confirmButton);

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Failed to delete operation request.')).toBeInTheDocument();
        });

        // Ensure the success callback was not called
        expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
    });

    test('triggers onDeleteSuccess with null when cancel is clicked', () => {
        render(<OperationRequestDelete operationRequest={mockOperationRequest} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockOnDeleteSuccess).toHaveBeenCalledWith(null);
    });
});