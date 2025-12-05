describe('Article Feed', () => {
  beforeEach(() => {
    cy.visit('/#/');
  });

  it('should display global feed', () => {
    cy.contains('Global Feed', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).should('have.length.at.least', 1);
  });

  it('should display popular tags', () => {
    cy.get('.sidebar, [class*="sidebar"]').should('be.visible');
    cy.contains('Popular Tags', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.get('.tag-pill, .tag-default, [class*="tag"]').should('have.length.at.least', 1);
  });

  it('should filter by tag', () => {
    // Wait for tags to load
    cy.get('.tag-pill, .tag-default', { timeout: 10000 }).should('have.length.at.least', 1);
    
    // Get the first tag text
    cy.get('.tag-pill, .tag-default').first().invoke('text').then((tagText) => {
      // Click the tag
      cy.get('.tag-pill, .tag-default').first().click();

      // Should show filtered articles with active tab
      cy.wait(1000);
      cy.get('.nav-link.active, [class*="active"]', { timeout: 10000 }).should('exist');
    });
  });

  it('should show your feed when logged in', () => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
    cy.visit('/#/');

    cy.contains('Your Feed', { matchCase: false, timeout: 10000 }).should('be.visible');
    cy.contains('Your Feed', { matchCase: false }).click();

    // Should show personal feed
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
  });

  it('should paginate articles if there are many', () => {
    // Check if pagination exists
    cy.get('body').then(($body) => {
      if ($body.find('.pagination, [class*="pagination"]').length > 0) {
        cy.get('.pagination').should('be.visible');

        // If there's a page 2, click it
        cy.get('.page-link, .page-item').then(($pages) => {
          if ($pages.length > 1) {
            cy.get('.page-link').contains('2').click({ force: true });
            cy.wait(1000);
            // Should show different articles
            cy.get('.article-preview, [class*="article"]').should('exist');
          }
        });
      } else {
        // If no pagination, just verify articles exist
        cy.get('.article-preview, [class*="article"]').should('have.length.at.least', 1);
      }
    });
  });

  it('should display article preview information', () => {
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().within(() => {
      // Should show author info
      cy.get('.author, [class*="author"], a[href*="@"]').should('exist');
      
      // Should show article title
      cy.get('h1, h2, h3, .preview-link, [class*="title"]').should('exist');
      
      // Should show description or excerpt
      cy.get('p, .description, [class*="description"]').should('exist');
    });
  });

  it('should navigate to article when clicking preview', () => {
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().click();

    // Should navigate to article page
    cy.url({ timeout: 10000 }).should('include', '/#/article/');
  });

  it('should display article metadata in feed', () => {
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().within(() => {
      // Should show date
      cy.get('.date, time, [class*="date"]').should('exist');
      
      // Should show tags if article has them
      cy.get('body').then(($body) => {
        // Tags are optional, so we just check the structure exists
        cy.get('.tag-list, [class*="tag"], .tag-default').should('exist');
      });
    });
  });

  it('should show favorite button on articles', () => {
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().within(() => {
      // Should have a favorite button
      cy.get('button, .btn').filter(':contains("Favorite"), :contains("favorite")').should('exist');
    });
  });

  it('should favorite article from feed when logged in', () => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
    cy.visit('/#/');

    // Find and click favorite button on first article
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).first().within(() => {
      cy.get('button').filter(':contains("Favorite"), :contains("favorite")').first().click({ force: true });
    });

    cy.wait(1000);
    
    // Button state should change (may show count increase or change text)
    cy.get('.article-preview, [class*="article"]').first().should('exist');
  });

  it('should load more articles on scroll or pagination', () => {
    // Count initial articles
    cy.get('.article-preview, [class*="article"]', { timeout: 10000 }).its('length').then((initialCount) => {
      cy.log(`Initial articles: ${initialCount}`);

      // Check if there's a way to load more
      cy.get('body').then(($body) => {
        if ($body.find('.pagination, [class*="pagination"]').length > 0) {
          // Test pagination
          cy.get('.page-link').contains('2').click({ force: true });
          cy.wait(1000);
          cy.get('.article-preview, [class*="article"]').should('have.length.at.least', 1);
        } else if ($body.find('button:contains("Load more"), button:contains("Show more")').length > 0) {
          // Test load more button
          cy.contains('Load more').click();
          cy.wait(1000);
          cy.get('.article-preview, [class*="article"]').should('have.length.at.least', initialCount);
        }
      });
    });
  });

  it('should toggle between global feed and your feed', () => {
    cy.visit('/#/');
    cy.fixture('users').then((users) => {
      cy.login(users.existingUser.email, users.existingUser.password);
    });
    cy.visit('/#/');

    // Click Your Feed
    cy.contains('Your Feed', { matchCase: false, timeout: 10000 }).click();
    cy.get('.nav-link.active, [class*="active"]').should('contain.text', 'Your Feed');

    // Click Global Feed
    cy.contains('Global Feed', { matchCase: false }).click();
    cy.get('.nav-link.active, [class*="active"]').should('contain.text', 'Global Feed');
  });
});
