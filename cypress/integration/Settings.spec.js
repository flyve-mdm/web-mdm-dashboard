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
            url: `${glpiApiLink}/Plugin/?range=0-5&`,
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

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmAgent/?`,
            response: {"totalcount":4,"count":4,"sort":1,"order":"ASC","data":[{"1":"pspntzlm@hi2.in","3":"not managed fleet","11":1,"12":"android","4":916},{"1":"tbugier@teclib.com","3":"MyFleet","11":1,"12":"android","4":216},{"1":"tbugier@teclib.com","3":"not managed fleet","11":0,"12":"android","4":126},{"1":"tbugier@teclib.com","3":"not managed fleet","11":1,"12":"android","4":1272}],"content-range":"0-3/4"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmPackage/?`,
            response: {"totalcount":6,"count":6,"sort":1,"order":"ASC","data":[{"1":"com.uberspot.a2048","3":2048,"4":2,"5":"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"},{"1":"duckduckgo_1.apk","3":"DuckDuckGo ","4":"","5":""},{"1":"Flashlight 100Kb No Ads_v1_apkpure.com (1).apk","3":"Example","4":"","5":""},{"1":"mercado libre","3":"ML movil","4":"","5":""},{"1":"org.fdroid.fdroid","3":"F-Droid","4":0.97,"5":"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"},{"1":"org.flyve.inventory.agent_37960.apk","3":"InventoryAgent","4":"","5":""}],"content-range":"0-5/6"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/User/?`,
            response: {"totalcount":64,"count":15,"sort":1,"order":"ASC","data":[{"1":"a@a.a","34":null,"5":null,"6":null,"3":null,"8":1},{"1":"aknpkqzo@hi2.in","34":"Manganiello","5":"aknpkqzo@hi2.in","6":null,"3":null,"8":1},{"1":"asa@12.sd","34":null,"5":"asa@12.sd","6":null,"3":null,"8":1},{"1":"blu@hi2.in","34":"Rondon","5":"blu@hi2.in","6":null,"3":null,"8":1},{"1":"demo","34":"examples","5":null,"6":"","3":null,"8":1},{"1":"dioh.teclib@gmail.com","34":"Emulator","5":"dioh.teclib@gmail.com","6":null,"3":null,"8":1},{"1":"example@teclib.com","34":"example","5":"myemail@teclib.com","6":555555,"3":null,"8":1},{"1":"exampleflyve@teclib.com","34":"example","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-04451538-0b19-445d-89e3-28a86a2513ed","34":"eb0df663","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-3c0ee43b-102b-4db8-b3db-60583291758a","34":"Unknown","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-3cc02ee5-567a-4297-94d4-9673c65be31d","34":"4df1f6ea5f3e7f05","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-58a9d705-5f72-4167-866e-2157c694a6bd","34":"Unknown","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-7b280c76-1440-4f5b-b963-f45a3f3aff80","34":"Unknown","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-d16451d0-7a50-4d55-b809-323f06be4d71","34":"3FAB57E0-590D-43EF-976A-39F266E2BC1F","5":null,"6":null,"3":null,"8":1},{"1":"flyvemdm-ec021956-d7f2-412d-988e-56831c1c1018","34":"Unknown","5":null,"6":null,"3":null,"8":1}],"content-range":"0-15/64"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmInvitation/?`,
            response: {"totalcount":23,"count":15,"sort":1,"order":"ASC","data":[{"1":"Invitation","3":"pspntzlm@hi2.in","4":"pending","5":"2018-06-01 16:36:54"},{"1":"Invitation","3":"gianfrancomanganiello1997@gmail.com","4":"pending","5":"2018-05-02 21:49:50"},{"1":"Invitation","3":"szwvdm@hi2.in","4":"pending","5":"2018-05-02 21:50:30"},{"1":"Invitation","3":null,"4":"pending","5":"2018-05-03 21:13:27"},{"1":"Invitation","3":"tbugier@teclib.com","4":"pending","5":"2018-05-05 01:54:05"},{"1":"Invitation","3":"blu@hi2.in","4":"pending","5":"2018-05-17 21:53:31"},{"1":"Invitation","3":"jnlk@hl.b","4":"pending","5":"2018-05-15 16:51:58"},{"1":"Invitation","3":"sdfdsf@fwf.fd","4":"pending","5":"2018-05-15 16:53:39"},{"1":"Invitation","3":"gdfg@f.h","4":"pending","5":"2018-05-28 14:56:20"},{"1":"Invitation","3":"zzz@z.z","4":"pending","5":"2018-05-28 14:56:53"},{"1":"Invitation","3":"ghnpn@hi2.in","4":"pending","5":"2018-05-30 19:47:21"},{"1":"Invitation","3":"aknpkqzo@hi2.in","4":"pending","5":"2018-05-30 20:19:29"},{"1":"Invitation","3":"s@s.s","4":"pending","5":"2018-06-05 17:27:39"},{"1":"Invitation","3":"fs@dd.f","4":"pending","5":"2018-06-05 22:29:53"},{"1":"Invitation","3":"hrondon@teclib.c","4":"pending","5":"2018-06-07 23:06:53"}],"content-range":"0-15/23"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmFile/?`,
            response: {"totalcount":4,"count":4,"sort":1,"order":"ASC","data":[{"1":"decoded.jpeg","4":null},{"1":"IMG.jpg","4":null},{"1":"logo-plugin.png","4":null},{"1":"logo2.png","4":null}],"content-range":"0-3/4"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmFleet/?`,
            response: {"totalcount":12,"count":12,"sort":1,"order":"ASC","data":[{"1":"demo fleet"},{"1":"DIOHz0r Tests"},{"1":"Files&Apk"},{"1":"fleet"},{"1":"FlyveDevMcy"},{"1":"Multiple file"},{"1":"MyFleet"},{"1":"New Fleet"},{"1":"New Fleet copy"},{"1":"not managed fleet"},{"1":"Policies test"},{"1":"test"}],"content-range":"0-11/12"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmPolicy/?`,
            response: {"totalcount":42,"count":15,"sort":1,"order":"ASC","data":[{"1":"Audio profile mode"},{"1":"Deploy application"},{"1":"Deploy file"},{"1":"Disable accessibility sounds"},{"1":"Disable airplane mode"},{"1":"Disable alarm sounds"},{"1":"Disable Bluetooth"},{"1":"Disable Camera"},{"1":"Disable DTMF sounds"},{"1":"Disable GPS"},{"1":"Disable hotspot and tethering"},{"1":"Disable media sounds"},{"1":"Disable Mobile line"},{"1":"Disable NFC"},{"1":"Disable notifications sounds"}],"content-range":"0-15/42"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmPolicyCategory/?`,
            response: {"totalcount":13,"count":13,"sort":1,"order":"ASC","data":[{"1":"Configuration"},{"1":"Configuration > User interface"},{"1":"Deployment"},{"1":"MDM"},{"1":"Mobile Device Management"},{"1":"Security"},{"1":"Security > Authentication"},{"1":"Security > Authentication > Password"},{"1":"Security > Encryption"},{"1":"Security > Peripherals"},{"1":"Security > Phone"},{"1":"Security > USB"},{"1":"Security > User interface"}],"content-range":"0-12/13"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/PluginFlyvemdmEntityconfig/0`,
            response: [{"id":0,"entities_id":0,"enroll_token":null,"agent_token_life":"P8D","support_name":"Great support","support_phone":"+33 123456789","support_website":"https://mygreatsupport.com","support_email":"greatsupport@example.com","support_address":"Great Support\r\n1 Support Avenue\r\nNot Cupertino\r\n123456 Somewhere in the world","managed":0,"download_url":"https://play.google.com/store/apps/details?id=com.teclib.flyvemdm","device_limit":0,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}]
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/User/534`,
            response: {"id":534,"name":"gianfranco","phone":"","phone2":"","mobile":"","realname":"Gianfranco","firstname":"gian","locations_id":0,"language":null,"use_mode":2,"list_limit":null,"is_active":1,"comment":"","auths_id":0,"authtype":1,"last_login":"2018-06-14 14:44:08","date_mod":"2018-05-11 21:23:35","date_sync":null,"is_deleted":0,"profiles_id":0,"entities_id":0,"usertitles_id":1,"usercategories_id":0,"date_format":null,"number_format":null,"names_format":null,"csv_delimiter":null,"is_ids_visible":null,"use_flat_dropdowntree":null,"show_jobs_at_login":null,"priority_1":null,"priority_2":null,"priority_3":null,"priority_4":null,"priority_5":null,"priority_6":null,"followup_private":null,"task_private":null,"default_requesttypes_id":null,"password_forget_token":null,"password_forget_token_date":null,"user_dn":null,"registration_number":"","show_count_on_tabs":null,"refresh_ticket_list":null,"set_default_tech":null,"personal_token":"aPhm1qRu4E7bykyYkCdBKO4bjbuCvc9kJcZLpktW","personal_token_date":"2018-05-10 15:34:17","display_count_on_home":null,"notification_to_myself":null,"duedateok_color":null,"duedatewarning_color":null,"duedatecritical_color":null,"duedatewarning_less":null,"duedatecritical_less":null,"duedatewarning_unit":null,"duedatecritical_unit":null,"display_options":null,"is_deleted_ldap":0,"pdffont":null,"picture":"profile.png","begin_date":null,"end_date":null,"keep_devices_when_purging_item":null,"privatebookmarkorder":null,"backcreated":null,"task_state":null,"layout":null,"palette":null,"ticket_timeline":null,"ticket_timeline_keep_replaced_tabs":null,"set_default_requester":null,"lock_autolock_mode":null,"lock_directunlock_notification":null,"date_creation":"2018-04-27 23:29:58","highcontrast_css":null,"plannings":null,"api_token":null,"api_token_date":null,"sync_field":null,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"UserTitle","href":"https://dev.flyve.org/glpi/apirest.php/UserTitle/1"},{"rel":"Document_Item","href":"https://dev.flyve.org/glpi/apirest.php/User/534/Document_Item/"}]}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/User/534/UserEmail`,
            response: []
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/Location/?range=0-200&forcedisplay[0]=2&v`,
            response: {"id":534,"name":"gianfranco","phone":"","phone2":"","mobile":"","realname":"Gianfranco","firstname":"gian","locations_id":0,"language":null,"use_mode":2,"list_limit":null,"is_active":1,"comment":"","auths_id":0,"authtype":1,"last_login":"2018-06-14 14:44:08","date_mod":"2018-05-11 21:23:35","date_sync":null,"is_deleted":0,"profiles_id":0,"entities_id":0,"usertitles_id":1,"usercategories_id":0,"date_format":null,"number_format":null,"names_format":null,"csv_delimiter":null,"is_ids_visible":null,"use_flat_dropdowntree":null,"show_jobs_at_login":null,"priority_1":null,"priority_2":null,"priority_3":null,"priority_4":null,"priority_5":null,"priority_6":null,"followup_private":null,"task_private":null,"default_requesttypes_id":null,"password_forget_token":null,"password_forget_token_date":null,"user_dn":null,"registration_number":"","show_count_on_tabs":null,"refresh_ticket_list":null,"set_default_tech":null,"personal_token":"aPhm1qRu4E7bykyYkCdBKO4bjbuCvc9kJcZLpktW","personal_token_date":"2018-05-10 15:34:17","display_count_on_home":null,"notification_to_myself":null,"duedateok_color":null,"duedatewarning_color":null,"duedatecritical_color":null,"duedatewarning_less":null,"duedatecritical_less":null,"duedatewarning_unit":null,"duedatecritical_unit":null,"display_options":null,"is_deleted_ldap":0,"pdffont":null,"picture":"profile.png","begin_date":null,"end_date":null,"keep_devices_when_purging_item":null,"privatebookmarkorder":null,"backcreated":null,"task_state":null,"layout":null,"palette":null,"ticket_timeline":null,"ticket_timeline_keep_replaced_tabs":null,"set_default_requester":null,"lock_autolock_mode":null,"lock_directunlock_notification":null,"date_creation":"2018-04-27 23:29:58","highcontrast_css":null,"plannings":null,"api_token":null,"api_token_date":null,"sync_field":null,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"UserTitle","href":"https://dev.flyve.org/glpi/apirest.php/UserTitle/1"},{"rel":"Document_Item","href":"https://dev.flyve.org/glpi/apirest.php/User/534/Document_Item/"}]}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/getMyProfiles`,
            response: {"myprofiles":[{"id":4,"name":"Super-Admin","entities":[{"id":0,"name":"Root entity","is_recursive":0}]}]}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/UserTitle/?range=0-200&forcedisplay[0]=2&`,
            response: {"totalcount":1,"count":1,"sort":1,"order":"ASC","data":[{"1":"Example location","80":"Root entity","2":1}],"content-range":"0-0/1"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/UserCategory/?range=0-200&forcedisplay[0]=2&`,
            response: {"totalcount":2,"count":2,"sort":1,"order":"ASC","data":[{"1":"user category 1","2":1},{"1":"www","2":2}],"content-range":"0-1/2"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/getMyEntities`,
            response: {"myentities":[{"id":0,"name":"Root entity"}]}
        })


        localStorage.setItem('currentUser',
            JSON.stringify({
                id:534,
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

    it('should login without problems', () => {
        cy.visit('/app/settings')
        cy.contains('No selection')
        cy.get('main').screenshot('settings_noSelection', {capture: 'viewport'})
        cy.get('.header-block').click('topRight')
        cy.get('ul > :nth-child(6) > a').click()
        cy.get('main').screenshot('settings_display', {capture: 'viewport'})
        cy.get('.header-block').click('topRight')
        cy.get('ul > :nth-child(5) > a').click()
        cy.get('main').screenshot('settings_notifications', {capture: 'viewport'})
        cy.get('ul > :nth-child(4) > a').click()
        cy.get('.header-block').click('topRight')
        cy.get('.content-pane > h2')
        cy.get('main').screenshot('settings_security', {capture: 'viewport'})
        cy.get('.header-block').click('topRight')
        cy.get(':nth-child(2) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_changePassword', {capture: 'viewport'})
        cy.get('.btn--secondary').click()
        cy.get('.header-block').click('topRight')
        cy.get(':nth-child(3) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_killSession', {capture: 'viewport'})
        cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
        cy.get('.header-block').click('topRight')
        cy.get(':nth-child(4) > .list-element__controller > .btn').click()
        cy.get('main').screenshot('settings_deleteBrowserData', {capture: 'viewport'})
        cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
        cy.get('ul > :nth-child(3) > a').click()
        cy.get('.header-block').click('topRight')
        cy.get('.content-pane > h2')
        cy.get('main').screenshot('settings_supervision', {capture: 'viewport'})
        cy.get('ul > :nth-child(1) > a').click()
        cy.get('.header-block').click('topRight')
        cy.get('[style="width: calc(100% - 320px); overflow-y: auto;"]')
        cy.get('main').screenshot('settings_entity', {capture: 'viewport'})
        cy.get('ul > :nth-child(2) > a').click()
        cy.get('.header-block').click('topRight')
        cy.get('.content-pane > h2')
        cy.get('main').screenshot('settings_profiles', {capture: 'viewport'})
    })
})
