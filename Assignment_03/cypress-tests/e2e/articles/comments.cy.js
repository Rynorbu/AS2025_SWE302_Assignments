describe('Article Comments', () => {
  let articleSlug;

  before(() => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
      
      const timestamp = Date.now();
      cy.createArticle(
        `Article with Comments ${timestamp}`,
        'Testing comments',
        'Comment testing article',
        ['comments']
      ).then((response) => {
        if (response.status === 200 || response.status === 201) {
          articleSlug = response.body.article.slug;
        }
      });
    });
  });

  beforeEach(() => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
    if (articleSlug) {
      cy.visit(`/#/article/${articleSlug}`);
    }
  });

  it('should display comment form when logged in', () => {
    cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).should('be.visible');
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).should('be.visible');
  });

  it('should add a comment successfully', () => {
    const commentText = `Test comment ${Date.now()}`;

    cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).type(commentText);
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();

    // Comment should appear
    cy.contains(commentText, { timeout: 10000 }).should('be.visible');
  });

  it('should display multiple comments', () => {
    const comment1 = `Comment 1 ${Date.now()}`;
    const comment2 = `Comment 2 ${Date.now() + 1}`;

    cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).type(comment1);
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();
    cy.wait(1000);

    cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]').type(comment2);
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();
    cy.wait(1000);

    // Both comments should appear
    cy.contains(comment1).should('be.visible');
    cy.contains(comment2).should('be.visible');
  });

  it('should delete own comment', () => {
    const commentText = `Comment to delete ${Date.now()}`;

    cy.get('textarea[placeholder*="comment"], textarea[placeholder*="Write"]', { timeout: 10000 }).type(commentText);
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false }).click();
    cy.wait(1000);

    // Find and click delete button for this comment
    cy.contains(commentText).parent().parent().parent()
      .find('i[class*="trash"], button[class*="delete"], .mod-options, i.ion-trash-a')
      .first()
      .click({ force: true });

    cy.wait(1000);

    // Comment should be removed
    cy.contains(commentText).should('not.exist');
  });

  it('should not show comment form when not logged in', () => {
    cy.logout();
    cy.visit(`/#/article/${articleSlug}`);

    // Should show sign in prompt instead of comment form
    cy.contains('Sign in', { matchCase: false, timeout: 10000 }).should('be.visible');
  });

  it('should validate comment is not empty', () => {
    cy.get('button[type="submit"]').contains('Post Comment', { matchCase: false, timeout: 10000 }).click();

    // Should not submit empty comment
    cy.wait(500);
    cy.url().should('include', `/article/${articleSlug}`);
  });
});
