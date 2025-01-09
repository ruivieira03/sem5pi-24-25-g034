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
    cy.visit('/admin/medicalCondition');

    // Verify the page loaded correctly
    cy.location('pathname').should('eq', '/admin/medicalCondition');
  });

  it('fetches and displays the list of medicalConditions', () => {
    cy.intercept('GET', '**/api/medicalConditions', {
      statusCode: 200,
      body: {
        data: [
          { domainId: '1', name: 'Psychiatry', description: 'Psychiatry medicalCondition' },
          { domainId: '2', name: 'Neurology', description: 'Neurology medicalCondition' },
        ],
      },
    }).as('fetchMedicalConditions');

    cy.wait('@fetchMedicalConditions');
    cy.contains('strong', 'Psychiatry').should('exist');
    cy.contains('strong', 'Neurology').should('exist');
  });

  it('adds a new medicalCondition', () => {
    cy.intercept('POST', '**/api/medicalConditions', {
      statusCode: 201,
      body: { message: 'MedicalConditions added successfully!' },
    }).as('addMedicalConditions');

    cy.get('input[placeholder="Medical Condition Name"]').type('Radiology');
    cy.get('input[placeholder="Description"]').type('Radiology medicalCondition');
    cy.get('.add-button').click();

    cy.wait('@addMedicalConditions');
  });

  it('updates an existing medicalCondition', () => {
      const medicalConditionId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
      const updatedData = {
        name: 'Psychiatry',
        description: 'Updated description',
      };
    
      // Mock the GET request to fetch medicalConditions
      cy.intercept('GET', '**/api/medicalConditions', {
        statusCode: 200,
        body: {
          data: [
            { domainId: medicalConditionId, name: 'Psychiatry', description: 'Psychiatry medicalCondition' },
          ],
        },
      }).as('fetchMedicalConditions');
    
      // Mock the PUT request for updating an medicalCondition
      cy.intercept('PUT', `**/api/medicalConditions/${medicalConditionId}`, {
        statusCode: 200,
        body: { message: 'MedicalConditions updated successfully!' },
      }).as('updateMedicalConditions');
    
      // Load the medicalConditions
      cy.visit('/admin/medicalCondition');
      cy.wait('@fetchMedicalConditions');
    
      // Start the update process
      cy.get('.edit-button').first().click();
      cy.get('input[placeholder="Medical Condition Name"]').clear().type(updatedData.name);
      cy.get('input[placeholder="Description"]').clear().type(updatedData.description);
      cy.get('.update-button').click();
    
      // Wait for the update request and verify
      cy.wait('@updateMedicalConditions').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body.name).to.eq(updatedData.name);
        expect(interception.request.body.description).to.eq(updatedData.description);
      });
    });
    

    it('deletes an medicalCondition', () => {
      const medicalConditionId = 'e75e60aa-8566-47e3-aa3d-e7aac31efbd6'; // Example domainId
    
      // Mock the GET request to fetch medicalConditions
      cy.intercept('GET', '**/api/medicalConditions', {
        statusCode: 200,
        body: {
          data: [
            { domainId: medicalConditionId, name: 'Psychiatry', description: 'Psychiatry medicalCondition' },
          ],
        },
      }).as('fetchMedicalConditions');
    
      // Mock the PATCH request for soft deleting an medicalCondition
      cy.intercept('PATCH', `**/api/medicalConditions/${medicalConditionId}`, {
        statusCode: 200,
        body: { message: 'MedicalConditions deleted successfully!' },
      }).as('deleteMedicalConditions');
    
      // Load the medicalConditions
      cy.visit('/admin/medicalCondition');
      cy.wait('@fetchMedicalConditions');
    
      // Start the delete process
      cy.get('.delete-button').first().click();
    
      // Wait for the delete request and verify
      cy.wait('@deleteMedicalConditions').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      }); 
    });
    

  it('searches for an medicalCondition by name', () => {
    cy.intercept('GET', '**/api/medicalConditions/name/Psychiatry', {
      statusCode: 200,
      body: { domainId: '1', name: 'Psychiatry', description: 'Psychiatry medicalCondition' },
    }).as('searchMedicalConditions');

    cy.get('.search-section input').type('Psychiatry');
    cy.get('.search-button').click();

    cy.wait('@searchMedicalConditions');
    cy.contains('strong', 'Psychiatry').should('exist');
    cy.get('.medical-condition-item').should('have.length', 1);
  });

  it('shows a message when no medicalConditions are found', () => {
    cy.intercept('GET', '**/api/medicalConditions/name/Unknown', {
      statusCode: 200,
      body: null,
    }).as('searchMedicalConditions');

    cy.get('.search-section input').type('Unknown');
    cy.get('.search-button').click();

    cy.wait('@searchMedicalConditions');
    cy.contains('No medical conditions found. Add a new one below.').should('exist');
  });
});
