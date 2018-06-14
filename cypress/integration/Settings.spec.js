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

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/getActiveProfile`,
            response: {"active_profile":{"id":4,"name":"Super-Admin","interface":"central","is_default":0,"helpdesk_hardware":3,"helpdesk_item_type":["Computer","Monitor","NetworkEquipment","Peripheral","Phone","Printer","Software"],"ticket_status":[],"date_mod":null,"comment":null,"problem_status":[],"create_ticket_on_login":0,"tickettemplates_id":0,"change_status":null,"date_creation":null,"0":1,"armaditoscan:report":0,"backup":1055,"bookmark_public":31,"budget":255,"calendar":31,"cartridge":255,"certificate":255,"change":1279,"changevalidation":1044,"computer":255,"config":31,"consumable":255,"contact_enterprise":255,"contract":255,"device":31,"devicesimcard_pinpuk":3,"document":255,"domain":31,"dropdown":31,"entity":3327,"flyvemdm:agent":115,"flyvemdm:entity":897,"flyvemdm:file":127,"flyvemdm:fleet":127,"flyvemdm:flyvemdm":128,"flyvemdm:geolocation":127,"flyvemdm:invitation":31,"flyvemdm:invitationLog":1,"flyvemdm:package":127,"flyvemdm:policy":1,"flyvemdm:policycategory":1,"flyvemdm:taskstatus":1,"flyvemdm:wellknownpath":31,"flyvemdmdemo:captcha":0,"followup":15383,"global_validation":0,"group":159,"infocom":31,"internet":159,"itilcategory":31,"knowbase":15519,"knowbasecategory":31,"license":255,"line":127,"lineoperator":31,"link":159,"location":31,"logs":1,"monitor":255,"netpoint":31,"networking":255,"notification":31,"orion:report":1,"password_update":1,"peripheral":255,"phone":255,"planning":3073,"plugin_fusioninventory_agent":23,"plugin_fusioninventory_blacklist":23,"plugin_fusioninventory_collect":23,"plugin_fusioninventory_configsecurity":31,"plugin_fusioninventory_configuration":3,"plugin_fusioninventory_credential":23,"plugin_fusioninventory_credentialip":23,"plugin_fusioninventory_deploymirror":23,"plugin_fusioninventory_esx":23,"plugin_fusioninventory_group":23,"plugin_fusioninventory_ignoredimportdevice":23,"plugin_fusioninventory_importxml":4,"plugin_fusioninventory_iprange":23,"plugin_fusioninventory_lock":23,"plugin_fusioninventory_menu":1,"plugin_fusioninventory_networkequipment":23,"plugin_fusioninventory_package":23,"plugin_fusioninventory_printer":23,"plugin_fusioninventory_remotecontrol":1,"plugin_fusioninventory_reportnetworkequipment":1,"plugin_fusioninventory_reportprinter":1,"plugin_fusioninventory_rulecollect":23,"plugin_fusioninventory_ruleentity":23,"plugin_fusioninventory_ruleimport":23,"plugin_fusioninventory_rulelocation":23,"plugin_fusioninventory_selfpackage":31,"plugin_fusioninventory_task":23,"plugin_fusioninventory_unmanaged":31,"plugin_fusioninventory_wol":1,"printer":255,"problem":1279,"profile":159,"project":1279,"projecttask":1025,"queuednotification":31,"reminder_public":159,"reports":1,"reservation":1055,"rssfeed_public":159,"rule_dictionnary_dropdown":31,"rule_dictionnary_printer":31,"rule_dictionnary_software":31,"rule_import":31,"rule_ldap":31,"rule_mailcollector":31,"rule_softwarecategories":31,"rule_ticket":1055,"search_config":3103,"show_group_hardware":0,"slm":31,"software":255,"solutiontemplate":31,"state":31,"statistic":1,"task":13329,"taskcategory":31,"ticket":259231,"ticketcost":31,"ticketrecurrent":31,"tickettemplate":31,"ticketvalidation":15384,"transfer":31,"typedoc":31,"user":7327,"entities":[{"id":0,"name":"Root entity","is_recursive":0}]}}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/Entity/0`,
            response: {"id":0,"name":"Root entity","entities_id":-1,"completename":"Root entity","comment":null,"level":1,"sons_cache":null,"ancestors_cache":null,"address":"Example address","postcode":null,"town":null,"state":null,"country":null,"website":"http://www.teclib-edition.com/","phonenumber":34512702140,"fax":null,"email":"example@teclib.com","admin_email":null,"admin_email_name":null,"admin_reply":null,"admin_reply_name":null,"notification_subject_tag":null,"ldap_dn":null,"tag":null,"authldaps_id":0,"mail_domain":null,"entity_ldapfilter":null,"mailing_signature":null,"cartridges_alert_repeat":0,"consumables_alert_repeat":0,"use_licenses_alert":0,"send_licenses_alert_before_delay":0,"use_certificates_alert":-2,"send_certificates_alert_before_delay":-2,"use_contracts_alert":0,"send_contracts_alert_before_delay":0,"use_infocoms_alert":0,"send_infocoms_alert_before_delay":0,"use_reservations_alert":0,"autoclose_delay":0,"notclosed_delay":0,"calendars_id":0,"auto_assign_mode":-10,"tickettype":1,"max_closedate":null,"inquest_config":1,"inquest_rate":0,"inquest_delay":0,"inquest_URL":null,"autofill_warranty_date":0,"autofill_use_date":0,"autofill_buy_date":0,"autofill_delivery_date":0,"autofill_order_date":0,"tickettemplates_id":1,"entities_id_software":-10,"default_contract_alert":0,"default_infocom_alert":0,"default_cartridges_alarm_threshold":10,"default_consumables_alarm_threshold":10,"delay_send_emails":0,"is_notif_enable_default":1,"inquest_duration":0,"date_mod":"2018-04-27 23:21:03","date_creation":null,"autofill_decommission_date":0,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/-1"},{"rel":"TicketTemplate","href":"https://dev.flyve.org/glpi/apirest.php/TicketTemplate/1"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/-10"},{"rel":"Document_Item","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0/Document_Item/"}]}
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
        cy.get('ul > :nth-child(3) > a').click()
        cy.get('main').screenshot('settings_supervision', {capture: 'viewport'})
    })
})