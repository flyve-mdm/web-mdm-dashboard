import { glpiApiLink } from '../../public/config.json'

describe('SignIn', () => {
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
            url: `${glpiApiLink}/search/Plugin/?range=0-0&`,
            response: {"totalcount":5,"count":1,"sort":1,"order":"ASC","data":[{"1":"armaditoscan"}],"content-range":"0-0/5"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/Plugin/?range=0-5&`,
            response: [{"id":1,"directory":"flyvemdm","name":"Flyve Mobile Device Management","version":"2.0.0-dev","state":1,"author":"<a href=\"http://www.teclib.com\">Teclib</a>","homepage":"","license":"AGPLv3+"},{"id":2,"directory":"flyvemdmdemo","name":"Flyve MDM Demo","version":"1.0.0-dev","state":1,"author":"<a href='http://www.teclib.com'>Teclib</a>","homepage":"","license":"AGPLv3+"},{"id":3,"directory":"fusioninventory","name":"FusionInventory","version":"9.2+1.0","state":1,"author":"<a href=\"mailto:david@durieux.family\">David DURIEUX</a>\n                                & FusionInventory team","homepage":"http://forge.fusioninventory.org/projects/fusioninventory-for-glpi/","license":"AGPLv3+"},{"id":4,"directory":"orion","name":"orion","version":"0.1-dev","state":1,"author":"<a href=\"http://www.teclib.com\">Teclib'</a>","homepage":"","license":""},{"id":5,"directory":"armaditoscan","name":"armaditoscan","version":"0.1-dev","state":4,"author":"<a href=\"http://www.teclib.com\">Teclib'</a>","homepage":"","license":""}]
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
                animations: true,
                pendingInvitations: false
            })
        )
    })
  
    it('should navigate in invitations without problemss', () => {
        cy.visit('/app/about')
        cy.contains('No selection')
        cy.get('main').screenshot('about_noSelection', {capture: 'viewport'})
        cy.visit('/app/about/overview')
        cy.get('.content-pane > h2')
        cy.get('main').screenshot('about_overview', {capture: 'viewport'})
        cy.visit('/app/about/contact')
        cy.get('main').screenshot('about_contact', {capture: 'viewport'})
        cy.visit('/app/about/term')
        cy.get('main').screenshot('about_term', {capture: 'viewport'})
    })
  })