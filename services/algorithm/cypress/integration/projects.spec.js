/// <reference types="Cypress" />

context('Check editor global attributes', () => {
  before(() => {
    cy.fixture('user.json').as('user')
  })

  it('Can visit page', () => {
    cy.visit('/projects')
  })
})
