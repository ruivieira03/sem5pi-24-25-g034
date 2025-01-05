describe('Patient Profile Details E2E Tests', () => {
    beforeEach(() => {
      // Login como admin
      cy.request('POST', 'https://localhost:5001/api/account/login', {
        username: 'adminUser',
        password: 'SEM5pi1234@',
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        const token = response.body.token;
        const role = response.body.role;
  
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
  
        expect(role).to.eq('Admin');
      });
  
      // Acessar a página de detalhes do paciente
      cy.visit('/admin/patient-details/:patientId');
      cy.location('pathname').should('include', '/admin/patient-details');
    });
  
    it('fetches and displays patient details for a valid ID', () => {
      // Mock da resposta da API para um ID válido
      cy.intercept('GET', '**/api/Patients/patientId/validpatient', {
        statusCode: 200,
        body: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          dateOfBirth: '1990-01-01',
          address: '123 Main Street',
        },
      }).as('fetchPatient');
  
      // Input de um ID válido
      cy.get('input#patientId').type('validpatient');
      cy.contains('button', 'Fetch Patient').click();
  
      // Verificar os detalhes do paciente
      cy.wait('@fetchPatient');
      cy.contains('Patient Details').should('be.visible');
      cy.contains('First Name: John').should('be.visible');
      cy.contains('Last Name: Doe').should('be.visible');
      cy.contains('Email: johndoe@example.com').should('be.visible');
      cy.contains('Phone Number: 1234567890').should('be.visible');
      cy.contains('Address: 123 Main Street').should('be.visible');
    });
  
    it('shows "Patient not found" for an invalid ID', () => {
      // Mock da API para ID inválido
      cy.intercept('GET', '**/api/Patients/patientId/invalidpatient', {
        statusCode: 404,
      }).as('fetchPatientNotFound');
  
      // Input de um ID inválido
      cy.get('input#patientId').type('invalidpatient');
      cy.contains('button', 'Fetch Patient').click();
  
      // Verificar a mensagem de erro
      cy.wait('@fetchPatientNotFound');
      cy.contains('Patient not found.').should('be.visible');
    });
  
    it('shows an error message when no patient ID is entered', () => {
      cy.contains('button', 'Fetch Patient').click();
      cy.contains('Please provide a valid patient ID.').should('be.visible');
    });
  
    it('shows a generic error message for server errors', () => {
      cy.intercept('GET', '**/api/Patients/patientId/servererror', {
        statusCode: 500,
        body: { message: 'Internal server error' },
      }).as('fetchPatientServerError');
  
      cy.get('input#patientId').type('servererror');
      cy.contains('button', 'Fetch Patient').click();
  
      cy.wait('@fetchPatientServerError');
      cy.contains('An error occurred while fetching patient details.').should('be.visible');
    });
  });
  