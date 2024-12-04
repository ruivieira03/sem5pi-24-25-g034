describe('User Details E2E Tests', () => {
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
  
      // Visit the User Details page
      cy.visit('/admin/user-details/:username');
      cy.location('pathname').should('eq', '/admin/user-details/:username');
    });
  
    it('fetches and displays user details for a valid username', () => {
      // Mock the API response for a valid username
      cy.intercept('GET', '**/api/SystemUser/username/validuser', {
        statusCode: 200,
        body: {
          username: 'validuser',
          email: 'validuser@example.com',
          role: 'Doctor',
          phoneNumber: '1234567890',
        },
      }).as('fetchUser');
  
      // Input a valid username and fetch user details
      cy.get('input#userUsername').type('validuser');
      cy.contains('button', 'Fetch User').click();
  
      // Wait for the API call and verify the user details are displayed
      cy.wait('@fetchUser');
      cy.contains('User Details').should('be.visible');
      cy.contains('Username: validuser').should('be.visible');
      cy.contains('Email: validuser@example.com').should('be.visible');
      cy.contains('Role: Doctor').should('be.visible');
      cy.contains('Phone Number: 1234567890').should('be.visible');
    });
  
    it('shows "User not found" for an invalid username', () => {
      // Mock the API response for an invalid username
      cy.intercept('GET', '**/api/SystemUser/username/invaliduser', {
        statusCode: 404,
      }).as('fetchUserNotFound');
  
      // Input an invalid username and fetch user details
      cy.get('input#userUsername').type('invaliduser');
      cy.contains('button', 'Fetch User').click();
  
      // Wait for the API call and verify the error message is displayed
      cy.wait('@fetchUserNotFound');
      cy.contains('User not found.').should('be.visible');
    });
  
    it('shows an error message when no username is entered', () => {
      // Click the "Fetch User" button without entering a username
      cy.contains('button', 'Fetch User').click();
  
      // Verify the error message is displayed
      cy.contains('Please provide a valid username.').should('be.visible');
    });
  
    it('shows a generic error message for server errors', () => {
      // Mock a 500 Internal Server Error response
      cy.intercept('GET', '**/api/SystemUser/username/servererror', {
        statusCode: 500,
        body: { message: 'Internal server error' },
      }).as('fetchUserServerError');
  
      // Input a username that triggers a server error and fetch user details
      cy.get('input#userUsername').type('servererror');
      cy.contains('button', 'Fetch User').click();
  
      // Wait for the API call and verify the generic error message is displayed
      cy.wait('@fetchUserServerError');
      cy.contains('An error occurred while fetching user details.').should('be.visible');
    });
  });
  