describe('Article Reading and Interaction', () => {
  let articleSlug;

  before(() => {
    // Create an article to test with
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
      
      cy.fixture('articles').then((articles) => {
        const timestamp = Date.now();
        cy.createArticle(
          `${articles.sampleArticle.title} ${timestamp}`,
          articles.sampleArticle.description,
          articles.sampleArticle.body,
          articles.sampleArticle.tagList
        ).then((response) => {
          if (response.status === 200 || response.status === 201) {
            articleSlug = response.body.article.slug;
          }
        });
      });
    });
  });

  beforeEach(() => {
    if (articleSlug) {
      cy.visit(`/#/article/${articleSlug}`);
    }
  });

  it('should display article content', () => {
    cy.fixture('articles').then((articles) => {
      cy.contains(articles.sampleArticle.title, { timeout: 10000 }).should('be.visible');
      cy.contains(articles.sampleArticle.description).should('be.visible');
    });
  });

  it('should display article metadata', () => {
    cy.fixture('users').then((users) => {
      // Author name
      cy.contains(users.existingUser.username, { timeout: 10000 }).should('be.visible');

      // Tags
      cy.get('.tag-list, .tag-default, [class*="tag"]').should('exist');
    });
  });

  it('should allow favoriting article when logged in', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit(`/#/article/${articleSlug}`);
    });

    // Click favorite button
    cy.get('button').contains('Favorite', { matchCase: false, timeout: 10000 }).first().click();

    // Button should change or show updated count
    cy.wait(1000);
    cy.get('button').contains('Unfavorite', { matchCase: false }).should('exist');
  });

  it('should allow unfavoriting article', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/#/');
      cy.login(users.existingUser.email, users.existingUser.password);
      cy.visit(`/#/article/${articleSlug}`);
    });

    // Favorite first
    cy.get('button').contains('Favorite', { matchCase: false, timeout: 10000 }).first().click();
    cy.wait(1000);

    // Then unfavorite
    cy.get('button').contains('Unfavorite', { matchCase: false }).first().click();
    cy.wait(1000);

    // Button should change back
    cy.get('button').contains('Favorite', { matchCase: false }).should('exist');
  });

  it('should display article in global feed', () => {
    cy.visit('/#/');
    
    cy.fixture('articles').then((articles) => {
      // Should see articles in the feed
      cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).should('have.length.at.least', 1);
    });
  });
});
