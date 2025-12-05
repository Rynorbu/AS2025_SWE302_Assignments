describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('/#/register', { timeout: 30000 });
    cy.wait(3000); // Wait for React app to fully load
  });

  it('should display registration form', () => {
    cy.get('h1', { timeout: 15000 }).contains('Sign Up').should('be.visible');
    cy.get('input[placeholder="Username"]', { timeout: 10000 }).should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Sign up').should('be.visible');
  });

  it('should successfully register a new user', () => {
    const timestamp = Date.now();
    const username = `testuser${timestamp}`;
    const email = `testuser${timestamp}@example.com`;

    // Fill in registration form
    cy.get('input[placeholder="Username"]').clear().type(username);
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="Password"]').clear().type('Password123!');
    cy.get('button[type="submit"]').click();

    // Should redirect to home page
    cy.url({ timeout: 10000 }).should('not.include', '/#/register');

    // User should be logged in - check for username
    cy.contains(username, { timeout: 10000 }).should('be.visible');
  });

  it('should show error for existing email', () => {
    cy.fixture('users').then((users) => {
      // Try to register with existing email
      cy.get('input[placeholder="Username"]').clear().type('newusername');
      cy.get('input[placeholder="Email"]').clear().type(users.existingUser.email);
      cy.get('input[placeholder="Password"]').clear().type('Password123!');
      cy.get('button[type="submit"]').click();

      // Should show error message or remain on register page
      cy.wait(2000);
      cy.url().should('include', '/#/register');
    });
  });

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click();

    // Form should not submit - still on register page
    cy.wait(1000);
    cy.url().should('include', '/#/register');
  });

  it('should validate email format', () => {
    cy.get('input[placeholder="Username"]').clear().type('testuser');
    cy.get('input[placeholder="Email"]').clear().type('invalid-email');
    cy.get('input[placeholder="Password"]').clear().type('Password123!');
    cy.get('button[type="submit"]').click();

    // Should remain on registration page
    cy.wait(1000);
    cy.url().should('include', '/#/register');
  });

  it('should navigate to login page from register', () => {
    cy.contains('Have an account?').click();
    cy.url({ timeout: 5000 }).should('include', '/#/login');
  });
});
