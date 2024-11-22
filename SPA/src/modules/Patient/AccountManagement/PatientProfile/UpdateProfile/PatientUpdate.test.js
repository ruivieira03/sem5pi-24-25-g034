import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientUpdate from './PatientUpdate';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('PatientUpdate Component', () => {
    const mockNavigate = jest.fn();
    const mockSetProfileData = jest.fn();
    const mockSetError = jest.fn();
    const mockSetSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        const { useNavigate } = jest.requireMock('react-router-dom');
        useNavigate.mockReturnValue(mockNavigate);

        // Mock localStorage for authToken
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'authToken') {
                return 'mockAuthToken';
            }
            return null;
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const mockProfileData = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        emergencyContact: '9876543210',
    };

    test('updates profile on successful API call', async () => {
        axios.put.mockResolvedValueOnce({ data: mockProfileData });

        render(
            <MemoryRouter>
                <PatientUpdate
                    profileData={mockProfileData}
                    authToken="mockAuthToken"
                    setProfileData={mockSetProfileData}
                    setError={mockSetError}
                    setSuccess={mockSetSuccess}
                />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'Jane' } });
        fireEvent.click(screen.getByText('Update'));

        expect(axios.put).toHaveBeenCalledWith(
            'https://localhost:5001/api/account/update-profile',
            { ...mockProfileData, firstName: 'Jane' },
            { headers: { Authorization: 'Bearer mockAuthToken' } }
        );

        await waitFor(() => {
            expect(mockSetProfileData).toHaveBeenCalledWith(mockProfileData);
            expect(mockSetSuccess).toHaveBeenCalledWith('Profile updated successfully!');
        });
    });
});
