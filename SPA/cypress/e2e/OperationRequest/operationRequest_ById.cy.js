describe('Operation Request By ID E2E Tests', () => {
    beforeEach(() => {
        // Log in as an admin user
        cy.request('POST', 'https://10.9.22.94:5001/api/account/login', {
            username: 'adminUser',
            password: 'SEM5pi1234@',
        }).then((response) => {
            expect(response.status).to.eq(200);

            const token = response.body.token;
            const role = response.body.role;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', role);

            expect(role).to.eq('Admin'); // Ensure the role is admin
        });

        // Visit the Operation Request By ID page
        cy.visit('/operation-request/:id');
        cy.location('pathname').should('eq', '/operation-request/:id');
    });

    it('fetches and displays operation request details for a valid ID', () => {
        // Mock the API response for a valid operation request ID
        cy.intercept('GET', '**/api/OperationRequest/123', {
            statusCode: 200,
            body: {
                id: '123',
                patientID: 'patient123',
                doctorID: 'doctor123',
                operationTypeID: 'type123',
                deadlineDate: '2023-12-31T00:00:00Z',
                priority: 1,
            },
        }).as('fetchRequest');

        // Input a valid operation request ID and fetch details
        cy.get('input#requestId').type('123');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the operation request details are displayed
        cy.wait('@fetchRequest');
        cy.contains('Operation Request Details').should('be.visible');
        cy.contains('ID: 123').should('be.visible');
        cy.contains('Patient ID: patient123').should('be.visible');
        cy.contains('Doctor ID: doctor123').should('be.visible');
        cy.contains('Operation Type ID: type123').should('be.visible');
        cy.contains('Deadline Date: 12/31/2023').should('be.visible');
        cy.contains('Priority: 1').should('be.visible');
    });

    it('shows "Operation request not found" for an invalid ID', () => {
        // Mock the API response for an invalid operation request ID
        cy.intercept('GET', '**/api/OperationRequest/invalid-id', {
            statusCode: 404,
        }).as('fetchRequestNotFound');

        // Input an invalid operation request ID and fetch details
        cy.get('input#requestId').type('invalid-id');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the error message is displayed
        cy.wait('@fetchRequestNotFound');
        cy.contains('Operation request not found.').should('be.visible');
    });

    it('shows an error message when no ID is entered', () => {
        // Click the "Fetch Request" button without entering an ID
        cy.contains('button', 'Fetch Request').click();

        // Verify the error message is displayed
        cy.contains('Please provide a valid operation request ID.').should('be.visible');
    });

    it('shows a generic error message for server errors', () => {
        // Mock a 500 Internal Server Error response
        cy.intercept('GET', '**/api/OperationRequest/servererror', {
            statusCode: 500,
            body: { message: 'Internal server error' },
        }).as('fetchRequestServerError');

        // Input an ID that triggers a server error and fetch details
        cy.get('input#requestId').type('servererror');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the generic error message is displayed
        cy.wait('@fetchRequestServerError');
        cy.contains('An error occurred while fetching operation request details.').should('be.visible');
    });
});