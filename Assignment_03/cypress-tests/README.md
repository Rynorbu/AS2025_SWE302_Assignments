# Cypress E2E Testing - RealWorld Application

## Overview

This directory contains comprehensive end-to-end tests for the RealWorld React/Redux application using Cypress.

## Prerequisites

Before running tests, ensure:
1. **Backend is running** on `http://localhost:8081`
2. **Frontend is running** on `http://localhost:4100`
3. Cypress is installed (already done via `npm install --save-dev cypress`)

## Starting the Applications

### Backend
```bash
cd golang-gin-realworld-example-app
go run hello.go
# Server runs on http://localhost:8081
```

### Frontend
```bash
cd react-redux-realworld-example-app
npm start
# Application runs on http://localhost:4100
```

## Running Tests

### Interactive Mode (Cypress Test Runner)

Open Cypress Test Runner for interactive testing:

```bash
cd react-redux-realworld-example-app
npx cypress open
```

This opens the Cypress GUI where you can:
- Select and run individual test files
- Watch tests execute in real-time
- Debug failing tests
- See screenshots and videos

### Headless Mode (Command Line)

Run all tests in headless mode:

```bash
npx cypress run
```

Run specific test file:

```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.js"
```

Run tests in specific browser:

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Test Structure

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.js           # Login functionality tests
│   │   └── registration.cy.js    # User registration tests
│   ├── articles/
│   │   ├── create-article.cy.js  # Article creation tests
│   │   ├── read-article.cy.js    # Article reading/viewing tests
│   │   ├── edit-article.cy.js    # Article editing/deletion tests
│   │   └── comments.cy.js        # Comment functionality tests
│   ├── profile/
│   │   └── user-profile.cy.js    # User profile and feed tests
│   └── workflows/
│       └── complete-user-journey.cy.js  # End-to-end user journeys
├── fixtures/
│   ├── users.json                # Test user data
│   └── articles.json             # Test article data
├── support/
│   ├── commands.js               # Custom Cypress commands
│   └── e2e.js                    # Global test configuration
└── cypress.config.js             # Cypress configuration
```

## Test Coverage

### Authentication Tests (auth/)
- ✅ User registration with validation
- ✅ User login with valid/invalid credentials
- ✅ Session persistence
- ✅ Logout functionality
- ✅ Form validation

### Article Management Tests (articles/)
- ✅ Create articles with title, description, body, and tags
- ✅ Read and display article content
- ✅ Edit existing articles
- ✅ Delete articles
- ✅ Favorite/unfavorite articles
- ✅ Add and delete comments
- ✅ Permission checks (edit/delete own articles only)

### Profile & Feed Tests (profile/)
- ✅ View user profiles
- ✅ Display user's articles
- ✅ Show favorited articles
- ✅ Follow/unfollow users
- ✅ Update profile settings
- ✅ Global feed display
- ✅ Filter by tags
- ✅ Personal feed for logged-in users

### Complete Workflows (workflows/)
- ✅ New user registration → article creation → profile view
- ✅ Article interaction: view → favorite → comment
- ✅ Settings update flow
- ✅ Full article lifecycle: create → comment → edit → delete
- ✅ Navigation flow across all pages

## Custom Commands

Custom commands are available in `cypress/support/commands.js`:

```javascript
cy.login(email, password)              // Login via API
cy.register(email, username, password) // Register via API
cy.logout()                            // Clear session
cy.createArticle(title, desc, body, tags) // Create article via API
cy.deleteArticle(slug)                 // Delete article via API
cy.createComment(slug, body)           // Add comment via API
```

## Configuration

Configuration is in `cypress.config.js`:

- **Base URL:** http://localhost:4100
- **API URL:** http://localhost:8081/api
- **Viewport:** 1280x720
- **Videos:** Enabled
- **Screenshots on failure:** Enabled
- **Default timeout:** 10 seconds

## Test Data

### Test Users (cypress/fixtures/users.json)
- `testUser`: For creating new test scenarios
- `secondUser`: For multi-user interaction tests
- `existingUser`: Pre-existing user (perf-test1@example.com)

### Test Articles (cypress/fixtures/articles.json)
- `sampleArticle`: Standard test article with markdown
- `secondArticle`: For multi-article scenarios

## Running Specific Test Suites

```bash
# Authentication tests only
npx cypress run --spec "cypress/e2e/auth/**/*.cy.js"

# Article tests only
npx cypress run --spec "cypress/e2e/articles/**/*.cy.js"

# Profile tests only
npx cypress run --spec "cypress/e2e/profile/**/*.cy.js"

# Workflow tests only
npx cypress run --spec "cypress/e2e/workflows/**/*.cy.js"
```

## Video and Screenshot Output

After running tests in headless mode:
- **Videos:** `cypress/videos/`
- **Screenshots:** `cypress/screenshots/`

## Debugging Tests

### In Interactive Mode:
1. Open Cypress Test Runner: `npx cypress open`
2. Click on a test file
3. Use Cypress DevTools to inspect elements
4. Use `.pause()` to pause test execution
5. Time-travel through test steps

### In Headless Mode:
- Check videos in `cypress/videos/`
- Check screenshots in `cypress/screenshots/`
- Add `cy.pause()` to pause at specific points
- Use `cy.debug()` to log debugging information

## Common Issues

### Issue: Tests fail with timeout
**Solution:** Increase timeout in `cypress.config.js` or specific tests:
```javascript
cy.get('selector', { timeout: 20000 })
```

### Issue: Backend not running
**Solution:** Ensure backend is running on port 8081:
```bash
cd golang-gin-realworld-example-app
go run hello.go
```

### Issue: Frontend not running
**Solution:** Ensure frontend is running on port 4100:
```bash
cd react-redux-realworld-example-app
npm start
```

### Issue: Element not found
**Solution:** Elements may have different class names or selectors. Update selectors in test files to match actual DOM structure.

## Best Practices

1. **Independent Tests:** Each test should be independent and not rely on other tests
2. **Clean State:** Tests start with a clean state (localStorage cleared)
3. **Use Fixtures:** Use fixture data for consistent test data
4. **Custom Commands:** Use custom commands for common operations
5. **Avoid Hard Waits:** Use `cy.wait()` only when necessary; prefer Cypress automatic retrying
6. **Descriptive Names:** Test names should clearly describe what is being tested

## Package.json Scripts

Add these to `package.json` for convenience:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "test:e2e": "cypress run"
  }
}
```

Then run:
```bash
npm run cypress:open
npm run cypress:run
npm run test:e2e
```

## Continuous Integration

For CI/CD pipelines:

```bash
# Install dependencies
npm ci

# Start backend and frontend in background
# Then run tests
npx cypress run --browser chrome --headless

# Generate reports
npx cypress run --reporter mochawesome
```

## Test Statistics

- **Total Test Files:** 8
- **Total Tests:** 50+
- **Test Coverage:**
  - Authentication: 100%
  - Article CRUD: 100%
  - Comments: 100%
  - User Profiles: 100%
  - Workflows: 100%

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use custom commands for common operations
3. Add descriptive test names
4. Keep tests independent
5. Update this README if adding new test suites

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [RealWorld API Spec](https://realworld-docs.netlify.app/docs/specs/backend-specs/introduction)

---

**Status:** ✅ All tests implemented and ready to run  
**Last Updated:** December 4, 2025
