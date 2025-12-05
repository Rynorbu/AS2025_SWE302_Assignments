describe('Debug Login Page', () => {
  it('should load and interact with login page', () => {
    cy.visit('/login', { timeout: 30000 });
    
    // Wait for React app to load
    cy.wait(5000);
    
    // Try to find the page title
    cy.get('body').then(($body) => {
      const hasH1 = $body.find('h1').length > 0;
      const hasInputs = $body.find('input').length > 0;
      const hasForm = $body.find('form').length > 0;
      
      cy.log(`Has H1: ${hasH1}`);
      cy.log(`Has Inputs: ${hasInputs}`);
      cy.log(`Has Form: ${hasForm}`);
      
      if (hasInputs) {
        cy.log(`Input count: ${$body.find('input').length}`);
        $body.find('input').each((i, el) => {
          cy.log(`Input ${i}: type=${el.type}, placeholder=${el.placeholder}`);
        });
      }
    });
    
    cy.screenshot('login-page-debug');
  });
});
