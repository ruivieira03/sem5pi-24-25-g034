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
      cy.visit('/admin/allergies');
  
      // Verify the page loaded correctly
      cy.location('pathname').should('eq', '/admin/allergies');
    });
  
    it('fetches and displays the list of allergies', () => {
      cy.intercept('GET', '**/api/allergies', {
        statusCode: 200,
        body: {
          data: [
            { domainId: '1', name: 'Peanuts', description: 'Peanut allergy' },
            { domainId: '2', name: 'Gluten', description: 'Gluten allergy' },
          ],
        },
      }).as('fetchAllergies');
  
      cy.wait('@fetchAllergies');
      cy.contains('strong', 'Peanuts').should('exist');
      cy.contains('strong', 'Gluten').should('exist');
    });
  
    it('adds a new allergy', () => {
      cy.intercept('POST', '**/api/allergies', {
        statusCode: 201,
        body: { message: 'Allergy added successfully!' },
      }).as('addAllergy');
  
      cy.get('input[placeholder="Allergy Name"]').type('Dairy');
      cy.get('input[placeholder="Description"]').type('Dairy allergy');
      cy.get('.add-button').click();
  
      cy.wait('@addAllergy');
      cy.contains('Allergy added successfully!').should('exist');
    });
  
    it('updates an existing allergy', () => {
        const allergyId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
        const updatedData = {
          name: 'Peanuts',
          description: 'Updated description',
        };
      
        // Mock the GET request to fetch allergies
        cy.intercept('GET', '**/api/allergies', {
          statusCode: 200,
          body: {
            data: [
              { domainId: allergyId, name: 'Peanuts', description: 'Peanut allergy' },
            ],
          },
        }).as('fetchAllergies');
      
        // Mock the PUT request for updating an allergy
        cy.intercept('PUT', `**/api/allergies/${allergyId}`, {
          statusCode: 200,
          body: { message: 'Allergy updated successfully!' },
        }).as('updateAllergy');
      
        // Load the allergies
        cy.visit('/admin/allergies');
        cy.wait('@fetchAllergies');
      
        // Start the update process
        cy.get('.edit-button').first().click();
        cy.get('input[placeholder="Allergy Name"]').clear().type(updatedData.name);
        cy.get('input[placeholder="Description"]').clear().type(updatedData.description);
        cy.get('.update-button').click();
      
        // Wait for the update request and verify
        cy.wait('@updateAllergy').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
          expect(interception.request.body.name).to.eq(updatedData.name);
          expect(interception.request.body.description).to.eq(updatedData.description);
        });
      
        // Check for success message
        cy.contains('Allergy updated successfully!').should('exist');
      });
      
  
      it('deletes an allergy', () => {
        const allergyId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
      
        // Mock the GET request to fetch allergies
        cy.intercept('GET', '**/api/allergies', {
          statusCode: 200,
          body: {
            data: [
              { domainId: allergyId, name: 'Peanuts', description: 'Peanut allergy' },
            ],
          },
        }).as('fetchAllergies');
      
        // Mock the PATCH request for soft deleting an allergy
        cy.intercept('PATCH', `**/api/allergies/${allergyId}`, {
          statusCode: 200,
          body: { message: 'Allergy deleted successfully!' },
        }).as('deleteAllergy');
      
        // Load the allergies
        cy.visit('/admin/allergies');
        cy.wait('@fetchAllergies');
      
        // Start the delete process
        cy.get('.delete-button').first().click();
      
        // Wait for the delete request and verify
        cy.wait('@deleteAllergy').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
        });
      
        // Check for success message
        cy.contains('Allergy deleted successfully!').should('exist');
      });
      
  
    it('searches for an allergy by name', () => {
      cy.intercept('GET', '**/api/allergies/name/Peanuts', {
        statusCode: 200,
        body: { domainId: '1', name: 'Peanuts', description: 'Peanut allergy' },
      }).as('searchAllergy');
  
      cy.get('.search-section input').type('Peanuts');
      cy.get('.search-button').click();
  
      cy.wait('@searchAllergy');
      cy.contains('strong', 'Peanuts').should('exist');
      cy.get('.allergy-item').should('have.length', 1);
    });
  
    it('shows a message when no allergies are found', () => {
      cy.intercept('GET', '**/api/allergies/name/Unknown', {
        statusCode: 200,
        body: null,
      }).as('searchAllergy');
  
      cy.get('.search-section input').type('Unknown');
      cy.get('.search-button').click();
  
      cy.wait('@searchAllergy');
      cy.contains('No allergies found. Add a new one below.').should('exist');
    });
  });
  