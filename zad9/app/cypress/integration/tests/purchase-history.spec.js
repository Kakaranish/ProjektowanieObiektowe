/// <reference types="cypress" />

it("When user clicks \"My purchases\" button, then he/she is redirected to purchases history page", () => {
    cy.visit('http://localhost:2137');

    cy.get('a[id="my-purchases-link"]')
        .contains("My purchases")
        .click();

    cy.url().should('eq', 'http://localhost:2137/purchases');
});

it("When user clicks specific purchase, then he/she is redirected to detailed info about this purchase", () => {
    cy.visit('http://localhost:2137/purchases');

    cy.get('a[id="purchase-43a8abc9-0448-4fe6-a2f1-b43f4ff47041"]')
        .contains("Purchase 43a8abc9-0448-4fe6-a2f1-b43f4ff47041")
        .click();
    
    cy.url().should('include', '/43a8abc9-0448-4fe6-a2f1-b43f4ff47041');
});

it("Purchase history should be paginated", () => {
    cy.visit('http://localhost:2137/purchases?page=1');

    cy.get('a[id="purchase-1"]').should('exist');
    cy.get('a[id="purchase-2"]').should('exist');
    cy.get('a[id="purchase-3"]').should('exist');
    cy.get('a[id="purchase-4"]').should('exist');
    cy.get('a[id="purchase-5"]').should('exist');
    cy.get('a[id="purchase-6"]').should('not.exist');
    cy.get('a[id="purchase-7"]').should('not.exist');
    cy.get('a[id="purchase-8"]').should('not.exist');
    cy.get('a[id="purchase-9"]').should('not.exist');
    cy.get('a[id="purchase-10"]').should('not.exist');

    cy.visit('http://localhost:2137/purchases?page=2');

    cy.get('a[id="purchase-1"]').should('not.exist');
    cy.get('a[id="purchase-2"]').should('not.exist');
    cy.get('a[id="purchase-3"]').should('not.exist');
    cy.get('a[id="purchase-4"]').should('not.exist');
    cy.get('a[id="purchase-5"]').should('not.exist');
    cy.get('a[id="purchase-6"]').should('exist');
    cy.get('a[id="purchase-7"]').should('exist');
    cy.get('a[id="purchase-8"]').should('exist');
    cy.get('a[id="purchase-9"]').should('exist');
    cy.get('a[id="purchase-10"]').should('exist');
});

it("Purchase history should consist of \"Last orders\" and \"Old orders\" sections", () => {
    cy.visit('http://localhost:2137/purchases');

    cy.get('p[id="last-orders"]')
        .contains("Last orders")
        .should('be.visible');

    cy.get('p[id="old-orders"]')
        .contains("Old orders")
        .should('be.visible');
});

it("Each purchase preview should consist of price, image and title", () => {
    cy.visit('http://localhost:2137/purchases');

    cy.get('a[id="purchase-1"]').should('exist');
    cy.get('img[id="purchase-1-img"]').should('exist');
    cy.get('p[id="purchase-1-title"]').should('exist');
    cy.get('b[id="purchase-1-price"]').should('exist');

    cy.get('a[id="purchase-2"]').should('exist');
    cy.get('img[id="purchase-2-img"]').should('exist');
    cy.get('p[id="purchase-2-title"]').should('exist');
    cy.get('b[id="purchase-2-price"]').should('exist');
});