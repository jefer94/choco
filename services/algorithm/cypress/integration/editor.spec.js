/// <reference types="Cypress" />

context('Check editor global', () => {
  it('Can visit page', () => {
    cy.visit('/')
    cy.screenshot('potato')
  })
})
