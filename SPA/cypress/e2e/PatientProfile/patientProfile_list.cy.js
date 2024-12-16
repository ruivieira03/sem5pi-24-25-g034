describe('Patient List E2E Tests', () => {
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
  
      // Mock da API para listar pacientes
      cy.intercept('GET', '**/api/Patients', {
        statusCode: 200,
        body: [
          { id: 1, firstName: 'John', lastName: 'Doe', role: 'Patient' },
          { id: 2, firstName: 'Jane', lastName: 'Smith', role: 'Patient' },
        ],
      }).as('fetchPatients');
  
      // Acessar a página de lista de pacientes
      cy.visit('/admin/patient-list');
      cy.location('pathname').should('eq', '/admin/patient-list');
      cy.wait('@fetchPatients');
    });
  
    it('displays the patient list', () => {
      cy.contains('h2', 'Patient List').should('be.visible');
      cy.get('.patient-item').should('have.length', 2);
      cy.contains('John Doe').should('be.visible');
      cy.contains('Jane Smith').should('be.visible');
    });
  
    it('deletes a patient successfully', () => {
      cy.intercept('DELETE', '**/api/Patients/1', {
        statusCode: 200,
      }).as('deletePatient');
  
      cy.contains('John Doe')
        .parents('.patient-item')
        .find('.delete')
        .click();
  
      cy.get('.modal').within(() => {
        cy.contains('Confirm Delete').click();
      });
  
      cy.wait('@deletePatient');
      cy.get('.patient-item').should('have.length', 1);
      cy.contains('John Doe').should('not.exist');
    });
  
    it('updates a patient successfully', () => {
      cy.intercept('PUT', '**/api/Patients/1', {
        statusCode: 200,
        body: { id: 1, firstName: 'Updated', lastName: 'Patient', role: 'Patient' },
      }).as('updatePatient');
  
      cy.contains('John Doe')
        .parents('.patient-item')
        .find('.update')
        .click();
  
      cy.get('.modal').within(() => {
        cy.get('input[name="firstName"]').clear().type('Updated');
        cy.get('input[name="lastName"]').clear().type('Patient');
        cy.contains('button', 'Update').click();
      });
  
      cy.wait('@updatePatient');
      cy.contains('Updated Patient').should('be.visible');
    });
  
    it('displays "No patients found" when the patient list is empty', () => {
      cy.intercept('GET', '**/api/Patients', {
        statusCode: 200,
        body: [],
      }).as('fetchEmptyPatients');
  
      cy.visit('/admin/patient-list');
      cy.wait('@fetchEmptyPatients');
  
      cy.contains('No patients found.').should('be.visible');
    });
  });
  