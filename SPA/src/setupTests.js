// Import additional matchers for Jest from React Testing Library
import '@testing-library/jest-dom';

// Mock Axios Globally
jest.mock('axios', () => ({
    delete: jest.fn(), // Mock the `delete` method
    get: jest.fn(),    // Mock the `get` method (optional, for other components)
    post: jest.fn(),   // Mock the `post` method (optional, for other components)
    put: jest.fn(),    // Mock the `put` method (optional, for other components)
}));

// Suppress console warnings and errors during tests
const originalError = console.error;
console.error = (...args) => {
    // Ignore specific React Testing Library act warnings
    if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
    }
    originalError.call(console, ...args);
};

const originalWarn = console.warn;
console.warn = (...args) => {
    // Ignore React Router Future Flag Warnings
    if (/React Router Future Flag Warning/.test(args[0])) {
        return;
    }
    originalWarn.call(console, ...args);
};

// Mock React Router's `useNavigate`
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

// Global Cleanup for Jest
afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
});

// Mock Window and Global Objects (e.g., localStorage)
global.localStorage = {
    getItem: jest.fn(() => 'mockAuthToken'), // Mock retrieval of auth token
    setItem: jest.fn(),
    removeItem: jest.fn(),
};
