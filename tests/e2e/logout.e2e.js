describe('Logout Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the dashboard', () => {
    cy.url().should('include', '/')
    cy.contains('Dashboard').should('exist')
  })

  it('logs out from the dashboard', () => {
    // Click the "New Phone Entry" button
    cy.contains('Hamza Albaghdady').should('exist').click()
    cy.contains(' Logout ').should('exist').click()
    cy.url().should('include', '/login')
  })
})
