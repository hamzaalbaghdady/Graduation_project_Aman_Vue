describe('Dashboard and Emergencies flow', () => {
  it('should verify dashboard, navigate to emergencies, create new phone entry', () => {
    // Visit the emergencies page and assert it's on the emergencies
    cy.visit('/emergencies')
    cy.url().should('include', '/emergencies')
    cy.contains('Emergencies').should('exist')

    // Click the "New Phone Entry" button
    cy.contains('New Phone Entry').should('exist').click()

    // Fill out the form fields by placeholder text
    cy.get('input[placeholder="Enter caller name (if known)"]').type('Jane Smith')
    cy.get('input[placeholder="Enter caller ID (if known)"]').type('JS12345')
    cy.get('input[placeholder="+1 (555) 123-4567"]').type('+1 (555) 987-6543')

    cy.get('input[placeholder="Enter city"]').type('Springfield')
    cy.get('input[placeholder="Enter neighborhood"]').type('Downtown')
    cy.get('input[placeholder="Enter street address"]').type('742 Evergreen Terrace')
    cy.get('input[placeholder="Enter house name"]').type('Simpson')

    cy.get('select').select('🔥 Fire') // Selecting by visible option text

    cy.get('textarea[placeholder="Enter any additional details about the emergency..."]').type(
      'Fire in the kitchen area.',
    )

    // Submit the form by clicking "+ Create SOS Entry"
    cy.contains('+ Create SOS Entry').click()

    // Verify the form submission result (e.g., success message or redirection)
    cy.contains('Emergency stored successfully').should('exist')
  })
})
