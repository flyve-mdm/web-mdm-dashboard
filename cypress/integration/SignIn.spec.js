describe('SignIn', () => {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://dev.flyve.org/glpi/apirest.php/initSession',
      response: { session_token: "12345678" }
    })
    cy.route({
      method: 'GET',
      url: 'https://dev.flyve.org/glpi/apirest.php/search/Plugin/?range=0-0&',
      response: {
        totalcount: 1
      }
    })
    cy.route({
      method: 'GET',
      url: 'https://dev.flyve.org/glpi/apirest.php/Plugin/?range=0-1&',
      response: [
        {"id":1,"directory":"flyvemdmdemo","name":"Flyve MDM Demo","version":"1.0.0-dev","state":1,"author":"<a href='http://www.teclib.com'>Teclib</a>","homepage":"","license":"AGPLv3+"},
      ]
    })
    cy.route({
      method: 'GET',
      url: 'https://dev.flyve.org/glpi/apirest.php/killSession',
      response: {}
    })
  })

  it('should assert that true is equal to true', () => {
    cy.visit('/')
    expect(true).to.equal(true)
  })
})