import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeletePatientProfile from './DeletePatientProfile';
import axios from 'axios';

jest.mock('axios');

describe('DeletePatientProfile Component', () => {
    const mockPatient = { id: 1, firstName: 'Bernardo' };
    const mockAuthToken = 'mockAuthToken';
    const mockOnDeleteSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    test('renders the delete confirmation modal', () => {
        render(
            <DeletePatientProfile
                Patient={mockPatient}
                authToken={mockAuthToken}
                onDeleteSuccess={mockOnDeleteSuccess}
            />
        );

        expect(screen.getByText('Delete Patient')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
        // Use a regular expression to find the name within the content
        expect(screen.getByText((content, element) => {
            return content.includes(mockPatient.firstName);
        })).toBeInTheDocument();
        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('calls delete API and notifies on success', async () => {
        axios.delete.mockResolvedValueOnce({ status: 200 });

        render(
            <DeletePatientProfile
                Patient={mockPatient}
                authToken={mockAuthToken}
                onDeleteSuccess={mockOnDeleteSuccess}
            />
        );

        fireEvent.click(screen.getByText('Confirm Delete'));

        expect(screen.getByText('Deleting...')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockOnDeleteSuccess).toHaveBeenCalledWith(mockPatient.id);
        });

        expect(axios.delete).toHaveBeenCalledWith(
            `https://localhost:5001/api/Patient/delete/${mockPatient.id}`,
            expect.objectContaining({
                headers: { Authorization: `Bearer ${mockAuthToken}` },
            })
        );
    });

    test('displays error when delete API fails', async () => {
        axios.delete.mockRejectedValueOnce(new Error('Delete failed'));

        render(
            <DeletePatientProfile
                Patient={mockPatient}
                authToken={mockAuthToken}
                onDeleteSuccess={mockOnDeleteSuccess}
            />
        );

        fireEvent.click(screen.getByText('Confirm Delete'));

        await waitFor(() => {
            expect(
                screen.getByText('An error occurred while deleting the profile.')
            ).toBeInTheDocument();
        });

        expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
    });

    test('displays error when patient data is invalid', () => {
        render(
            <DeletePatientProfile
                Patient={null}
                authToken={mockAuthToken}
                onDeleteSuccess={mockOnDeleteSuccess}
            />
        );

        fireEvent.click(screen.getByText('Confirm Delete'));

        expect(screen.getByText('Invalid Patient data.')).toBeInTheDocument();
        expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
    });

    test('cancels delete operation', () => {
        render(
            <DeletePatientProfile
                Patient={mockPatient}
                authToken={mockAuthToken}
                onDeleteSuccess={mockOnDeleteSuccess}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnDeleteSuccess).toHaveBeenCalledWith(null);
    });
});
