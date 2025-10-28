describe('Dashboard and Emergencies flow', () => {
  it('should verify dashboard', () => {
    // Visit the root and assert it's on the dashboard
    cy.visit('/')
    cy.url().should('include', '/')
    cy.contains('Dashboard').should('exist')
  })

  it('should verify emergencies', () => {
    // Navigate to emergencies
    cy.visit('/emergencies')
    cy.contains('Emergencies').should('exist')
    cy.contains('New Phone Entry').should('exist').click()
  })

  it('should verify users', () => {
    // Navigate to users
    cy.visit('/users')
    cy.contains('Users').should('exist')
  })

  it('should verify dispatchers', () => {
    // Navigate to dispatchers
    cy.visit('/dispatchers')
    cy.contains('Dispatchers').should('exist')
    cy.contains('Add new Dispatcher').should('exist').click()
  })

  it('should verify ambulances', () => {
    // Navigate to ambulances
    cy.visit('/ambulances')
    cy.contains('Ambulances').should('exist')
  })

  it('should verify reports and download them as PDF', () => {
    // Navigate to reports
    cy.visit('/reports')
    cy.contains('Reports And Statistics').should('exist')

    // Spy on URL.createObjectURL to confirm it's called with a Blob
    cy.window().then((win) => {
      cy.spy(win.URL, 'createObjectURL').as('createObjectURL')
    })

    // Click the Download as PDF button
    cy.contains('Download as PDF').click()

    // Assert that createObjectURL was called with a Blob of type 'application/pdf'
    cy.get('@createObjectURL')
      .should('have.been.calledOnce')
      .then((spy) => {
        const blobArg = spy.getCall(0).args[0]
        expect(blobArg.type).to.eq('application/pdf')
      })
  })

  it('should verify profile', () => {
    // Navigate to profile
    cy.visit('/profile')
    cy.contains('Personal Information').should('exist')
  })
})
