describe('User Profile and Feed', () => {
  beforeEach(() => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
  });

  it('should view own profile', () => {
    cy.fixture('users').then((users) => {
      cy.visit(`/#/@${users.existingUser.username}`);

      cy.contains(users.existingUser.username, { timeout: 10000 }).should('be.visible');
      cy.get('a, button').contains('Edit Profile Settings', { matchCase: false }).should('be.visible');
    });
  });

  it('should display user articles in profile', () => {
    cy.fixture('users').then((users) => {
      // Create an article first
      const timestamp = Date.now();
      cy.createArticle(`Profile Article ${timestamp}`, 'Description', 'Body', ['profile']);

      cy.visit(`/#/@${users.existingUser.username}`);

      cy.contains('My Articles', { matchCase: false, timeout: 10000 }).click();
      cy.contains('Profile Article', { timeout: 10000 }).should('be.visible');
    });
  });

  it('should display favorited articles tab', () => {
    cy.fixture('users').then((users) => {
      cy.visit(`/#/@${users.existingUser.username}`);

      cy.contains('Favorited Articles', { matchCase: false, timeout: 10000 }).click();
      // Should show favorited articles tab
      cy.url().should('include', 'favorites');
    });
  });

  it('should follow another user', () => {
    // First create another user to follow
    const timestamp = Date.now();
    const newUsername = `followuser${timestamp}`;
    const newEmail = `followuser${timestamp}@example.com`;
    
    cy.logout();
    cy.visit('/#/register');
    cy.register(newEmail, newUsername, 'Password123!');
    cy.logout();
    
    // Login as existing user and follow the new user
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit(`/#/@${newUsername}`);

      // Click follow button
      cy.get('button').contains('Follow', { matchCase: false, timeout: 10000 }).click();
      cy.wait(1000);

      // Button should change
      cy.get('button').contains('Unfollow', { matchCase: false }).should('be.visible');
    });
  });

  it('should update profile settings', () => {
    cy.visit('/#/settings');

    const newBio = `Updated bio ${Date.now()}`;
    
    cy.get('textarea[placeholder*="bio"]', { timeout: 10000 }).clear().type(newBio);
    cy.get('button[type="submit"]').contains('Update Settings', { matchCase: false }).click();

    // Should redirect to profile
    cy.fixture('users').then((users) => {
      cy.url({ timeout: 10000 }).should('include', `/@${users.existingUser.username}`);
      cy.contains(newBio).should('be.visible');
    });
  });

  it('should display global feed', () => {
    cy.visit('/#/');
    
    cy.contains('Global Feed', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.get('.article-preview, [class*="article"]').should('have.length.at.least', 1);
  });

  it('should display popular tags', () => {
    cy.visit('/#/');
    
    cy.contains('Popular Tags', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.get('.tag-pill, .tag-default, [class*="tag"]').should('have.length.at.least', 1);
  });

  it('should filter by tag', () => {
    cy.visit('/#/');
    
    // Click a tag
    cy.get('.tag-pill, .tag-default', { timeout: 10000 }).first().click();

    // Should show filtered articles
    cy.wait(1000);
    cy.get('.nav-link.active, [class*="active"]').should('exist');
  });

  it('should show your feed when logged in', () => {
    cy.visit('/#/');

    cy.contains('Your Feed', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.contains('Your Feed', { matchCase: false }).click();

    // Should show personal feed
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
  });
});
