import { glpiApiLink } from '../../public/config.json'

describe('Invitations', () => {
    beforeEach(function () {
        cy.server()
    
        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmInvitation/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&order=ASC&range=0-14&`,
            response: { 
                "totalcount": 3,
                "count": 3,
                "content-range": "0-2/3",
                "order": "ASC",
                "sort": 1,
                "data": [
                    {"PluginFlyvemdmInvitation.name":"Invitation","PluginFlyvemdmInvitation.id":1,"PluginFlyvemdmInvitation.User.name":"invitation1@teclib.com"},
                    {"PluginFlyvemdmInvitation.name":"Invitation","PluginFlyvemdmInvitation.id":2,"PluginFlyvemdmInvitation.User.name":"invitation2@teclib.com"},
                    {"PluginFlyvemdmInvitation.name":"Invitation","PluginFlyvemdmInvitation.id":3,"PluginFlyvemdmInvitation.User.name":"invitation3@teclib.com"}
                ]
            }
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

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmInvitationlog/?criteria[0][field]=4&criteria[0][searchtype]=equal&criteria[0][value]=3&uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=5&`,
            response: {
                "totalcount":0,
                "count":0,
                "sort":1,
                "order":"ASC",
                "content-range":"0-0/0",
                "data":[]
            }
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmInvitationlog/?criteria[0][field]=4&criteria[0][searchtype]=equal&criteria[0][value]=1&uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=5&`,
            response: {
                "totalcount":2,
                "count":2,
                "sort":1,
                "order":"ASC",
                "content-range":"0-1/2",
                "data":[
                    {
                        "PluginFlyvemdmInvitationlog.id":11,
                        "PluginFlyvemdmInvitationlog.date_creation":"2018-04-25 21:57:54",
                        "PluginFlyvemdmInvitationlog.PluginFlyvemdmInvitation.id":12,
                        "PluginFlyvemdmInvitationlog.event":"Bad agent version"
                    },
                    {
                        "PluginFlyvemdmInvitationlog.id":13,
                        "PluginFlyvemdmInvitationlog.date_creation":"2018-04-25 21:59:02",
                        "PluginFlyvemdmInvitationlog.PluginFlyvemdmInvitation.id":14,
                        "PluginFlyvemdmInvitationlog.event":"Wrong email address"
                    }
                ]
            }
        })
  
        localStorage.setItem('sessionToken', 'token1234')
        localStorage.setItem('showNotifications', 'true')
        localStorage.setItem('notificationType', 'Toast')

        localStorage.setItem('currentUser',
            JSON.stringify({
                id:123,
                name:"exampleName",
                email: "example@teclib.com",
                picture: null
            })
        )

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
            })
        )
    })
  
    it('should navigate in invitations without problemss', () => {
        cy.visit('/app/invitations')
        cy.contains('No selection')
        cy.get('#element__11')
        cy.get('main').screenshot('invitations_noSelection', {capture: 'viewport'})
        cy.get('.win-itemscontainer').click('top')
        cy.contains('Bad agent version')
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('invitations_logs', {capture: 'viewport'})
        cy.get('.flex-block__list .win-itemscontainer').click('bottom')
        cy.contains('No logs Available')
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('invitations_noLogs', {capture: 'viewport'})
    })
  })