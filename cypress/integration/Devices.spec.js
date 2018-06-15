import { glpiApiLink } from '../../public/config.json'

describe('Devices', () => {
    beforeEach(function () {
        cy.server()

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmAgent/?uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=12&order=ASC&range=0-14&`,
            response: {
                "totalcount":4,
                "count":4,
                "sort":1,
                "order":"ASC",
                "data":[
                    {"PluginFlyvemdmAgent.name":"device1@teclib.com","PluginFlyvemdmAgent.id":221,"PluginFlyvemdmAgent.PluginFlyvemdmFleet.name":"not managed fleet","PluginFlyvemdmAgent.Computer.id":916,"PluginFlyvemdmAgent.mdm_type":"android"},
                    {"PluginFlyvemdmAgent.name":"device2@teclib.com","PluginFlyvemdmAgent.id":234,"PluginFlyvemdmAgent.PluginFlyvemdmFleet.name":"MyFleet","PluginFlyvemdmAgent.Computer.id":216,"PluginFlyvemdmAgent.mdm_type":"android"}
                ],
                "content-range":"0-3/4"
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
  
    it('should navigate in users without problemss', () => {
        cy.visit('/app/devices')
        cy.contains('No selection')
        cy.get('main').screenshot('devices_noSelection', {capture: 'viewport'})
    })
})