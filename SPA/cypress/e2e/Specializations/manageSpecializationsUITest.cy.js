describe('Register User E2E Tests', () => {
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
        expect(role).to.eq('Admin'); // Adjust if needed based on your app's role logic
      });
  
      // Visit the admin registration page
      cy.visit('/admin/specializations');
  
      // Verify the page loaded correctly
      cy.location('pathname').should('eq', '/admin/specializations');
    });
  
    it('fetches and displays the list of specializations', () => {
      cy.intercept('GET', '**/api/specializations', {
        statusCode: 200,
        body: {
          data: [
            { domainId: '1', name: 'Psychiatry', description: 'Psychiatry specialization' },
            { domainId: '2', name: 'Neurology', description: 'Neurology specialization' },
          ],
        },
      }).as('fetchSpecializations');
  
      cy.wait('@fetchSpecializations');
      cy.contains('strong', 'Psychiatry').should('exist');
      cy.contains('strong', 'Neurology').should('exist');
    });
  
    it('adds a new specialization', () => {
      cy.intercept('POST', '**/api/specializations', {
        statusCode: 201,
        body: { message: 'Specialization added successfully!' },
      }).as('addSpecialization');
  
      cy.get('input[placeholder="Specialization Name"]').type('Radiology');
      cy.get('input[placeholder="Description"]').type('Radiology specialization');
      cy.get('.add-button').click();
  
      cy.wait('@addSpecialization');
      cy.contains('Specialization added successfully!').should('exist');
    });
  
    it('updates an existing specialization', () => {
        const specializationId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
        const updatedData = {
          name: 'Psychiatry',
          description: 'Updated description',
        };
      
        // Mock the GET request to fetch specializations
        cy.intercept('GET', '**/api/specializations', {
          statusCode: 200,
          body: {
            data: [
              { domainId: specializationId, name: 'Psychiatry', description: 'Psychiatry specialization' },
            ],
          },
        }).as('fetchSpecializations');
      
        // Mock the PUT request for updating an specialization
        cy.intercept('PUT', `**/api/specializations/${specializationId}`, {
          statusCode: 200,
          body: { message: 'Specialization updated successfully!' },
        }).as('updateSpecialization');
      
        // Load the specializations
        cy.visit('/admin/specializations');
        cy.wait('@fetchSpecializations');
      
        // Start the update process
        cy.get('.edit-button').first().click();
        cy.get('input[placeholder="Specialization Name"]').clear().type(updatedData.name);
        cy.get('input[placeholder="Description"]').clear().type(updatedData.description);
        cy.get('.update-button').click();
      
        // Wait for the update request and verify
        cy.wait('@updateSpecialization').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
          expect(interception.request.body.name).to.eq(updatedData.name);
          expect(interception.request.body.description).to.eq(updatedData.description);
        });
      
        // Check for success message
        cy.contains('Specialization updated successfully!').should('exist');
      });
      
  
      it('deletes an specialization', () => {
        const specializationId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
      
        // Mock the GET request to fetch specializations
        cy.intercept('GET', '**/api/specializations', {
          statusCode: 200,
          body: {
            data: [
              { domainId: specializationId, name: 'Psychiatry', description: 'Psychiatry specialization' },
            ],
          },
        }).as('fetchSpecializations');
      
        // Mock the PATCH request for soft deleting an specialization
        cy.intercept('PATCH', `**/api/specializations/${specializationId}`, {
          statusCode: 200,
          body: { message: 'Specialization deleted successfully!' },
        }).as('deleteSpecialization');
      
        // Load the specializations
        cy.visit('/admin/specializations');
        cy.wait('@fetchSpecializations');
      
        // Start the delete process
        cy.get('.delete-button').first().click();
      
        // Wait for the delete request and verify
        cy.wait('@deleteSpecialization').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
        });
      
        // Check for success message
        cy.contains('Specialization deleted successfully!').should('exist');
      });
      
  
    it('searches for an specialization by name', () => {
      cy.intercept('GET', '**/api/specializations/name/Psychiatry', {
        statusCode: 200,
        body: { domainId: '1', name: 'Psychiatry', description: 'Psychiatry specialization' },
      }).as('searchSpecialization');
  
      cy.get('.search-section input').type('Psychiatry');
      cy.get('.search-button').click();
  
      cy.wait('@searchSpecialization');
      cy.contains('strong', 'Psychiatry').should('exist');
      cy.get('.specialization-item').should('have.length', 1);
    });
  
    it('shows a message when no specializations are found', () => {
      cy.intercept('GET', '**/api/specializations/name/Unknown', {
        statusCode: 200,
        body: null,
      }).as('searchSpecialization');
  
      cy.get('.search-section input').type('Unknown');
      cy.get('.search-button').click();
  
      cy.wait('@searchSpecialization');
      cy.contains('No specializations found. Add a new one below.').should('exist');
    });
  });
  