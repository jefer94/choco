/// <reference types="Cypress" />

context('Check editor global attributes', () => {
  before(() => {
    cy.fixture('user.json').as('user')
  })

  it('Can visit page', () => {
    cy.visit('/login')
  })

  it('Contain correct text in navbar', async () => {
    const x = await cy.fixture('user.json')
    cy.log(x.toString())
    cy.contains('div', 'C').should('be.visible')
    cy.contains('h1', 'Choco Algorithm').should('be.visible')
  })
})
