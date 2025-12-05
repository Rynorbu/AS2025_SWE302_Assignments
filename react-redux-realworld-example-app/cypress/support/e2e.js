// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// You can change the location of this file or turn off loading
// the support file with the 'supportFile' configuration option.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // This is useful for ignoring application errors that don't affect test functionality
  return false;
});
