describe('User Login', () => {
  before(() => {
    // Ensure test user exists by registering them (will fail silently if already exists)
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
    cy.visit('/#/login', { timeout: 30000 });
    cy.wait(3000); // Wait for page to fully load
  });

  it('should display login form', () => {
    cy.get('h1').contains('Sign In', { timeout: 15000 }).should('be.visible');
    cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Sign in').should('be.visible');
  });

  it('should successfully login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.get('input[type="email"]').clear().type(users.existingUser.email);
      cy.get('input[type="password"]').clear().type(users.existingUser.password);
      cy.get('button[type="submit"]').click();

      // Should redirect to home
      cy.url({ timeout: 10000 }).should('match', /\/(#\/)?((?!login).)*$/);

      // Should show user's name in navigation
      cy.contains(users.existingUser.username, { timeout: 10000 }).should('be.visible');
    });
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').clear().type('wrong@example.com');
    cy.get('input[type="password"]').clear().type('wrongpassword');
    cy.get('button[type="submit"]').click();

      // Should show error or remain on login page
      cy.url({ timeout: 5000 }).should('include', '/#/login');
  });

  it('should persist login after page refresh', () => {
    cy.fixture('users').then((users) => {
      cy.get('input[type="email"]').clear().type(users.existingUser.email);
      cy.get('input[type="password"]').clear().type(users.existingUser.password);
      cy.get('button[type="submit"]').click();

      cy.url({ timeout: 10000 }).should('not.include', '/#/login');

      // Refresh page
      cy.reload();
      cy.wait(2000);

      // User should still be logged in
      cy.contains(users.existingUser.username, { timeout: 10000 }).should('be.visible');
    });
  });

  it('should logout successfully', () => {
    cy.fixture('users').then((users) => {
      // Login first
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit('/#/');
      cy.wait(2000);

      // Navigate to settings
      cy.contains('Settings', { timeout: 10000 }).click();
      cy.wait(1000);

      // Click logout button
      cy.get('button').contains(/logout/i, { timeout: 10000 }).click();

      // Should redirect to home and show sign in link
      cy.contains(/sign in/i, { timeout: 10000 }).should('be.visible');
    });
  });

  it('should navigate to register page from login', () => {
    cy.contains('Need an account?').click();
    cy.url({ timeout: 5000 }).should('include', '/#/register');
  });

  it('should require both email and password', () => {
    // Try to submit with only email
    cy.get('input[type="email"]').clear().type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.url().should('include', 'login');

    // Clear and try with only password
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.url().should('include', 'login');
  });
});
