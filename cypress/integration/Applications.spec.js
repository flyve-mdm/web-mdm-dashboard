import { glpiApiLink } from '../../public/config.json'

describe('Applications', () => {
    beforeEach(function () {
        cy.server()

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmPackage/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=4&forcedisplay[4]=5&forcedisplay[5]=6&order=ASC&range=0-14&`,
            response: {"totalcount":5,"count":5,"sort":1,"order":"ASC","data":[{"PluginFlyvemdmPackage.name":"com.uberspot.a2048","PluginFlyvemdmPackage.id":6,"PluginFlyvemdmPackage.alias":2048,"PluginFlyvemdmPackage.version":2,"PluginFlyvemdmPackage.icon":"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","PluginFlyvemdmPackage.Entity.completename":"Root entity"},{"PluginFlyvemdmPackage.name":"duckduckgo_1.apk","PluginFlyvemdmPackage.id":29,"PluginFlyvemdmPackage.alias":"DuckDuckGo ","PluginFlyvemdmPackage.version":"","PluginFlyvemdmPackage.icon":"","PluginFlyvemdmPackage.Entity.completename":"Root entity"},{"PluginFlyvemdmPackage.name":"Flashlight 100Kb No Ads_v1_apkpure.com (1).apk","PluginFlyvemdmPackage.id":25,"PluginFlyvemdmPackage.alias":"Example","PluginFlyvemdmPackage.version":"","PluginFlyvemdmPackage.icon":"","PluginFlyvemdmPackage.Entity.completename":"Root entity"},{"PluginFlyvemdmPackage.name":"org.fdroid.fdroid","PluginFlyvemdmPackage.id":3,"PluginFlyvemdmPackage.alias":"F-Droid","PluginFlyvemdmPackage.version":0.97,"PluginFlyvemdmPackage.icon":"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","PluginFlyvemdmPackage.Entity.completename":"Root entity"},{"PluginFlyvemdmPackage.name":"org.flyve.inventory.agent_37960.apk","PluginFlyvemdmPackage.id":27,"PluginFlyvemdmPackage.alias":"InventoryAgent","PluginFlyvemdmPackage.version":"","PluginFlyvemdmPackage.icon":"","PluginFlyvemdmPackage.Entity.completename":"Root entity"}],"content-range":"0-4/5"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/PluginFlyvemdmPackage/6`,
            response: {"id":6,"name":"com.uberspot.a2048","package_name":"com.uberspot.a2048","alias":2048,"version":2,"version_code":20,"icon":"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","filename":"flyvemdm/package//var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var","entities_id":0,"dl_filename":"5a172764898a95.5484936756fa7aa5ed741_com.uberspot.a2048_20.apk","plugin_orion_tasks_id":0,"parse_status":"parsed","filesize":0,"mime_type":"","links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}
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
        cy.visit('/app/applications')
        cy.contains('No selection')
        cy.get('#element__11')
        cy.get('main').screenshot('applications_noSelection', {capture: 'viewport'})
        cy.get('.win-itemscontainer').click('top')
        cy.get('main').screenshot('applications_content', {capture: 'viewport'})
        cy.get('.editIcon').click()
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('applications_edit', {capture: 'viewport'})
        cy.get('[aria-label="Add"] > .win-commandicon > .win-commandimage').click()
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('applications_add', {capture: 'viewport'})
    })
})
