// ***********************************************
// Custom commands for RealWorld E2E Testing
// ***********************************************

/**
 * Visit a route in the SPA - handles routing properly
 * @param {string} path - The path to visit (e.g., '/login', '/register')
 */
Cypress.Commands.add('visitApp', (path = '/') => {
  // First visit the root to load the app
  if (path !== '/') {
    cy.visit('/');
    cy.wait(2000); // Wait for app to bootstrap
    // Then navigate using window.location to trigger React Router
    cy.window().then((win) => {
      win.history.pushState({}, '', path);
      // Trigger a popstate event to make React Router recognize the change
      win.dispatchEvent(new PopStateEvent('popstate'));
    });
    cy.wait(1000); // Wait for route to load
  } else {
    cy.visit('/');
    cy.wait(2000);
  }
});

/**
 * Login command - Authenticates a user via API and stores JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 */
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/users/login`,
      body: {
        user: { email, password }
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200 && response.body.user && response.body.user.token) {
        window.localStorage.setItem('jwt', response.body.user.token);
        cy.log('Login successful');
      } else {
        cy.log('Login failed:', response.status);
      }
    });
  });
});

/**
 * Register command - Creates a new user via API and stores JWT token
 * @param {string} email - User email
 * @param {string} username - Username
 * @param {string} password - User password
 */
Cypress.Commands.add('register', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/users`,
    body: {
      user: { email, username, password }
    },
    failOnStatusCode: false
  }).then((response) => {
    if ((response.status === 200 || response.status === 201) && response.body.user && response.body.user.token) {
      window.localStorage.setItem('jwt', response.body.user.token);
      cy.log('Registration successful');
    } else {
      cy.log('Registration failed:', response.status);
    }
  });
});

/**
 * Logout command - Removes JWT token from localStorage
 */
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('jwt');
  cy.log('Logged out');
});

/**
 * Create Article command - Creates a new article via API
 * @param {string} title - Article title
 * @param {string} description - Article description
 * @param {string} body - Article body content
 * @param {Array} tags - Array of tags (optional)
 */
Cypress.Commands.add('createArticle', (title, description, body, tags = []) => {
  const token = window.localStorage.getItem('jwt');
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/articles`,
    headers: {
      'Authorization': `Token ${token}`
    },
    body: {
      article: { title, description, body, tagList: tags }
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.log('Article creation response:', response.status);
    return response;
  });
});

/**
 * Delete Article command - Deletes an article via API
 * @param {string} slug - Article slug
 */
Cypress.Commands.add('deleteArticle', (slug) => {
  const token = window.localStorage.getItem('jwt');
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/articles/${slug}`,
    headers: {
      'Authorization': `Token ${token}`
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.log('Article deletion response:', response.status);
    return response;
  });
});

/**
 * Create Comment command - Adds a comment to an article
 * @param {string} slug - Article slug
 * @param {string} body - Comment body
 */
Cypress.Commands.add('createComment', (slug, body) => {
  const token = window.localStorage.getItem('jwt');
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/articles/${slug}/comments`,
    headers: {
      'Authorization': `Token ${token}`
    },
    body: {
      comment: { body }
    },
    failOnStatusCode: false
  });
});

/**
 * Wait for element to be visible with custom timeout
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});
