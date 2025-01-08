describe('Specializations Management E2E Tests', () => {
    let specializationId;

    beforeEach(() => {
        // Log in as the admin user
        cy.request('POST', 'https://localhost:5001/api/account/login', {
            username: 'adminUser',
            password: 'SEM5pi1234@',
        }).then((response) => {
            expect(response.status).to.eq(200);

            const token = response.body.token; // Extract the token from the response
            const role = response.body.role;   // Extract the role from the response

            // Store token and role in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', role);

            // Assert the role is admin
            expect(role).to.eq('Admin');
        });

        // Visit the admin specializations page
        cy.visit('/admin/specializations');
        cy.location('pathname').should('eq', '/admin/specializations');
    });

    it('adds a new specialization', () => {
        cy.get('input[placeholder="Specialization Name"]').type('Test Specialization');
        cy.get('input[placeholder="Description"]').type('Description for test specialization');
        cy.get('.add-button').click();

        // Verify the new specialization is displayed and store its ID
        cy.contains('strong', 'Test Specialization')
            .should('exist')
            .parents('.specialization-item')
            .invoke('attr', 'data-id')
            .then((id) => {
                specializationId = id;
            });
    });

    it('searches for the newly added specialization by name', () => {
        cy.get('.search-section input').type('Test Specialization');
        cy.get('.search-button').click();

        // Verify search results
        cy.contains('strong', 'Test Specialization').should('exist');
        cy.get('.specialization-item').should('have.length', 1);
    });

    it('updates the newly added specialization', () => {
        // Search for the specialization
        cy.get('.search-section input').type('Test Specialization');
        cy.get('.search-button').click();
    
        // Ensure the specialization is found and click the Edit button
        cy.contains('strong', 'Test Specialization')
            .should('exist')
            .parents('.specialization-item')
            .within(() => {
                cy.get('.edit-button').click(); // Click on the Edit button
            });
    
        // Update fields in the "Update Specialization" section
        cy.get('.update-section') // Target the update section container
            .within(() => {
                cy.get('input').eq(0).clear().type('Updated Test Specialization'); // Update name
                cy.get('input').eq(1).clear().type('Updated description for test specialization'); // Update description
                cy.get('.update-button').click(); // Click on the Update button
            });
    
        // Verify that the updates are reflected in the specialization list
        cy.contains('strong', 'Updated Test Specialization').should('exist');
        cy.contains('Updated description for test specialization').should('exist');
    });

    it('updates the newly updated specialization', () => {
        // Search for the specialization
        cy.get('.search-section input').type('Updated Test Specialization');
        cy.get('.search-button').click();
    
        // Ensure the specialization is found and click the Edit button
        cy.contains('strong', 'Updated Test Specialization')
            .should('exist')
            .parents('.specialization-item')
            .within(() => {
                cy.get('.edit-button').click(); // Click on the Edit button
            });
    
        // Update fields in the "Update Specialization" section
        cy.get('.update-section') // Target the update section container
            .within(() => {
                cy.get('input').eq(0).clear().type('Test Specialization'); // Update name
                cy.get('input').eq(1).clear().type('Description for test specialization'); // Update description
                cy.get('.update-button').click(); // Click on the Update button
            });
    
        // Verify that the updates are reflected in the specialization list
        cy.contains('strong', 'Test Specialization').should('exist');
        cy.contains('Description for test specialization').should('exist');
    });
    
    it('deletes the newly added specialization', () => {
        // Search for the specialization by its updated name
        cy.get('.search-section input').type('Test Specialization');
        cy.get('.search-button').click();
    
        // Ensure the specialization is found before attempting to delete it
        cy.contains('strong', 'Test Specialization')
            .should('exist')
            .parents('.specialization-item')
            .within(() => {
                // Click the Delete button
                cy.get('.delete-button').click();
            });
    
        // Confirm the specialization is deleted
        cy.contains('Specialization deleted successfully!').should('exist'); // Verify notification
        cy.contains('Test Specialization').should('not.exist'); // Verify item no longer exists
    });
    
    it('searches for the deleted specialization to verify it no longer exists', () => {
        cy.get('.search-section input').type('Updated Test Specialization');
        cy.get('.search-button').click();

        // Verify the "no results" message is displayed
        cy.contains('No specializations found. Add a new one below.').should('exist');
    });

    it('fetches and displays the list of remaining specializations', () => {
        cy.get('.specialization-list').should('exist');
        cy.get('.specialization-item').should('have.length.greaterThan', 0);
    });
});