describe('Complete User Journeys', () => {
  it('should complete new user registration and article creation flow', () => {
    const timestamp = Date.now();
    const username = `newuser${timestamp}`;
    const email = `newuser${timestamp}@example.com`;

    // 1. Register
    cy.visit('/#/register');
    cy.get('input[placeholder="Username"]', { timeout: 10000 }).type(username);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    // 2. Should be logged in
    cy.url({ timeout: 10000 }).should('eq', `${Cypress.config().baseUrl}/#/`);

    // 3. Navigate to editor
    cy.contains('New Article', { matchCase: false, timeout: 10000 }).click();

    // 4. Create article
    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).type('My First Article');
    cy.get('input[placeholder*="about"]').type('Learning Cypress');
    cy.get('textarea').type('This is my first article!');
    cy.get('input[placeholder*="tags"]').type('first{enter}');
    cy.get('button[type="submit"]').click();

    // 5. Article should be published
    cy.contains('My First Article', { timeout: 10000 }).should('be.visible');

    // 6. Go to profile
    cy.get('.nav-link, a').contains(username, { timeout: 10000 }).click();

    // 7. Article should appear in profile
    cy.contains('My First Article', { timeout: 10000 }).should('be.visible');
  });

  it('should complete article interaction flow', () => {
    cy.fixture('users').then((users) => {
      // Login
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit('/#/');

      // Find an article
      cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().click();

      // Favorite the article
      cy.get('button').contains('Favorite', { matchCase: false, timeout: 10000 }).first().click();
      cy.wait(1000);

      // Add a comment
      const comment = `Great article! ${Date.now()}`;
      cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).type(comment);
      cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();

      // Comment should appear
      cy.contains(comment, { timeout: 10000 }).should('be.visible');
    });
  });

  it('should complete settings update flow', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit('/#/');

      // Go to settings
      cy.contains('Settings', { matchCase: false, timeout: 10000 }).click();

      // Update profile
      const newBio = `E2E Testing Expert ${Date.now()}`;
      cy.get('textarea[placeholder*="bio"]', { timeout: 10000 }).clear().type(newBio);
      cy.get('button[type="submit"]').contains('Update Settings', { matchCase: false }).click();

      // Should redirect to profile
      cy.url({ timeout: 10000 }).should('include', '/@');
      cy.contains(newBio).should('be.visible');
    });
  });

  it('should complete full article lifecycle', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      
      const timestamp = Date.now();
      const title = `Lifecycle Article ${timestamp}`;

      // Create article
      cy.visit('/#/editor');
      cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).type(title);
      cy.get('input[placeholder*="about"]').type('Full lifecycle test');
      cy.get('textarea').type('Testing full article lifecycle');
      cy.get('button[type="submit"]').click();

      cy.url({ timeout: 10000 }).should('include', '/#/article/');
      
      // Add comment
      const comment = `Test comment ${Date.now()}`;
      cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).type(comment);
      cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();
      cy.wait(1000);

      // Edit article
      cy.get('button, a').contains('Edit Article', { matchCase: false, timeout: 10000 }).click();
      cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).clear().type(`${title} - Edited`);
      cy.get('button[type="submit"]').click();

      cy.contains(`${title} - Edited`, { timeout: 10000 }).should('be.visible');

      // Delete article
      cy.get('button').contains('Delete Article', { matchCase: false, timeout: 10000 }).click();
      cy.url({ timeout: 10000 }).should('not.include', '/#/article/');
    });
  });

  it('should complete navigation flow', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      
      // Home
      cy.visit('/#/');
      cy.contains('Global Feed', { matchCase: false, timeout: 10000 }).should('be.visible');

      // Profile
      cy.get('.nav-link, a').contains(users.existingUser.username, { timeout: 10000 }).click();
      cy.url().should('include', `/#/@${users.existingUser.username}`);

      // Settings
      cy.contains('Settings', { matchCase: false, timeout: 10000 }).click();
      cy.url().should('include', '/#/settings');

      // New Article
      cy.contains('New Article', { matchCase: false, timeout: 10000 }).click();
      cy.url().should('include', '/#/editor');

      // Back to Home
      cy.contains('conduit', { matchCase: false, timeout: 10000 }).first().click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
    });
  });
});
