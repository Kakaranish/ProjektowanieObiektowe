it("When valid email and password is entered, then user is successfully logged in", () => {
    cy.visit('http://localhost:2137/log-in');
    
    cy.get('input[name="email"]')
        .should('be.visible')
        .type('user@mail.com');

    cy.get('input[name="password"]')
        .should('be.visible')
        .type('Test123');

    cy.get('button[type="submit"]')
        .click();

    cy.url().should('eq', 'http://localhost:2137');
});

it("When user with given email does not exist, then there is log in failure", () => {
    cy.visit('http://localhost:2137/log-in');
    
    cy.get('input[name="email"]')
        .type('not-existing-user@mail.com');

    cy.get('input[name="password"]')
        .type('Test123');

    cy.get('button[type="submit"]')
        .click();

    cy.url().should('eq', 'http://localhost:2137/log-in');
    cy.get('p[id="error-msg"]').contains("Invalid email or password");
});

it("When user exists but password is invalid, then there is log in failure", () => {
    cy.visit('http://localhost:2137/log-in');
    
    cy.get('input[name="email"]')
        .type('user@mail.com');

    cy.get('input[name="password"]')
        .type('InvalidPassword123');

    cy.get('button[type="submit"]')
        .click();

    cy.url().should('eq', 'http://localhost:2137/log-in');
    cy.get('p[id="error-msg"]').contains("Invalid email or password");
});

it("When user has no account, then he/she can create it when redirected with \"Create new account\" button", () => {
    cy.visit('http://localhost:2137/log-in');
    
    cy.get('button[name="register"]')
        .should('be.visible')
        .click();
    
    cy.url().should('eq', 'http://localhost:2137/register');
});

it("When user forgot password, then he/she can restore it when redirected with \"Forgot password\" button", () => {
    cy.visit('http://localhost:2137/log-in');

    cy.get('button[name="forgot-passwd"]')
        .should('be.visible')
        .click();

    cy.url().should('eq', 'http://localhost:2137/forgot-password')
});