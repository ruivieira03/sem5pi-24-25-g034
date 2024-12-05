describe('Operation Request Create E2E Tests', () => {
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

        // Visit the Operation Request Create page
        cy.visit('/admin/operation-request-create');
        cy.location('pathname').should('eq', '/admin/operation-request-create');
    });

    it('creates an operation request successfully', () => {
        // Mock the API response for creating an operation request
        cy.intercept('POST', '**/api/OperationRequest/create', {
            statusCode: 201,
            body: {
                id: '123',
                patientID: 'patient123',
                doctorID: 'doctor123',
                operationTypeID: 'type123',
                deadlineDate: '2023-12-31T00:00:00Z',
                priority: 1,
            },
        }).as('createOperationRequest');

        // Fill in the form and submit
        cy.get('input#patientID').type('patient123');
        cy.get('input#doctorID').type('doctor123');
        cy.get('input#operationTypeID').type('type123');
        cy.get('input#deadlineDate').type('2023-12-31');
        cy.get('input#priority').type('1');
        cy.contains('button', 'Create').click();

        // Wait for the API call and verify the success message is displayed
        cy.wait('@createOperationRequest');
        cy.contains('Operation request created successfully!').should('be.visible');

        // Verify the form is reset
        cy.get('input#patientID').should('have.value', '');
        cy.get('input#doctorID').should('have.value', '');
        cy.get('input#operationTypeID').should('have.value', '');
        cy.get('input#deadlineDate').should('have.value', '');
        cy.get('input#priority').should('have.value', '');
    });

    it('shows an error message when the creation fails', () => {
        // Mock the API response for a failed creation
        cy.intercept('POST', '**/api/OperationRequest/create', {
            statusCode: 500,
            body: { message: 'Internal server error' },
        }).as('createOperationRequestError');

        // Fill in the form and submit
        cy.get('input#patientID').type('patient123');
        cy.get('input#doctorID').type('doctor123');
        cy.get('input#operationTypeID').type('type123');
        cy.get('input#deadlineDate').type('2023-12-31');
        cy.get('input#priority').type('1');
        cy.contains('button', 'Create').click();

        // Wait for the API call and verify the error message is displayed
        cy.wait('@createOperationRequestError');
        cy.contains('Failed to create operation request.').should('be.visible');
    });

    it('shows validation errors when required fields are missing', () => {
        // Try to submit the form without filling in any fields
        cy.contains('button', 'Create').click();

        // Verify the validation error messages are displayed
        cy.get('input#patientID:invalid').should('exist');
        cy.get('input#doctorID:invalid').should('exist');
        cy.get('input#operationTypeID:invalid').should('exist');
        cy.get('input#deadlineDate:invalid').should('exist');
        cy.get('input#priority:invalid').should('exist');
    });
});