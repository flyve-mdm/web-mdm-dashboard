import '../../public/config'

describe('About', () => {
  beforeEach(function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmInvitation/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&order=ASC&range=0-14&`,
      response: {
        "totalcount": 3,
        "count": 3,
        "content-range": "0-2/3",
        "order": "ASC",
        "sort": 1,
        "data": [{
            "PluginFlyvemdmInvitation.name": "Invitation",
            "PluginFlyvemdmInvitation.id": 1,
            "PluginFlyvemdmInvitation.User.name": "invitation1@teclib.com"
          },
          {
            "PluginFlyvemdmInvitation.name": "Invitation",
            "PluginFlyvemdmInvitation.id": 2,
            "PluginFlyvemdmInvitation.User.name": "invitation2@teclib.com"
          },
          {
            "PluginFlyvemdmInvitation.name": "Invitation",
            "PluginFlyvemdmInvitation.id": 3,
            "PluginFlyvemdmInvitation.User.name": "invitation3@teclib.com"
          }
        ]
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/getGlpiConfig`,
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

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmInvitationlog/?criteria[0][field]=4&criteria[0][searchtype]=equal&criteria[0][value]=3&uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=5&`,
      response: {
        "totalcount": 0,
        "count": 0,
        "sort": 1,
        "order": "ASC",
        "content-range": "0-0/0",
        "data": []
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/Plugin/?range=0-0&`,
      response: {
        "totalcount": 5,
        "count": 1,
        "sort": 1,
        "order": "ASC",
        "data": [{
          "1": "armaditoscan"
        }],
        "content-range": "0-0/5"
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/KnowbaseItem/?range=0-0&`,
      response: {
        "totalcount": 4,
        "count": 1,
        "sort": 1,
        "order": "ASC",
        "data": [
          []
        ],
        "content-range": "0-0/4"
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/KnowbaseItem/?range=0-4&`,
      response: [{
        "id": 1,
        "knowbaseitemcategories_id": 3,
        "name": "Test Article 01",
        "answer": "&lt;div class=\"wrapper\"&gt;\r\n&lt;article class=\"post\"&gt;\r\n&lt;div class=\"post-content\"&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum molestiae maxime, non perspiciatis repellendus! Alias praesentium laborum consectetur velit, et explicabo impedit excepturi tenetur modi necessitatibus! Delectus deleniti maxime vel.&lt;/p&gt;\r\n&lt;/div&gt;\r\n&lt;/article&gt;\r\n&lt;/div&gt;\r\n&lt;footer class=\"site-footer\"&gt;\r\n&lt;div class=\"wrapper\"&gt; &lt;/div&gt;\r\n&lt;/footer&gt;",
        "is_faq": 1,
        "users_id": 2,
        "view": 7,
        "date": "2017-08-17 11:45:50",
        "date_mod": "2017-08-17 12:32:56",
        "begin_date": "2017-08-17 00:00:00",
        "end_date": null,
        "links": [{
          "rel": "KnowbaseItemCategory",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItemCategory/3"
        }, {
          "rel": "User",
          "href": "https://dev.flyve.org/glpi/apirest.php/User/2"
        }, {
          "rel": "Document_Item",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItem/1/Document_Item/"
        }]
      }, {
        "id": 2,
        "knowbaseitemcategories_id": 3,
        "name": "test article 02",
        "answer": "&lt;div class=\"wrapper\"&gt;\r\n&lt;article class=\"post\"&gt;\r\n&lt;div class=\"post-content\"&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum molestiae maxime, non perspiciatis repellendus! Alias praesentium laborum consectetur velit, et explicabo impedit excepturi tenetur modi necessitatibus! Delectus deleniti maxime vel.&lt;/p&gt;\r\n&lt;/div&gt;\r\n&lt;/article&gt;\r\n&lt;/div&gt;\r\n&lt;footer class=\"site-footer\"&gt;\r\n&lt;div class=\"wrapper\"&gt; &lt;/div&gt;\r\n&lt;/footer&gt;",
        "is_faq": 1,
        "users_id": 2,
        "view": 1,
        "date": "2017-08-17 12:33:15",
        "date_mod": "2017-08-17 12:33:15",
        "begin_date": null,
        "end_date": null,
        "links": [{
          "rel": "KnowbaseItemCategory",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItemCategory/3"
        }, {
          "rel": "User",
          "href": "https://dev.flyve.org/glpi/apirest.php/User/2"
        }, {
          "rel": "Document_Item",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItem/2/Document_Item/"
        }]
      }, {
        "id": 3,
        "knowbaseitemcategories_id": 3,
        "name": "test article  03",
        "answer": "&lt;div class=\"wrapper\"&gt;\r\n&lt;article class=\"post\"&gt;\r\n&lt;div class=\"post-content\"&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum molestiae maxime, non perspiciatis repellendus! Alias praesentium laborum consectetur velit, et explicabo impedit excepturi tenetur modi necessitatibus! Delectus deleniti maxime vel.&lt;/p&gt;\r\n&lt;/div&gt;\r\n&lt;/article&gt;\r\n&lt;/div&gt;\r\n&lt;footer class=\"site-footer\"&gt;\r\n&lt;div class=\"wrapper\"&gt; &lt;/div&gt;\r\n&lt;/footer&gt;",
        "is_faq": 1,
        "users_id": 2,
        "view": 0,
        "date": "2017-08-17 12:34:11",
        "date_mod": "2017-08-17 12:34:11",
        "begin_date": null,
        "end_date": null,
        "links": [{
          "rel": "KnowbaseItemCategory",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItemCategory/3"
        }, {
          "rel": "User",
          "href": "https://dev.flyve.org/glpi/apirest.php/User/2"
        }, {
          "rel": "Document_Item",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItem/3/Document_Item/"
        }]
      }, {
        "id": 4,
        "knowbaseitemcategories_id": 3,
        "name": "test article  04",
        "answer": "",
        "is_faq": 1,
        "users_id": 2,
        "view": 0,
        "date": "2017-08-17 12:34:29",
        "date_mod": "2017-08-17 12:34:29",
        "begin_date": null,
        "end_date": null,
        "links": [{
          "rel": "KnowbaseItemCategory",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItemCategory/3"
        }, {
          "rel": "User",
          "href": "https://dev.flyve.org/glpi/apirest.php/User/2"
        }, {
          "rel": "Document_Item",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItem/4/Document_Item/"
        }]
      }]
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/KnowbaseItem/1`,
      response: {
        "id": 1,
        "knowbaseitemcategories_id": 3,
        "name": "Test Article 01",
        "answer": "&lt;div class=\"wrapper\"&gt;\r\n&lt;article class=\"post\"&gt;\r\n&lt;div class=\"post-content\"&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum molestiae maxime, non perspiciatis repellendus! Alias praesentium laborum consectetur velit, et explicabo impedit excepturi tenetur modi necessitatibus! Delectus deleniti maxime vel.&lt;/p&gt;\r\n&lt;/div&gt;\r\n&lt;/article&gt;\r\n&lt;/div&gt;\r\n&lt;footer class=\"site-footer\"&gt;\r\n&lt;div class=\"wrapper\"&gt; &lt;/div&gt;\r\n&lt;/footer&gt;",
        "is_faq": 1,
        "users_id": 2,
        "view": 7,
        "date": "2017-08-17 11:45:50",
        "date_mod": "2017-08-17 12:32:56",
        "begin_date": "2017-08-17 00:00:00",
        "end_date": null,
        "links": [{
          "rel": "KnowbaseItemCategory",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItemCategory/3"
        }, {
          "rel": "User",
          "href": "https://dev.flyve.org/glpi/apirest.php/User/2"
        }, {
          "rel": "Document_Item",
          "href": "https://dev.flyve.org/glpi/apirest.php/KnowbaseItem/1/Document_Item/"
        }]
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/getActiveProfile`,
      response: {
        "active_profile": {
          "id": 4,
          "name": "Super-Admin",
          "interface": "central",
          "is_default": 0,
          "helpdesk_hardware": 3,
          "helpdesk_item_type": ["Computer", "Monitor", "NetworkEquipment", "Peripheral", "Phone",
            "Printer", "Software"
          ],
          "ticket_status": [],
          "date_mod": null,
          "comment": null,
          "problem_status": [],
          "create_ticket_on_login": 0,
          "tickettemplates_id": 0,
          "change_status": null,
          "date_creation": null,
          "0": 1,
          "armaditoscan:report": 0,
          "backup": 1055,
          "bookmark_public": 31,
          "budget": 255,
          "calendar": 31,
          "cartridge": 255,
          "certificate": 255,
          "change": 1279,
          "changevalidation": 1044,
          "computer": 255,
          "config": 31,
          "consumable": 255,
          "contact_enterprise": 255,
          "contract": 255,
          "device": 31,
          "devicesimcard_pinpuk": 3,
          "document": 255,
          "domain": 31,
          "dropdown": 31,
          "entity": 3327,
          "flyvemdm:agent": 115,
          "flyvemdm:entity": 897,
          "flyvemdm:file": 127,
          "flyvemdm:fleet": 127,
          "flyvemdm:flyvemdm": 128,
          "flyvemdm:geolocation": 127,
          "flyvemdm:invitation": 31,
          "flyvemdm:invitationLog": 1,
          "flyvemdm:package": 127,
          "flyvemdm:policy": 1,
          "flyvemdm:policycategory": 1,
          "flyvemdm:taskstatus": 1,
          "flyvemdm:wellknownpath": 31,
          "flyvemdmdemo:captcha": 0,
          "followup": 15383,
          "global_validation": 0,
          "group": 159,
          "infocom": 31,
          "internet": 159,
          "itilcategory": 31,
          "knowbase": 15519,
          "knowbasecategory": 31,
          "license": 255,
          "line": 127,
          "lineoperator": 31,
          "link": 159,
          "location": 31,
          "logs": 1,
          "monitor": 255,
          "netpoint": 31,
          "networking": 255,
          "notification": 31,
          "orion:report": 1,
          "password_update": 1,
          "peripheral": 255,
          "phone": 255,
          "planning": 3073,
          "plugin_fusioninventory_agent": 23,
          "plugin_fusioninventory_blacklist": 23,
          "plugin_fusioninventory_collect": 23,
          "plugin_fusioninventory_configsecurity": 31,
          "plugin_fusioninventory_configuration": 3,
          "plugin_fusioninventory_credential": 23,
          "plugin_fusioninventory_credentialip": 23,
          "plugin_fusioninventory_deploymirror": 23,
          "plugin_fusioninventory_esx": 23,
          "plugin_fusioninventory_group": 23,
          "plugin_fusioninventory_ignoredimportdevice": 23,
          "plugin_fusioninventory_importxml": 4,
          "plugin_fusioninventory_iprange": 23,
          "plugin_fusioninventory_lock": 23,
          "plugin_fusioninventory_menu": 1,
          "plugin_fusioninventory_networkequipment": 23,
          "plugin_fusioninventory_package": 23,
          "plugin_fusioninventory_printer": 23,
          "plugin_fusioninventory_remotecontrol": 1,
          "plugin_fusioninventory_reportnetworkequipment": 1,
          "plugin_fusioninventory_reportprinter": 1,
          "plugin_fusioninventory_rulecollect": 23,
          "plugin_fusioninventory_ruleentity": 23,
          "plugin_fusioninventory_ruleimport": 23,
          "plugin_fusioninventory_rulelocation": 23,
          "plugin_fusioninventory_selfpackage": 31,
          "plugin_fusioninventory_task": 23,
          "plugin_fusioninventory_unmanaged": 31,
          "plugin_fusioninventory_wol": 1,
          "printer": 255,
          "problem": 1279,
          "profile": 159,
          "project": 1279,
          "projecttask": 1025,
          "queuednotification": 31,
          "reminder_public": 159,
          "reports": 1,
          "reservation": 1055,
          "rssfeed_public": 159,
          "rule_dictionnary_dropdown": 31,
          "rule_dictionnary_printer": 31,
          "rule_dictionnary_software": 31,
          "rule_import": 31,
          "rule_ldap": 31,
          "rule_mailcollector": 31,
          "rule_softwarecategories": 31,
          "rule_ticket": 1055,
          "search_config": 3103,
          "show_group_hardware": 0,
          "slm": 31,
          "software": 255,
          "solutiontemplate": 31,
          "state": 31,
          "statistic": 1,
          "task": 13329,
          "taskcategory": 31,
          "ticket": 259231,
          "ticketcost": 31,
          "ticketrecurrent": 31,
          "tickettemplate": 31,
          "ticketvalidation": 15384,
          "transfer": 31,
          "typedoc": 31,
          "user": 7327,
          "entities": [{
            "id": 0,
            "name": "Root entity",
            "is_recursive": 0
          }]
        }
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/PluginFlyvemdmEntityconfig/0`,
      response: [{
        "id": 0,
        "entities_id": 0,
        "enroll_token": null,
        "agent_token_life": "P8D",
        "support_name": "Great support",
        "support_phone": "+33 123456789",
        "support_website": "https://mygreatsupport.com",
        "support_email": "greatsupport@example.com",
        "support_address": "Great Support\r\n1 Support Avenue\r\nNot Cupertino\r\n123456 Somewhere in the world",
        "managed": 0,
        "download_url": "https://play.google.com/store/apps/details?id=com.teclib.flyvemdm",
        "device_limit": 0,
        "links": [{
          "rel": "Entity",
          "href": "https://dev.flyve.org/glpi/apirest.php/Entity/0"
        }]
      }]
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/Plugin/?range=0-5&`,
      response: [{
        "id": 1,
        "directory": "flyvemdm",
        "name": "Flyve Mobile Device Management",
        "version": "2.0.0-dev",
        "state": 1,
        "author": "<a href=\"http://www.teclib.com\">Teclib</a>",
        "homepage": "",
        "license": "AGPLv3+"
      }, {
        "id": 2,
        "directory": "flyvemdmdemo",
        "name": "Flyve MDM Demo",
        "version": "1.0.0-dev",
        "state": 1,
        "author": "<a href='http://www.teclib.com'>Teclib</a>",
        "homepage": "",
        "license": "AGPLv3+"
      }, {
        "id": 3,
        "directory": "fusioninventory",
        "name": "FusionInventory",
        "version": "9.2+1.0",
        "state": 1,
        "author": "<a href=\"mailto:david@durieux.family\">David DURIEUX</a>\n                                & FusionInventory team",
        "homepage": "http://forge.fusioninventory.org/projects/fusioninventory-for-glpi/",
        "license": "AGPLv3+"
      }, {
        "id": 4,
        "directory": "orion",
        "name": "orion",
        "version": "0.1-dev",
        "state": 1,
        "author": "<a href=\"http://www.teclib.com\">Teclib'</a>",
        "homepage": "",
        "license": ""
      }, {
        "id": 5,
        "directory": "armaditoscan",
        "name": "armaditoscan",
        "version": "0.1-dev",
        "state": 4,
        "author": "<a href=\"http://www.teclib.com\">Teclib'</a>",
        "homepage": "",
        "license": ""
      }]
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmInvitationlog/?criteria[0][field]=4&criteria[0][searchtype]=equal&criteria[0][value]=1&uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=5&`,
      response: {
        "totalcount": 2,
        "count": 2,
        "sort": 1,
        "order": "ASC",
        "content-range": "0-1/2",
        "data": [{
            "PluginFlyvemdmInvitationlog.id": 11,
            "PluginFlyvemdmInvitationlog.date_creation": "2018-04-25 21:57:54",
            "PluginFlyvemdmInvitationlog.PluginFlyvemdmInvitation.id": 12,
            "PluginFlyvemdmInvitationlog.event": "Bad agent version"
          },
          {
            "PluginFlyvemdmInvitationlog.id": 13,
            "PluginFlyvemdmInvitationlog.date_creation": "2018-04-25 21:59:02",
            "PluginFlyvemdmInvitationlog.PluginFlyvemdmInvitation.id": 14,
            "PluginFlyvemdmInvitationlog.event": "Wrong email address"
          }
        ]
      }
    })

    localStorage.setItem('sessionToken', 'token1234')
    localStorage.setItem('showNotifications', 'true')
    localStorage.setItem('notificationType', 'Toast')

    localStorage.setItem('currentUser',
      JSON.stringify({
        id: 123,
        name: "exampleName",
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
    cy.visit('/app/about')
    cy.contains('No selection')
    cy.get('main').screenshot('about_noSelection', {
      capture: 'viewport'
    })
    cy.visit('/app/about/overview')
    cy.get('.content-pane > h2')
    cy.get('main').screenshot('about_overview', {
      capture: 'viewport'
    })
    cy.visit('/app/about/contact')
    cy.get('main').screenshot('about_contact', {
      capture: 'viewport'
    })
    cy.visit('/app/about/term')
    cy.get('main').screenshot('about_term', {
      capture: 'viewport'
    })
    cy.visit('/app/about/release')
    cy.get('.content-pane > h2')
    cy.get('main').screenshot('about_release', {
      capture: 'viewport'
    })
    cy.visit('/app/about/help')
    cy.get('#element__5 > div')
    cy.get('main').screenshot('about_helpCenter', {
      capture: 'viewport'
    })
    cy.get('#element__5 > div').click()
    cy.get('main').screenshot('about_helpCenter_article', {
      capture: 'viewport'
    })
    cy.get('.header-breadcrumb > :nth-child(5) > a').click()
    cy.get('.itemList').click()
    cy.get('main').screenshot('about_helpCenter_feedback', {
      capture: 'viewport'
    })
  })
})
