/// <reference types="cypress" />

it("When user is logged, on seller profile page has \"Send message\" button", () => {
    cy.visit('http://localhost:2137/seller/689c1d5a-08d4-4133-ab39-04d53828b222');

    cy.get('button[id="chat-with-seller-btn]')
        .click();

    cy.url().should('eq', 'http://localhost:2137/chat?seller=689c1d5a-08d4-4133-ab39-04d53828b222');
});

it("When user clicks emoji icon, then window with available emojis should be displayed", () => {
    cy.visit('http://localhost:2137/chat?seller=689c1d5a-08d4-4133-ab39-04d53828b222');

    cy.get('div[it="emoji-container"]')
        .should('not.be.visible');

    cy.get('button[id="emoji-btn"]')
        .click();

    cy.get('div[it="emoji-container"]')
        .should('be.visible');
});

it("When user clicks \"Send\" button, then message is sent and visible in chat", () => {
    cy.visit('http://localhost:2137/chat?seller=689c1d5a-08d4-4133-ab39-04d53828b222');

    cy.get('input[name="msg-input"]')
        .should('be.visible')
        .type("some message");

    cy.get('button[type="submit"]')
        .click();
    
    cy.get('div')
        .contains("some message");
});

it("When user typed more than 160 characters, then error message should be displayed", () => {
    cy.visit('http://localhost:2137/chat?seller=689c1d5a-08d4-4133-ab39-04d53828b222');

    const msg = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    cy.get('input[name="msg-input"]')
        .should('be.visible')
        .type(msg);

    cy.get('button[type="submit"]')
        .click();
    
    cy.get('p[id="error-msg"]')
        .contains("Message cannot be longer than 160 characters.");
});

it("When user tries to send empty message, then error message should be displayed", () => {
    cy.visit('http://localhost:2137/chat?seller=689c1d5a-08d4-4133-ab39-04d53828b222');

    cy.get('input[name="msg-input"]')
        .should('be.visible')
        .type('        ');

    cy.get('button[type="submit"]')
        .click();
    
    cy.get('p[id="error-msg"]')
        .contains("Message cannot be empty or whitespaces");
});