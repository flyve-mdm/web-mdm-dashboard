import { glpiApiLink } from '../../public/config.json'

describe('Applications', () => {
    beforeEach(function () {
        cy.server()

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmFleet/?uid_cols=true&forcedisplay[0]=2&order=ASC&range=0-14&`,
            response: {"totalcount":3,"count":3,"sort":1,"order":"ASC","data":[{"PluginFlyvemdmFleet.name":"demo fleet","PluginFlyvemdmFleet.id":58},{"PluginFlyvemdmFleet.name":"DIOHz0r Tests","PluginFlyvemdmFleet.id":173},{"PluginFlyvemdmFleet.name":"Files&Apk","PluginFlyvemdmFleet.id":57}],"content-range":"0-2/3"}
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

    it('should navigate in users without problemss', () => {
        cy.visit('/app/fleets')
        cy.contains('No selection')
        cy.get('main').screenshot('fleets_noSelection', {capture: 'viewport'})
    })
})
