/// <reference types="Cypress" />

context('Check editor lang es', () => {
  it('Can visit page', () => {
    cy.visit('/landing')
  })

  it('Contain correct text in navbar', () => {
    cy.contains('a', 'Acceder').should('be.visible')
    cy.contains('a', 'Registrarse').should('be.visible')
  })
})
