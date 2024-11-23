import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from './Logout';

describe('Logout Component', () => {
    const originalLocation = window.location;

    beforeAll(() => {
        delete window.location;
        window.location = { href: '' }; // Mock window.location
    });

    afterAll(() => {
        window.location = originalLocation; // Restore the original location object
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'removeItem'); // Spy on localStorage.removeItem
    });

    test('removes authToken and userRole from localStorage', () => {
        render(<Logout />);

        expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('userRole');
    });

    test('redirects to the login page', () => {
        render(<Logout />);

        expect(window.location.href).toBe('/');
    });

    test('renders the logout spinner and message', () => {
        render(<Logout />);

        expect(screen.getByText('Logging out, please wait...')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Assuming spinner has role="progressbar"
    });
});
