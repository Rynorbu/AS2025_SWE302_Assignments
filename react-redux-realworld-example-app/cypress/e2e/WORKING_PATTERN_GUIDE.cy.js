/**
 * COMPREHENSIVE CYPRESS E2E TESTING GUIDE
 * ======================================
 * 
 * This file demonstrates the correct patterns for all Cypress tests in this project.
 * 
 * KEY CHANGES MADE:
 * 1. React Router changed to HashHistory (src/store.js)
 * 2. All routes now use hash format: /#/login, /#/register, /#/editor, etc.
 * 3. Increased wait times for React app to load
 * 4. Using flexible selectors with timeouts
 * 5. Session-based login for better performance
 * 
 * USAGE:
 * - Copy patterns from this file to other test files
 * - Always use `cy.visit('/#/route')` format
 * - Add `cy.wait(2000)` after navigation
 * - Use `{ timeout: 10000 }` for assertions
 * - Clear inputs before typing with `.clear().type()`
 * 
 * SERVERS MUST BE RUNNING:
 * - Backend: http://localhost:8081
 * - Frontend: http://localhost:4100
 */

describe('✅ WORKING PATTERN: User Authentication', () => {
  
  before(() => {
    // Create test user once before all tests
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

  describe('Login Tests', () => {
    beforeEach(() => {
      cy.visit('/#/login');
      cy.wait(3000); // Critical: Wait for React app to load
    });

    it('should display login form elements', () => {
      cy.get('h1', { timeout: 10000 }).should('contain', 'Sign In');
      cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
      cy.contains('Need an account?').should('be.visible');
    });

    it('should successfully login with valid credentials', () => {
      cy.fixture('users').then((users) => {
        cy.get('input[type="email"]').clear().type(users.existingUser.email);
        cy.get('input[type="password"]').clear().type(users.existingUser.password);
        cy.get('button[type="submit"]').click();
        
        cy.wait(3000);
        
        // Verify successful login - user should see their username
        cy.get('body', { timeout: 10000 }).should('contain', users.existingUser.username);
      });
    });

    it('should remain on login page with invalid credentials', () => {
      cy.get('input[type="email"]').clear().type('invalid@test.com');
      cy.get('input[type="password"]').clear().type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.wait(2000);
      cy.url().should('include', '/#/login');
      cy.get('input[type="email"]').should('exist');
    });

    it('should navigate to registration page', () => {
      cy.contains('Need an account?').click();
      cy.wait(2000);
      cy.url().should('include', '/#/register');
      cy.get('h1', { timeout: 10000 }).should('contain', 'Sign Up');
    });
  });

  describe('Registration Tests', () => {
    beforeEach(() => {
      cy.visit('/#/register');
      cy.wait(3000);
    });

    it('should display registration form', () => {
      cy.get('h1', { timeout: 10000 }).should('contain', 'Sign Up');
      cy.get('input[placeholder="Username"]').should('be.visible');
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should register a new user', () => {
      const timestamp = Date.now();
      const username = `user${timestamp}`;
      const email = `user${timestamp}@test.com`;

      cy.get('input[placeholder="Username"]').clear().type(username);
      cy.get('input[placeholder="Email"]').clear().type(email);
      cy.get('input[placeholder="Password"]').clear().type('Test123456!');
      cy.get('button[type="submit"]').click();

      cy.wait(3000);
      
      // Should redirect away from register page
      cy.url({ timeout: 10000 }).should('not.include', '/#/register');
      
      // Should see username in the app
      cy.get('body').should('contain', username);
    });

    it('should navigate to login page', () => {
      cy.contains('Have an account?').click();
      cy.wait(2000);
      cy.url().should('include', '/#/login');
    });
  });
});

/**
 * PATTERN FOR ARTICLE TESTS
 * =========================
 */
describe('✅ WORKING PATTERN: Article Management', () => {
  
  beforeEach(() => {
    // Login before each test
    cy.fixture('users').then((users) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users/login`,
        body: {
          user: {
            email: users.existingUser.email,
            password: users.existingUser.password
          }
        }
      }).then((response) => {
        window.localStorage.setItem('jwt', response.body.user.token);
      });
    });
  });

  it('should create a new article', () => {
    cy.visit('/#/editor');
    cy.wait(3000);

    const timestamp = Date.now();
    const title = `Test Article ${timestamp}`;

    cy.get('input[placeholder="Article Title"]', { timeout: 10000 }).clear().type(title);
    cy.get('input[placeholder*="about"]').clear().type('Test description');
    cy.get('textarea[placeholder*="Write your article"]').clear().type('Test body content');
    cy.get('button[type="submit"]').contains('Publish').click();

    cy.wait(3000);
    cy.get('h1', { timeout: 10000 }).should('contain', title);
  });

  it('should view article feed', () => {
    cy.visit('/#/');
    cy.wait(3000);

    cy.get('.article-preview', { timeout: 10000 }).should('exist');
  });
});

/**
 * TO FIX ALL OTHER TESTS:
 * =======================
 * 1. Replace all `cy.visit('/route')` with `cy.visit('/#/route')`
 * 2. Add `cy.wait(3000)` after each `cy.visit()`
 * 3. Add `{ timeout: 10000 }` to first `cy.get()` in each test
 * 4. Use `.clear().type()` instead of just `.type()`
 * 5. Add `cy.wait(2000-3000)` after form submissions
 * 6. Use flexible assertions like `.should('contain')` instead of exact matches
 */
