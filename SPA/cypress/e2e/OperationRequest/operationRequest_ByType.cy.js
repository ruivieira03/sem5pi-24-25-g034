describe('Operation Request By Type E2E Tests', () => {
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

        // Visit the Operation Request By Type page
        cy.visit('/admin/operation-request-by-type');
        cy.location('pathname').should('eq', '/admin/operation-request-by-type');
    });

    it('fetches and displays operation request details for a valid operation type ID', () => {
        // Mock the API response for a valid operation type ID
        cy.intercept('GET', '**/api/OperationRequest/type/type123', {
            statusCode: 200,
            body: [
                {
                    id: '123',
                    patientID: 'patient123',
                    doctorID: 'doctor123',
                    operationTypeID: 'type123',
                    deadlineDate: '2023-12-31T00:00:00Z',
                    priority: 1,
                },
                {
                    id: '124',
                    patientID: 'patient124',
                    doctorID: 'doctor124',
                    operationTypeID: 'type123',
                    deadlineDate: '2023-11-30T00:00:00Z',
                    priority: 2,
                },
            ],
        }).as('fetchOperationRequests');

        // Input a valid operation type ID and fetch operation request details
        cy.get('input#operationTypeId').type('type123');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the operation request details are displayed
        cy.wait('@fetchOperationRequests');
        cy.contains('Operation Request Details').should('be.visible');
        cy.contains('ID: 123').should('be.visible');
        // cy.contains('ID: 124').should('be.visible');
        cy.contains('Patient ID: patient123').should('be.visible');
        // cy.contains('Patient ID: patient124').should('be.visible');
        cy.contains('Doctor ID: doctor123').should('be.visible');
        // cy.contains('Doctor ID: doctor124').should('be.visible');
        cy.contains('Operation Type ID: type123').should('be.visible');
        cy.contains('Deadline Date: 31/12/2023').should('be.visible');
        // cy.contains('Deadline Date: 30/11/2023').should('be.visible');
        cy.contains('Priority: 1').should('be.visible');
        // cy.contains('Priority: 2').should('be.visible');
    });

    it('shows "Operation request not found" for an invalid operation type ID', () => {
        // Mock the API response for an invalid operation type ID
        cy.intercept('GET', '**/api/OperationRequest/type/invalid-type', {
            statusCode: 404,
        }).as('fetchOperationRequestNotFound');

        // Input an invalid operation type ID and fetch operation request details
        cy.get('input#operationTypeId').type('invalid-type');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the error message is displayed
        cy.wait('@fetchOperationRequestNotFound');
        cy.contains('Operation request not found.').should('be.visible');
    });

    it('shows an error message when no operation type ID is entered', () => {
        // Click the "Fetch Request" button without entering an operation type ID
        cy.contains('button', 'Fetch Request').click();

        // Verify the error message is displayed
        cy.contains('Please provide a valid operation type ID.').should('be.visible');
    });

    it('shows a generic error message for server errors', () => {
        // Mock a 500 Internal Server Error response
        cy.intercept('GET', '**/api/OperationRequest/type/servererror', {
            statusCode: 500,
            body: { message: 'Internal server error' },
        }).as('fetchOperationRequestServerError');

        // Input an operation type ID that triggers a server error and fetch operation request details
        cy.get('input#operationTypeId').type('servererror');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the generic error message is displayed
        cy.wait('@fetchOperationRequestServerError');
        cy.contains('An error occurred while fetching operation request details.').should('be.visible');
    });
});