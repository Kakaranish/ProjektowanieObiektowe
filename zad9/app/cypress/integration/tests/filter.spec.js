/// <reference types="cypress" />

it("When \"Filters\" dropdown is clicked, then filter prompt is displayed", () => {
    cy.visit('http://localhost:2137/search?phrase=something-with-results');

    cy.get('div[id="filters-container"]')
        .should('not.be.visible')

    cy.get('button[id="btn-filters"]')
        .should('be.visible')
        .type('x');

    cy.get('div[id="filters-container"]')
        .should('be.visible');
});

it("When there are no results for search, then filter button should not be visible", () => {
    cy.visit('http://localhost:2137/search');

    cy.get('input[name="search-input"]')
        .should('be.visible')
        .type('something-without-search-results');

    cy.get('button[type="submit"]')
        .click();

    cy.url()
        .should('include', '?phrase=something-without-search-results');
    
    cy.get('p[id="results-title"]')
        .should('be.visible')
        .contains("No results");

    cy.get('button[id="btn-filters"]')
        .should('not.be.visible');
});

it("When filter option is clicked, then filtered results are shown", () => {
    cy.visit('http://localhost:2137/search?something-with-results');

    cy.get('div[id="filters-container"]')
        .should('not.be.visible')

    cy.get('button[id="btn-filters"]')
        .should('be.visible')
        .type('x');

    cy.get('div[id="filters-container"]')
        .should('be.visible');

    cy.get('input[id="price-filter"]')
        .type("20")
    
    cy.get('button[id="filter"]')
        .click();

    cy.url().should('eq', 'http://localhost:2137/search?phrase=something-with-results&filter-price=20')
});

it("When \"X\" icon next to filter type is clicked, then filter option is removed", () => {
    cy.visit('http://localhost:2137/search?phrase=something-with-results&filter-price=20');

    cy.get('div[id="filters-container"]')
        .should('not.be.visible')

    cy.get('button[id="btn-filters"]')
        .should('be.visible')
        .type('x');

    cy.get('div[id="filters-container"]')
        .should('be.visible');

    cy.get('button[id="filter-price-delete]')
        .should('be.visible')
        .click();

    cy.get('button[id="filter"]')
        .click();

    cy.visit('http://localhost:2137/search?phrase=something-with-results');
});

it("Filtering should be available on each results page", () => {
    cy.visit('http://localhost:2137/search?phrase=sth-with-results&page=1');

    cy.get('button[id="btn-filters"]')
        .should('be.visible');

    cy.visit('http://localhost:2137/search?phrase=sth-with-results&page=2');

    cy.get('button[id="btn-filters"]')
        .should('be.visible');
});