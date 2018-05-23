describe('App E2E', () => {
  it('should assert that true is equal to true', () => {
    cy.visit('/')
    expect(true).to.equal(true)
  })
})