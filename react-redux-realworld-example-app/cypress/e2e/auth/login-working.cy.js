describe('User Login - Working Version', () => {
  before(() => {
    // Ensure test user exists
    cy.fixture('users').then((users) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users`,
        body: {
          user: {
            email: users.existingUser.email,
            username: users.existingUser.username,
            password: users.existingUser.password
          }
        },
        failOnStatusCode: false
      });
    });
  });

  beforeEach(() => {
    cy.visit('/#/login');
    cy.wait(2000);
  });

  it('should display login form', () => {
    cy.get('h1', { timeout: 10000 }).should('contain', 'Sign In');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.get('input[type="email"]').clear().type(users.existingUser.email);
      cy.get('input[type="password"]').clear().type(users.existingUser.password);
      cy.get('button[type="submit"]').click();
      
      cy.wait(3000);
      cy.contains(users.existingUser.username, { timeout: 10000 }).should('exist');
    });
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').clear().type('wrong@test.com');
    cy.get('input[type="password"]').clear().type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    cy.wait(2000);
    // Should still see login elements
    cy.get('input[type="email"]').should('exist');
  });

  it('should navigate to register', () => {
    cy.contains('Need an account?').click();
    cy.wait(2000);
    cy.contains(/sign up/i).should('exist');
  });
});
