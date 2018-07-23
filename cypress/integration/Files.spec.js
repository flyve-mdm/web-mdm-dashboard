import '../../public/config'

describe('Files', () => {
  beforeEach(function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmFile/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&order=ASC&range=0-14&`,
      response: {
        "totalcount": 4,
        "count": 4,
        "sort": 1,
        "order": "ASC",
        "data": [{
          "PluginFlyvemdmFile.name": "decoded.jpeg",
          "PluginFlyvemdmFile.id": 78,
          "PluginFlyvemdmFile.source": "0/5b11be1376218_decoded.jpeg"
        }, {
          "PluginFlyvemdmFile.name": "IMG.jpg",
          "PluginFlyvemdmFile.id": 79,
          "PluginFlyvemdmFile.source": "0/5b11be206c719_IMG_20180330_110129.jpg"
        }, {
          "PluginFlyvemdmFile.name": "logo-plugin.png",
          "PluginFlyvemdmFile.id": 48,
          "PluginFlyvemdmFile.source": "0/5acb72372edb7_logo-plugin.png"
        }, {
          "PluginFlyvemdmFile.name": "logo2.png",
          "PluginFlyvemdmFile.id": 43,
          "PluginFlyvemdmFile.source": "0/5abd12701feb2_logo2.png"
        }],
        "content-range": "0-3/4"
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

  it('should navigate in users without problemss', () => {
    cy.visit('/app/files')
    cy.contains('No selection')
    cy.get('#element__11')
    cy.get('main').screenshot('files_noSelection', {
      capture: 'viewport'
    })
    cy.get('.win-itemscontainer').click('top')
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('files_content', {
      capture: 'viewport'
    })
    cy.get('.editIcon').click()
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('files_edit', {
      capture: 'viewport'
    })
    cy.get('[aria-label="Add"] > .win-commandicon > .win-commandimage').click()
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('files_add', {
      capture: 'viewport'
    })
  })
})
