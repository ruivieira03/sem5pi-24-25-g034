describe('Patient Profile Registration E2E Tests', () => {
  beforeEach(() => {
    // Login como admin
    cy.request('POST', 'https://localhost:5001/api/account/login', {
      username: 'adminUser',
      password: 'SEM5pi1234@',
    }).then((response) => {
      expect(response.status).to.eq(200);

      const token = response.body.token;
      localStorage.setItem('authToken', token); // Armazena o token no localStorage
    });

    // Navega para a página de registro de perfil do paciente
    cy.visit('/admin/register-patient-profile');
    cy.location('pathname').should('eq', '/admin/register-patient-profile');
  });

  it('Deve registrar um novo perfil de paciente com sucesso', () => {
    // Mock da resposta da API para o registro bem-sucedido
    cy.intercept('POST', '**/api/Patient/register-profile', {
      statusCode: 201,
      body: { message: 'Registration successful!' },
    }).as('registerPatient');

    // Preencher o formulário
    cy.get('input[name="FirstName"]').type('John'); // Primeiro Nome
    cy.get('input[name="LastName"]').type('Doe'); // Último Nome
    cy.get('input[name="DateOfBirth"]').type('1990-01-01'); // Data de Nascimento
    cy.get('select[name="Gender"]').select('male'); // Gênero
    cy.get('input[name="Email"]').type('john.doe@example.com'); // Email
    cy.get('input[name="PhoneNumber"]').type('1234567890'); // Telefone
    cy.get('input[name="EmergencyContact"]').type('Jane Doe - 9876543210'); // Contato de Emergência
    cy.get('textarea[name="Allergies"]').type('None'); // Alergias
    cy.get('textarea[name="MedicalHistory"]').type('No significant medical history'); // Histórico Médico

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a requisição foi feita e a mensagem de sucesso é exibida
    cy.wait('@registerPatient');
    cy.contains('Registration successful!').should('be.visible');
  });

  it('Deve mostrar uma mensagem de erro ao tentar registrar com campos obrigatórios vazios', () => {
    // Submeter o formulário vazio
    cy.get('button[type="submit"]').click();

    // Verificar se mensagens de validação são exibidas
    cy.get('input[name="FirstName"]:invalid').should('exist');
    cy.get('input[name="LastName"]:invalid').should('exist');
    cy.get('input[name="DateOfBirth"]:invalid').should('exist');
    cy.get('select[name="Gender"]:invalid').should('exist');
    cy.get('input[name="Email"]:invalid').should('exist');
    cy.get('input[name="PhoneNumber"]:invalid').should('exist');
  });

  it('Deve exibir um erro quando o servidor retornar falha no registro', () => {
    // Mock da resposta de erro da API
    cy.intercept('POST', '**/api/Patient/register-profile', {
      statusCode: 400,
      body: { message: 'An error occurred during Profile registration.' },
    }).as('registerPatientError');

    // Preencher o formulário
    cy.get('input[name="FirstName"]').type('John'); // Primeiro Nome
    cy.get('input[name="LastName"]').type('Doe'); // Último Nome
    cy.get('input[name="DateOfBirth"]').type('1990-01-01'); // Data de Nascimento
    cy.get('select[name="Gender"]').select('male'); // Gênero
    cy.get('input[name="Email"]').type('john.doe@example.com'); // Email
    cy.get('input[name="PhoneNumber"]').type('1234567890'); // Telefone

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a mensagem de erro é exibida
    cy.wait('@registerPatientError');
    cy.contains('An error occurred during Profile registration.').should('be.visible');
  });

  it('Deve limpar o formulário após um registro bem-sucedido', () => {
    // Mock da resposta bem-sucedida da API
    cy.intercept('POST', '**/api/Patient/register-profile', {
      statusCode: 201,
      body: { message: 'Registration successful!' },
    }).as('registerPatient');

    // Preencher o formulário
    cy.get('input[name="FirstName"]').type('John');
    cy.get('input[name="LastName"]').type('Doe');
    cy.get('input[name="DateOfBirth"]').type('1990-01-01');
    cy.get('select[name="Gender"]').select('male');
    cy.get('input[name="Email"]').type('john.doe@example.com');
    cy.get('input[name="PhoneNumber"]').type('1234567890');
    cy.get('textarea[name="Allergies"]').type('None');
    cy.get('textarea[name="MedicalHistory"]').type('No significant medical history');

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar sucesso e campos limpos
    cy.wait('@registerPatient');
    cy.contains('Registration successful!').should('be.visible');
    cy.get('input[name="FirstName"]').should('have.value', '');
    cy.get('input[name="LastName"]').should('have.value', '');
    cy.get('input[name="DateOfBirth"]').should('have.value', '');
    cy.get('select[name="Gender"]').should('have.value', '');
    cy.get('input[name="Email"]').should('have.value', '');
    cy.get('input[name="PhoneNumber"]').should('have.value', '');
    cy.get('textarea[name="Allergies"]').should('have.value', '');
    cy.get('textarea[name="MedicalHistory"]').should('have.value', '');
  });
});
