describe('Article Creation', () => {
  beforeEach(() => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
    cy.visit('/#/editor');
  });

  it('should display article editor form', () => {
    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).should('be.visible');
    cy.get('input[placeholder*="about"]').should('be.visible');
    cy.get('textarea[placeholder*="markdown"]').should('be.visible');
    cy.get('input[placeholder*="tags"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should create a new article successfully', () => {
    const timestamp = Date.now();
    const title = `Test Article ${timestamp}`;

    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).type(title);
    cy.get('input[placeholder*="about"]').type('Test Description');
    cy.get('textarea[placeholder*="markdown"]').type('# Test Content\n\nThis is test content.');
    cy.get('input[placeholder*="tags"]').type('test{enter}');
    cy.get('button[type="submit"]').click();

    // Should redirect to article page
    cy.url({ timeout: 10000 }).should('include', '/#/article/');

    // Article should be displayed
    cy.contains(title, { timeout: 10000 }).should('be.visible');
    cy.contains('Test Description').should('be.visible');
    cy.contains('This is test content').should('be.visible');
  });

  it('should add multiple tags', () => {
    cy.get('input[placeholder*="tags"]', { timeout: 10000 }).type('tag1{enter}');
    cy.get('input[placeholder*="tags"]').type('tag2{enter}');
    cy.get('input[placeholder*="tags"]').type('tag3{enter}');

    // Tags should be visible
    cy.contains('tag1').should('be.visible');
    cy.contains('tag2').should('be.visible');
    cy.contains('tag3').should('be.visible');
  });

  it('should remove tags', () => {
    cy.get('input[placeholder*="tags"]', { timeout: 10000 }).type('tag1{enter}');
    cy.get('input[placeholder*="tags"]').type('tag2{enter}');

    // Find and remove first tag
    cy.contains('tag1').parent().find('i, button, .remove, .delete').first().click({ force: true });

    // Tag should be removed
    cy.contains('tag1').should('not.exist');
    cy.contains('tag2').should('be.visible');
  });

  it('should show validation for required fields', () => {
    cy.get('button[type="submit"]', { timeout: 10000 }).click();

    // Should remain on editor page
    cy.url().should('include', '/#/editor');
  });

  it('should create article with markdown formatting', () => {
    const timestamp = Date.now();
    const title = `Markdown Article ${timestamp}`;
    const markdown = `# Heading 1\n\n## Heading 2\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2`;

    cy.get('input[placeholder*="Article Title"]', { timeout: 10000 }).type(title);
    cy.get('input[placeholder*="about"]').type('Testing markdown');
    cy.get('textarea[placeholder*="markdown"]').type(markdown);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/article/');
    cy.contains(title).should('be.visible');
  });
});
