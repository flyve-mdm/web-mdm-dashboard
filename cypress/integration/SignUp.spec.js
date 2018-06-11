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
                totalcount: 5
            }
        })

        cy.route({
            method: 'POST',
            url: 'https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmdemoUser',
            response: {"id":600,"message":"You are not allowed to change the invitation token life"}
        })

        cy.route({
            method: 'GET',
            url: 'https://dev.flyve.org/glpi/apirest.php/killSession',
            response: {}
        })

        cy.route({
            method: 'POST',
            url: 'https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmdemoCaptcha',
            response: {"id":603,"message":""}
        })

        cy.route({
            method: 'GET',
            url: 'https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmdemoCaptcha/603?alt=media&',
            response: cy.fixture("images/captcha.jpg")
        })
    
        cy.route({
            method: 'GET',
            url: 'https://dev.flyve.org/glpi/apirest.php/Plugin/?range=0-5&',
            response: [
            {"id":1,"directory":"flyvemdmdemo","name":"Flyve MDM Demo","version":"1.0.0-dev","state":1,"author":"<a href='http://www.teclib.com'>Teclib</a>","homepage":"","license":"AGPLv3+"},
            ]
        }).as('getFlyveDemo')

        cy.route({
            method: 'GET',
            url: 'https://dev.flyve.org/glpi/apirest.php/getGlpiConfig',
            response: {
                "cfg_glpi": {
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
                animations: true,
                pendingInvitations: false
            })
        )
    })
  
    it('should login without problems', () => {
        cy.visit('/')
        cy.wait('@getFlyveDemo')
        cy.get('a[href="/signUp"]').click()
        cy.get('.btn')
        cy.screenshot('register_newUser', {capture: 'fullPage'})
        cy.get(':nth-child(1) > :nth-child(1) > .win-textbox')
            .type('email@teclib.com')
        cy.get(':nth-child(1) > :nth-child(2) > .win-textbox')
            .type('New user')
        cy.get(':nth-child(2) > :nth-child(1) > .win-textbox')
            .type('ABcd123.')
        cy.get(':nth-child(2) > :nth-child(2) > .win-textbox')
            .type('ABcd123.')
        cy.get(':nth-child(3) > .froms__col > .win-textbox')
            .type('v8k4v4')
        cy.get('.btn').click()
        cy.contains('Validate Account')
        cy.screenshot('validate_account', {capture: 'fullPage'})
    })
  })