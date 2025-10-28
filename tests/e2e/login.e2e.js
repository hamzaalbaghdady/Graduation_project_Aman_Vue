describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('displays the login form', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('logs in with invalid credentials', () => {
    cy.get('input[type="text"]').type('123456789')
    cy.get('input[type="password"]').type('password')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
  })

  it('logs in with valid credentials', () => {
    cy.get('input[type="text"]').type('123456789')
    cy.get('input[type="password"]').type('password')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')
    cy.contains('Dashboard').should('exist')
  })
})
