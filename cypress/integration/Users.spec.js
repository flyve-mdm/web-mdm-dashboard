import '../../public/config'

describe('Users', () => {
  beforeEach(function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/User/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=5&forcedisplay[3]=34&forcedisplay[4]=150&order=ASC&range=0-14&`,
      response: {
        "totalcount": 2,
        "count": 2,
        "content-range": "0-1/2",
        "order": "ASC",
        "sort": 1,
        "data": [
          {"User.name":"User 1","User.id":1,"User.UserEmail.email":"user1@teclib.com","User.realname":"New user","User.picture":null},
          {"User.name":"User 2","User.id":2,"User.UserEmail.email":"user2@teclib.com","User.realname":"Old user","User.picture":null},
        ]
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/User/1`,
      response: {
        "id":1,"name":"User 1","phone":null,"phone2":null,"mobile":null,"realname":"New user","firstname":null,"locations_id":0,"language":null,"use_mode":0,"list_limit":null,"is_active":1,"comment":null,"auths_id":0,"authtype":1,"last_login":null,"date_mod":"2018-06-04 17:17:12","date_sync":null,"is_deleted":0,"profiles_id":0,"entities_id":0,"usertitles_id":0,"usercategories_id":0,"date_format":null,"number_format":null,"names_format":null,"csv_delimiter":null,"is_ids_visible":null,"use_flat_dropdowntree":null,"show_jobs_at_login":null,"priority_1":null,"priority_2":null,"priority_3":null,"priority_4":null,"priority_5":null,"priority_6":null,"followup_private":null,"task_private":null,"default_requesttypes_id":null,"password_forget_token":null,"password_forget_token_date":null,"user_dn":null,"registration_number":null,"show_count_on_tabs":null,"refresh_ticket_list":null,"set_default_tech":null,"personal_token":null,"personal_token_date":null,"display_count_on_home":null,"notification_to_myself":null,"duedateok_color":null,"duedatewarning_color":null,"duedatecritical_color":null,"duedatewarning_less":null,"duedatecritical_less":null,"duedatewarning_unit":null,"duedatecritical_unit":null,"display_options":null,"is_deleted_ldap":0,"pdffont":null,"picture":"profile.png","begin_date":null,"end_date":null,"keep_devices_when_purging_item":null,"privatebookmarkorder":null,"backcreated":null,"task_state":null,"layout":null,"palette":null,"ticket_timeline":null,"ticket_timeline_keep_replaced_tabs":null,"set_default_requester":null,"lock_autolock_mode":null,"lock_directunlock_notification":null,"date_creation":"2018-05-30 23:07:57","highcontrast_css":0,"plannings":null,"api_token":"KHsR7XIbbTMtGlKZrVzfWrHSuD34LFxBiY6ixdxp","api_token_date":"2018-05-30 23:07:57","sync_field":null
      }
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/User/1/UserEmail`,
      response: [
        {"id":12,"users_id":1,"is_default":1,"is_dynamic":0,"email":"user1@teclib.com","links":[{"rel":"User","href":"https://dev.flyve.org/glpi/apirest.php/User/1"}]}
      ]
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/getGlpiConfig`,
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
    cy.visit('/app/users')
    cy.contains('No selection')
    cy.get('#element__11')
    cy.get('main').screenshot('users_noSelection', {capture: 'viewport'})
    cy.get('.win-itemscontainer').click('top')
    cy.get('.item-info__name')
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('users_content', {capture: 'viewport'})
    cy.get('.editIcon').click()
    cy.get('.viewIcon')
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('users_edit', {capture: 'fullPage'})
  })
})
