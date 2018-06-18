import { glpiApiLink } from '../../public/config.json'

describe('SignIn', () => {
  beforeEach(function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/initSession`,
      response: { session_token: "12345678" }
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/search/Plugin/?range=0-0&`,
      response: {
        totalcount: 5
      }
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/Plugin/?range=0-5&`,
      response: [
        {"id":1,"directory":"flyvemdmdemo","name":"Flyve MDM Demo","version":"1.0.0-dev","state":1,"author":"<a href='http://www.teclib.com'>Teclib</a>","homepage":"","license":"AGPLv3+"},
      ]
    }).as('getFlyveDemo')

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/killSession`,
      response: {}
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/getFullSession`,
      response: {
        session: {
          glpiID: 256
        }
      }
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/User/256`,
      response: {}
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/User/256/UserEmail`,
      response: {}
    })

    cy.route({
      method: 'GET',
      url: `${glpiApiLink}/getGlpiConfig`,
      response: {
        "cfg_glpi":{
          password_min_length: 10,
          password_need_number: 1,
          password_need_letter: 1,
          password_need_caps: 1,
          password_need_symbol: 1,
          url_base: "https://your-url.com/glpi"
        }  
      }
    })

    localStorage.setItem('display',
     JSON.stringify({
      applicationsUploaded: false,
      devicesByOperatingSystemVersion: false,
      devicesByUsers: false,
      devicesCurrentlyManaged: false,
      filesUploaded: false,
      fleetsCurrentlyManaged: false,
      invitationsSent: false,
      numberUsers: false,
      animations: false,
      pendingInvitations: false
    }))
  })

  it('should login without problems', () => {
    cy.visit('/')
    cy.wait('@getFlyveDemo')
    cy.get('a[href="/signUp"]').should('be.visible') 
    cy.screenshot('login_userName', {capture: 'viewport'})
    cy.get('.win-textbox')
      .type('example name')
      .type('{enter}')
    cy.screenshot('login_password', {capture: 'viewport'})    
    cy.get('.win-textbox')
      .type('12345678')
      .type('{enter}')
    cy.get('.empty-message').should('be.visible') 
    cy.screenshot('home_noData', {capture: 'viewport'})
  })
})