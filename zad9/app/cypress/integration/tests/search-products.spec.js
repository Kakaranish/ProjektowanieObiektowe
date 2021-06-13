/// <reference types="cypress" />

it("When search phrase is too short, then error is displayed", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('input[name="search-input"]')
        .should('be.visible')
        .type('x');

    cy.get('button[type="submit"]')
        .click();

    cy.get('p[id="error-msg"]')
        .contains("Search phrase is too short");

    cy.url().should('eq', 'http://localhost:2137/search')
});

it("When there are no results for given phrase, then \"No results\" header is displayed", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('input[name="search-input"]')
        .should('be.visible')
        .type('something-without-search-results');

    cy.get('button[type="submit"]')
        .click();

    cy.url().should('include', '?phrase=something-without-search-results');
    
    cy.get('p[id="results-title"]')
        .should('be.visible')
        .contains("No results");
});

it("When there are multiple results for given phrase, then they are paginated", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('input[name="search-input"]')
        .should('be.visible')
        .type('something-with-multiple-search-results');

    cy.get('button[type="submit"]')
        .click();

    cy.url().should('include', '?phrase=something-with-multiple-search-results');
    
    cy.get('p[id="results-title"]')
        .should('be.visible')
        .contains("Search results");

    cy.get('div[id="pagination"]')
        .should('be.visible');
});

it("When user clicks keyboard icon in search bar, then on-screen keyboard is displayed", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('img[id="on-screen-keyboard-btn"]')
        .should('be.visible')
        .click();

    cy.get('div[it="on-screen-keyboard-wrapper"]')
        .should('be.visible');
});

it("When user clicks \"I'm feeling lucky\" button in search bar, then single result is returned", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('input[name="search-input"]')
        .should('be.visible')
        .type('something-with-multiple-search-results');

    cy.get('button[id="feeling-lucky"]')
        .click();

    cy.url().should('include', '/feeling-lucky?phrase=something-with-multiple-search-results');
});