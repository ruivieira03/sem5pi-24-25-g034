describe('User List E2E Tests', () => {
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
  
      // Mock the API response for fetching users
      cy.intercept('GET', '**/api/SystemUser', {
        statusCode: 200,
        body: [
          { id: 1, username: 'testuser1', role: 'Doctor' },
          { id: 2, username: 'adminuser', role: 'Admin' },
        ],
      }).as('fetchUsers');
  
      // Visit the User List page
      cy.visit('/admin/user-list');
  
      // Ensure the page loads correctly
      cy.location('pathname').should('eq', '/admin/user-list');
  
      // Wait for the users to load
      cy.wait('@fetchUsers');
    });
  
    it('deletes a user successfully', () => {
        // Mock the DELETE API response
        cy.intercept('DELETE', '**/api/SystemUser/1/hard', {
          statusCode: 200,
        }).as('deleteUser');
      
        // Click the Delete button for the first user
        cy.contains('Username: testuser1')
          .parents('.user-item') // Locate the user's parent container
          .find('.delete', { timeout: 10000 }) // Find the Delete button
          .click();
      
        // Interact with the confirmation modal
        cy.get('.modal').within(() => {
          cy.contains('Confirm Delete').click(); // Click the "Confirm Delete" button
        });
      
        // Confirm the Delete action
        cy.wait('@deleteUser'); // Wait for the DELETE API call
      
        // Verify the user is removed from the list
        cy.get('.user-item').should('have.length', 1); // Only one user should remain
        cy.contains('Username: testuser1').should('not.exist'); // Ensure deleted user is gone
      });           
  
    it('updates a user successfully', () => {
        // Mock the PUT API response
        cy.intercept('PUT', '**/api/SystemUser/1', {
          statusCode: 200,
          body: { id: 1, username: 'updateduser', role: 'Admin' }, // Updated data
        }).as('updateUser');
      
        // Listen for the alert and verify its message
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.eq('User updated successfully.');
        });
      
        // Click the Update button for the first user
        cy.contains('Username: testuser1')
          .parents('.user-item') // Adjusted to use `.user-item` as parent
          .find('.update', { timeout: 10000 }) // Ensure the button is visible
          .click();
      
        // Simulate the Update modal actions
        cy.get('.modal').within(() => {
          cy.get('input[name="username"]').clear().type('updateduser');
          cy.get('input[name="role"]').clear().type('Admin');
          cy.contains('button', 'Update').click(); // Assuming there's a "Save" button in the modal
        });
      
        // Confirm the Update action
        cy.wait('@updateUser');
      
        // Verify that the user is updated in the list
        cy.contains('Username: updateduser').should('be.visible'); // Ensure the updated username appears
        cy.contains('Role: Admin').should('be.visible'); // Ensure the updated role appears
      });      
      
  
    it('displays the user list', () => {
      // Verify the users are displayed
      cy.contains('h2', 'System Users').should('be.visible');
      cy.get('.user-item').should('have.length', 2); // Ensure two users are displayed
      cy.contains('Username: testuser1').should('be.visible');
      cy.contains('Username: adminuser').should('be.visible');
    });
  
    it('displays "No users found" when the user list is empty', () => {
      // Mock the API response for an empty user list
      cy.intercept('GET', '**/api/SystemUser', {
        statusCode: 200,
        body: [],
      }).as('fetchEmptyUsers');
  
      // Wait for the API call
      cy.visit('/admin/user-list');
      cy.wait('@fetchEmptyUsers');
  
      // Verify the message
      cy.contains('No users found.').should('be.visible');
    });
  });
  