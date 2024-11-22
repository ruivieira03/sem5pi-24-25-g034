import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page with welcome message and buttons', () => {
    render(<App />);

    expect(screen.getByText('Welcome to the Healthcare Application')).toBeInTheDocument();
    expect(screen.getByText('Please choose an option:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register as Patient/i })).toBeInTheDocument();
});
