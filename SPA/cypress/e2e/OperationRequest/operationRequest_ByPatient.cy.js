describe('Operation Request By Patient E2E Tests', () => {
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

        // Visit the Operation Request By Patient page
        cy.visit('/admin/operation-request-by-patient');
        cy.location('pathname').should('eq', '/admin/operation-request-by-patient');
    });

    it('fetches and displays operation request details for a valid patient ID', () => {
        // Mock the API response for a valid patient ID
        cy.intercept('GET', '**/api/OperationRequest/patient/patient123', {
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
                    patientID: 'patient123',
                    doctorID: 'doctor124',
                    operationTypeID: 'type124',
                    deadlineDate: '2023-11-30T00:00:00Z',
                    priority: 2,
                },
            ],
        }).as('fetchOperationRequests');

        // Input a valid patient ID and fetch operation request details
        cy.get('input#patientId').type('patient123');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the operation request details are displayed
        cy.wait('@fetchOperationRequests');
        cy.contains('Operation Request Details').should('be.visible');
        cy.contains('ID: 123').should('be.visible');
        // cy.contains('ID: 124').should('be.visible');
        cy.contains('Patient ID: patient123').should('be.visible');
        cy.contains('Doctor ID: doctor123').should('be.visible');
        // cy.contains('Doctor ID: doctor124').should('be.visible');
        cy.contains('Operation Type ID: type123').should('be.visible');
        // cy.contains('Operation Type ID: type124').should('be.visible');
        cy.contains('Deadline Date: 31/12/2023').should('be.visible');
        // cy.contains('Deadline Date: 30/11/2023').should('be.visible');
        cy.contains('Priority: 1').should('be.visible');
        // cy.contains('Priority: 2').should('be.visible');
    });

    it('shows "Operation request not found" for an invalid patient ID', () => {
        // Mock the API response for an invalid patient ID
        cy.intercept('GET', '**/api/OperationRequest/patient/invalid-id', {
            statusCode: 404,
        }).as('fetchOperationRequestNotFound');

        // Input an invalid patient ID and fetch operation request details
        cy.get('input#patientId').type('invalid-id');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the error message is displayed
        cy.wait('@fetchOperationRequestNotFound');
        cy.contains('Operation request not found.').should('be.visible');
    });

    it('shows an error message when no patient ID is entered', () => {
        // Click the "Fetch Request" button without entering a patient ID
        cy.contains('button', 'Fetch Request').click();

        // Verify the error message is displayed
        cy.contains('Please provide a valid patient ID.').should('be.visible');
    });

    it('shows a generic error message for server errors', () => {
        // Mock a 500 Internal Server Error response
        cy.intercept('GET', '**/api/OperationRequest/patient/servererror', {
            statusCode: 500,
            body: { message: 'Internal server error' },
        }).as('fetchOperationRequestServerError');

        // Input a patient ID that triggers a server error and fetch operation request details
        cy.get('input#patientId').type('servererror');
        cy.contains('button', 'Fetch Request').click();

        // Wait for the API call and verify the generic error message is displayed
        cy.wait('@fetchOperationRequestServerError');
        cy.contains('An error occurred while fetching operation request details.').should('be.visible');
    });
});