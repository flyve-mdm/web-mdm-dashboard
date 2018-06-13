import { glpiApiLink } from '../../public/config.json'

describe('Settings', () => {
    beforeEach(function () {
        cy.server()

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
            url: `${glpiApiLink}/search/Plugin/?range=0-0&`,
            response: {"totalcount":5,"count":1,"sort":1,"order":"ASC","data":[{"1":"armaditoscan"}],"content-range":"0-0/5"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}Plugin/?range=0-5&`,
            response: [{"id":1,"directory":"flyvemdm","name":"Flyve Mobile Device Management","version":"2.0.0-dev","state":1,"author":"<a href=\"http://www.teclib.com\">Teclib</a>","homepage":"","license":"AGPLv3+"},{"id":2,"directory":"flyvemdmdemo","name":"Flyve MDM Demo","version":"1.0.0-dev","state":1,"author":"<a href='http://www.teclib.com'>Teclib</a>","homepage":"","license":"AGPLv3+"},{"id":3,"directory":"fusioninventory","name":"FusionInventory","version":"9.2+1.0","state":1,"author":"<a href=\"mailto:david@durieux.family\">David DURIEUX</a>\n                                & FusionInventory team","homepage":"http://forge.fusioninventory.org/projects/fusioninventory-for-glpi/","license":"AGPLv3+"},{"id":4,"directory":"orion","name":"orion","version":"0.1-dev","state":1,"author":"<a href=\"http://www.teclib.com\">Teclib'</a>","homepage":"","license":""},{"id":5,"directory":"armaditoscan","name":"armaditoscan","version":"0.1-dev","state":4,"author":"<a href=\"http://www.teclib.com\">Teclib'</a>","homepage":"","license":""}]
        })

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

    it('should login without problems', () => {
        cy.visit('/app/settings')
        cy.contains('No selection')
        cy.get('main').screenshot('settings_noSelection', {capture: 'viewport'})
        cy.get('ul > :nth-child(6) > a').click()
        cy.get('main').screenshot('settings_display', {capture: 'viewport'})
        cy.get('ul > :nth-child(5) > a').click()
        cy.get('main').screenshot('settings_notifications', {capture: 'viewport'})
        cy.get('ul > :nth-child(4) > a').click()
        cy.get('.content-pane > h2')
        cy.get('main').screenshot('settings_security', {capture: 'viewport'})
        cy.get(':nth-child(2) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_changePassword', {capture: 'viewport'})
        cy.get('.btn--secondary').click()
        cy.get(':nth-child(3) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_killSession', {capture: 'viewport'})
        cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
        cy.get(':nth-child(4) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_deleteBrowserData', {capture: 'viewport'})
        cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
    })
})