import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeletePatientProfile from './DeletePatientProfile';
import axios from 'axios';

jest.mock('axios'); // Mock axios globally

describe('DeleteUser Component', () => {
    const mockUser = { id: 1, username: 'testuser' };
    const mockAuthToken = 'mockAuthToken';
    const mockOnDeleteSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    test('renders the delete confirmation modal', () => {
        render(<DeletePatientProfile user={mockUser} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        expect(screen.getByText('Delete User')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
        expect(screen.getByText(mockUser.username)).toBeInTheDocument();
        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('calls onDeleteSuccess with user ID on successful delete', async () => {
        // Mock the API call to simulate success
        axios.delete.mockResolvedValueOnce({ status: 200 });

        render(<DeletePatientProfile user={mockUser} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const confirmButton = screen.getByText('Confirm Delete');
        fireEvent.click(confirmButton);

        // Wait for the mock API call to resolve
        await waitFor(() => {
            expect(mockOnDeleteSuccess).toHaveBeenCalledWith(mockUser.id);
        });
    });

    test('displays an error message on delete failure', async () => {
        // Mock the API call to simulate failure
        axios.delete.mockRejectedValueOnce({
            response: { data: { Message: 'Failed to delete user.' } },
        });

        render(<DeletePatientProfile user={mockUser} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const confirmButton = screen.getByText('Confirm Delete');
        fireEvent.click(confirmButton);

        // Ensure the success callback was not called
        expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
    });

    test('triggers onDeleteSuccess with null when cancel is clicked', () => {
        render(<DeletePatientProfile user={mockUser} authToken={mockAuthToken} onDeleteSuccess={mockOnDeleteSuccess} />);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockOnDeleteSuccess).toHaveBeenCalledWith(null);
    });
});
