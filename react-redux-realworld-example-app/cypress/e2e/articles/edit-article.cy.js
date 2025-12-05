describe('Article Editing and Deletion', () => {
  let articleSlug;
  let articleTitle;

  beforeEach(() => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
      
      // Create article for each test
      const timestamp = Date.now();
      articleTitle = `Editable Article ${timestamp}`;
      cy.createArticle(
        articleTitle,
        'Description to edit',
        'Body to edit',
        ['edit', 'test']
      ).then((response) => {
        if (response.status === 200 || response.status === 201) {
          articleSlug = response.body.article.slug;
          cy.visit(`/#/article/${articleSlug}`);
        }
      });
    });
  });

  it('should show edit button for own article', () => {
    cy.get('button, a').contains('Edit Article', { matchCase: false, timeout: 10000 }).should('be.visible');
  });

  it('should navigate to editor when clicking edit', () => {
    cy.get('button, a').contains('Edit Article', { matchCase: false, timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/#/editor/');
  });

  it('should pre-populate editor with article data', () => {
    cy.get('button, a').contains('Edit Article', { matchCase: false, timeout: 10000 }).click();

    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).should('have.value', articleTitle);
    cy.get('input[placeholder*="about"]').should('have.value', 'Description to edit');
    cy.get('textarea').should('contain.value', 'Body to edit');
  });

  it('should successfully update article', () => {
    cy.get('button, a').contains('Edit Article', { matchCase: false, timeout: 10000 }).click();

    // Modify content
    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).clear().type('Updated Title');
    cy.get('textarea').clear().type('Updated body content');
    cy.get('button[type="submit"]').click();

    // Should show updated content
    cy.contains('Updated Title', { timeout: 10000 }).should('be.visible');
    cy.contains('Updated body content').should('be.visible');
  });

  it('should successfully delete article', () => {
    cy.get('button').contains('Delete Article', { matchCase: false, timeout: 10000 }).click();

    // Should redirect to home or profile
    cy.url({ timeout: 10000 }).should('not.include', `/article/${articleSlug}`);
  });

  it('should not show edit/delete buttons for other users articles', () => {
    // First create an article with the existing user
    const timestamp = Date.now();
    cy.createArticle(
      `Other User Article ${timestamp}`,
      'Description',
      'Body',
      ['test']
    ).then((response) => {
      const slug = response.body.article.slug;
      
      // Logout
      cy.logout();
      
      // Login as a different user (register new one)
      cy.visit('/#/register');
      const newUsername = `newuser${timestamp}`;
      const newEmail = `newuser${timestamp}@example.com`;
      cy.register(newEmail, newUsername, 'Password123!');
      
      // Visit the article
      cy.visit(`/#/article/${slug}`);

      // Should not see edit/delete buttons
      cy.get('button, a').contains('Edit Article', { matchCase: false }).should('not.exist');
      cy.get('button').contains('Delete Article', { matchCase: false }).should('not.exist');
    });
  });
});
