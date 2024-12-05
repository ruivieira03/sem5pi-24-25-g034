describe('Operation Request List E2E Tests', () => {
    beforeEach(() => {
        // Log in and set up localStorage with token and role
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

        // Mock the API response for fetching operation requests
        cy.intercept('GET', '**/api/OperationRequest', {
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
                    operationTypeID: 'type124',
                    deadlineDate: '2023-11-30T00:00:00Z',
                    priority: 2,
                },
            ],
        }).as('fetchOperationRequests');

        // Visit the Operation Request List page
        cy.visit('/operation-requests');

        // Ensure the page loads correctly
        cy.location('pathname').should('eq', '/operation-requests');

        // Wait for the operation requests to load
        cy.wait('@fetchOperationRequests');
    });

    it('deletes an operation request successfully', () => {
        // Mock the DELETE API response
        cy.intercept('DELETE', '**/api/OperationRequest/123', {
            statusCode: 200,
        }).as('deleteOperationRequest');

        // Debugging step: Ensure the operation requests are rendered
        cy.get('.operation-request-item').should('have.length', 2);

        // Click the Delete button for the first operation request
        cy.contains('Patient ID: patient123')
            .parents('.operation-request-item') // Locate the operation request's parent container
            .find('.delete', { timeout: 10000 }) // Find the Delete button
            .click();

        // Interact with the confirmation modal
        cy.get('.modal').within(() => {
            cy.contains('Confirm Delete').click(); // Click the "Confirm Delete" button
        });

        // Confirm the Delete action
        cy.wait('@deleteOperationRequest'); // Wait for the DELETE API call

        // Verify the operation request is removed from the list
        cy.get('.operation-request-item').should('have.length', 1); // Only one operation request should remain
        cy.contains('Patient ID: patient123').should('not.exist'); // Ensure deleted operation request is gone
    });

    it('updates an operation request successfully', () => {
        // Mock the PUT API response
        cy.intercept('PUT', '**/api/OperationRequest/123', {
            statusCode: 200,
            body: {
                id: '123',
                patientID: 'updatedPatient123',
                doctorID: 'updatedDoctor123',
                operationTypeID: 'updatedType123',
                deadlineDate: '2023-12-31T00:00:00Z',
                priority: 1,
            }, // Updated data
        }).as('updateOperationRequest');

        // Listen for the alert and verify its message
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq('Operation request updated successfully.');
        });

        // Click the Update button for the first operation request
        cy.contains('Patient ID: patient123')
            .parents('.operation-request-item') // Adjusted to use `.operation-request-item` as parent
            .find('.update', { timeout: 10000 }) // Ensure the button is visible
            .click();

        // Simulate the Update modal actions
        cy.get('.modal').within(() => {
            cy.get('input[name="patientID"]').clear().type('updatedPatient123');
            cy.get('input[name="doctorID"]').clear().type('updatedDoctor123');
            cy.get('input[name="operationTypeID"]').clear().type('updatedType123');
            cy.get('input[name="deadlineDate"]').clear().type('2023-12-31');
            cy.get('input[name="priority"]').clear().type('1');
            cy.contains('button', 'Update').click(); // Assuming there's a "Save" button in the modal
        });

        // Confirm the Update action
        cy.wait('@updateOperationRequest');

        // Verify that the operation request is updated in the list
        cy.contains('Patient ID: updatedPatient123').should('be.visible'); // Ensure the updated patient ID appears
        cy.contains('Doctor ID: updatedDoctor123').should('be.visible'); // Ensure the updated doctor ID appears
        cy.contains('Operation Type: updatedType123').should('be.visible'); // Ensure the updated operation type ID appears
        cy.contains('Deadline: 31/12/2023').should('be.visible'); // Ensure the updated deadline date appears
        cy.contains('Priority: 1').should('be.visible'); // Ensure the updated priority appears
    });

    it('displays the operation request list', () => {
        // Verify the operation requests are displayed
        cy.contains('h2', 'Operation Requests').should('be.visible');
        cy.get('.operation-request-item').should('have.length', 2); // Ensure two operation requests are displayed
        cy.contains('Patient ID: patient123').should('be.visible');
        cy.contains('Patient ID: patient124').should('be.visible');
    });

    it('displays "No operation requests found" when the operation request list is empty', () => {
        // Mock the API response for an empty operation request list
        cy.intercept('GET', '**/api/OperationRequest', {
            statusCode: 200,
            body: [],
        }).as('fetchEmptyOperationRequests');

        // Wait for the API call
        cy.visit('/operation-requests');
        cy.wait('@fetchEmptyOperationRequests');

        // Verify the message
        cy.contains('No operation requests found.').should('be.visible');
    });
});