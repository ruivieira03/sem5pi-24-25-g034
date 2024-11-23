import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for Router context
import axios from 'axios';
import OperationRequestList from './OperationRequestList';

jest.mock('axios');

describe('OperationRequestList Component', () => {
    const mockOperationRequests = [
        {
            id: '1',
            patientID: 'PatientOne',
            doctorID: 'DoctorOne',
            operationTypeID: 'TypeOne',
            deadlineDate: '2023-12-31',
            priority: 1,
        },
        {
            id: '2',
            patientID: 'PatientTwo',
            doctorID: 'DoctorTwo',
            operationTypeID: 'TypeTwo',
            deadlineDate: '2023-11-30',
            priority: 2,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('authToken', 'mockAuthToken');
    });

    test('renders loading state initially', () => {
        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );
        expect(screen.getByText('Loading operation requests...')).toBeInTheDocument();
    });

    test('displays operation requests after successful fetch', async () => {
        axios.get.mockResolvedValueOnce({ data: mockOperationRequests });

        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Operation Requests')).toBeInTheDocument();
            expect(screen.getByText('PatientOne')).toBeInTheDocument();
            expect(screen.getByText('PatientTwo')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith('https://localhost:5001/api/OperationRequest/', {
            headers: { Authorization: 'Bearer mockAuthToken' },
        });
    });

    test('displays an error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Error fetching operation requests.')).toBeInTheDocument();
        });
    });

    test('handles delete operation request interaction', async () => {
        axios.get.mockResolvedValueOnce({ data: mockOperationRequests });

        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('PatientOne')).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Delete Operation Request')).toBeInTheDocument();
        });
    });

    test('handles update operation request interaction', async () => {
        axios.get.mockResolvedValueOnce({ data: mockOperationRequests });

        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('PatientOne')).toBeInTheDocument();
        });

        const updateButton = screen.getAllByText('Update')[0];
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText('Update Operation Request')).toBeInTheDocument();
        });
    });

    test('displays "No operation requests found" when the list is empty', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <OperationRequestList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('No operation requests found.')).toBeInTheDocument();
        });
    });
});