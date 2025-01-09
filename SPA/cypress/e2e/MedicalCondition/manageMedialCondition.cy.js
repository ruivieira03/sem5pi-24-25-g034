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
    cy.visit('/admin/medicalConditions');

    // Verify the page loaded correctly
    cy.location('pathname').should('eq', '/admin/medicalConditions');
  });

  it('fetches and displays the list of medicalConditions', () => {
    cy.intercept('GET', '**/api/medicalConditions', {
      statusCode: 200,
      body: {
        data: [
          { domainId: '1', name: 'Peanuts', description: 'Peanut medicalCondition' },
          { domainId: '2', name: 'Gluten', description: 'Gluten medicalCondition' },
        ],
      },
    }).as('fetchMedicalConditions');

    cy.wait('@fetchMedicalConditions');
    cy.contains('strong', 'Peanuts').should('exist');
    cy.contains('strong', 'Gluten').should('exist');
  });

  it('adds a new medicalCondition', () => {
    cy.intercept('POST', '**/api/medicalConditions', {
      statusCode: 201,
      body: { message: 'MedicalCondition added successfully!' },
    }).as('addMedicalCondition');

    cy.get('input[placeholder="MedicalCondition Name"]').type('Dairy');
    cy.get('input[placeholder="Description"]').type('Dairy medicalCondition');
    cy.get('.add-button').click();

    cy.wait('@addMedicalCondition');
    cy.contains('MedicalCondition added successfully!').should('exist');
  });

  it('updates an existing medicalCondition', () => {
      const medicalConditionId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
      const updatedData = {
        name: 'Peanuts',
        description: 'Updated description',
      };
    
      // Mock the GET request to fetch medicalConditions
      cy.intercept('GET', '**/api/medicalConditions', {
        statusCode: 200,
        body: {
          data: [
            { domainId: medicalConditionId, name: 'Peanuts', description: 'Peanut medicalCondition' },
          ],
        },
      }).as('fetchMedicalConditions');
    
      // Mock the PUT request for updating an medicalCondition
      cy.intercept('PUT', `**/api/medicalConditions/${medicalConditionId}`, {
        statusCode: 200,
        body: { message: 'MedicalCondition updated successfully!' },
      }).as('updateMedicalCondition');
    
      // Load the medicalConditions
      cy.visit('/admin/medicalConditions');
      cy.wait('@fetchMedicalConditions');
    
      // Start the update process
      cy.get('.edit-button').first().click();
      cy.get('input[placeholder="MedicalCondition Name"]').clear().type(updatedData.name);
      cy.get('input[placeholder="Description"]').clear().type(updatedData.description);
      cy.get('.update-button').click();
    
      // Wait for the update request and verify
      cy.wait('@updateMedicalCondition').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body.name).to.eq(updatedData.name);
        expect(interception.request.body.description).to.eq(updatedData.description);
      });
    
      // Check for success message
      cy.contains('MedicalCondition updated successfully!').should('exist');
    });
    

    it('deletes an medicalCondition', () => {
      const medicalConditionId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
    
      // Mock the GET request to fetch medicalConditions
      cy.intercept('GET', '**/api/medicalConditions', {
        statusCode: 200,
        body: {
          data: [
            { domainId: medicalConditionId, name: 'Peanuts', description: 'Peanut medicalCondition' },
          ],
        },
      }).as('fetchMedicalConditions');
    
      // Mock the PATCH request for soft deleting an medicalCondition
      cy.intercept('PATCH', `**/api/medicalConditions/${medicalConditionId}`, {
        statusCode: 200,
        body: { message: 'MedicalCondition deleted successfully!' },
      }).as('deleteMedicalCondition');
    
      // Load the medicalConditions
      cy.visit('/admin/medicalConditions');
      cy.wait('@fetchMedicalConditions');
    
      // Start the delete process
      cy.get('.delete-button').first().click();
    
      // Wait for the delete request and verify
      cy.wait('@deleteMedicalCondition').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    
      // Check for success message
      cy.contains('MedicalCondition deleted successfully!').should('exist');
    });
    

  it('searches for an medicalCondition by name', () => {
    cy.intercept('GET', '**/api/medicalConditions/name/Peanuts', {
      statusCode: 200,
      body: { domainId: '1', name: 'Peanuts', description: 'Peanut medicalCondition' },
    }).as('searchMedicalCondition');

    cy.get('.search-section input').type('Peanuts');
    cy.get('.search-button').click();

    cy.wait('@searchMedicalCondition');
    cy.contains('strong', 'Peanuts').should('exist');
    cy.get('.medicalCondition-item').should('have.length', 1);
  });

  it('shows a message when no medicalConditions are found', () => {
    cy.intercept('GET', '**/api/medicalConditions/name/Unknown', {
      statusCode: 200,
      body: null,
    }).as('searchMedicalCondition');

    cy.get('.search-section input').type('Unknown');
    cy.get('.search-button').click();

    cy.wait('@searchMedicalCondition');
    cy.contains('No medicalConditions found. Add a new one below.').should('exist');
  });
});
