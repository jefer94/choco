/// <reference types="Cypress" />

context('Check editor global attributes', () => {
  it('Can visit page', () => {
    cy.visit('/landing')
  })

  it('Contain correct text in navbar', () => {
    cy.contains('span', 'C').should('be.visible')
    cy.contains('nav div', 'Choco Algorithm').should('be.visible')
  })
})
