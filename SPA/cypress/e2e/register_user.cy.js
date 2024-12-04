describe('Register User E2E Tests', () => {
  beforeEach(() => {
    // Log in as the admin user
    cy.request('POST', 'https://10.9.22.94:5001/api/account/login', {
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
    cy.visit('/admin/register-user');

    // Verify the page loaded correctly
    cy.location('pathname').should('eq', '/admin/register-user');
  });

  it('displays the registration form', () => {
    // Check for the form and its elements
    cy.contains('h2', 'Register New User').should('be.visible');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="phoneNumber"]').should('exist');
    cy.get('input[name="role"]').should('exist');
    cy.get('button[type="submit"]').should('exist').and('be.enabled');
  });

  it('registers a user successfully', () => {
    // Mock the successful registration API response
    cy.intercept('POST', '**/api/SystemUser', {
      statusCode: 201,
      body: { message: 'Registration successful! Please check your email for further instructions.' },
    }).as('registerUser');

    // Fill out the form and submit
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('input[name="role"]').type('Admin');
    cy.get('button[type="submit"]').click();

    // Wait for the API call and verify success
    cy.wait('@registerUser');
    cy.contains('Registration successful! Please check your email for further instructions.').should('be.visible');
  });

  it('shows an error message when registration fails', () => {
    // Mock a failed registration API response
    cy.intercept('POST', '**/api/SystemUser', {
      statusCode: 400,
      body: { message: 'Failed to register user.' },
    }).as('registerUser');

    // Fill out the form and submit
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('input[name="role"]').type('Admin');
    cy.get('button[type="submit"]').click();

    // Wait for the API call and verify error
    cy.wait('@registerUser');
    cy.contains('Failed to register user.').should('be.visible');
  });

  it('validates required fields', () => {
    // Attempt to submit the form without filling it
    cy.get('button[type="submit"]').click();

    // Check for validation errors
    cy.get('input[name="username"]:invalid').should('exist');
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="phoneNumber"]:invalid').should('exist');
    cy.get('input[name="role"]:invalid').should('exist');
  });
});
