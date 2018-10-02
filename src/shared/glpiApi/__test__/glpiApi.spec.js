/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

import glpiApi from '../index'



/* eslint no-underscore-dangle: ["error", { "allow": ["_parser", "_makeRequest"] }] */
describe('glpiApi', () => {
  beforeAll(() => {
    global.appConfig = {
      glpiApiLink: 'https://demo-api.flyve.org/apirest.php',
      demoToken: 'pe90W27ebPXIeYXsj2mYE0nMrRz9q1AlguKhbhcI',
      pluginToken: '2JoAOqcPcqkMZDf2QeeQBAVjERO2LamlZghkvWPB',
      appName: 'MDM Dashboard',
      bugsnag: 'fba7440f31b8f7a7e72495cf000b2c42',
    }
  })

  it('should exist all methods of "javascript-library-glpi"', () => {
    global.appConfig = {
      glpiApiLink: 'https://demo-api.flyve.org/apirest.php',
      demoToken: 'pe90W27ebPXIeYXsj2mYE0nMrRz9q1AlguKhbhcI',
      pluginToken: '2JoAOqcPcqkMZDf2QeeQBAVjERO2LamlZghkvWPB',
      appName: 'MDM Dashboard',
      bugsnag: 'fba7440f31b8f7a7e72495cf000b2c42',
    }

    expect(glpiApi).toBeDefined()
    expect(glpiApi._parser).toBeDefined()
    expect(glpiApi._makeRequest).toBeDefined()
    expect(glpiApi.initSessionByCredentials).toBeDefined()
    expect(glpiApi.initSessionByUserToken).toBeDefined()
    expect(glpiApi.killSession).toBeDefined()
    expect(glpiApi.addItem).toBeDefined()
    expect(glpiApi.getFullSession).toBeDefined()
    expect(glpiApi.getActiveProfile).toBeDefined()
    expect(glpiApi.getMyProfiles).toBeDefined()
    expect(glpiApi.getMyEntities).toBeDefined()
    expect(glpiApi.getActiveEntities).toBeDefined()
    expect(glpiApi.getGlpiConfig).toBeDefined()
    expect(glpiApi.getAllItems).toBeDefined()
    expect(glpiApi.getAnItem).toBeDefined()
    expect(glpiApi.getSubItems).toBeDefined()
    expect(glpiApi.deleteItem).toBeDefined()
    expect(glpiApi.updateItem).toBeDefined()
    expect(glpiApi.changeActiveEntities).toBeDefined()
    expect(glpiApi.changeActiveProfile).toBeDefined()
    expect(glpiApi.getMultipleItems).toBeDefined()
    expect(glpiApi.searchItems).toBeDefined()
    expect(glpiApi.searchAllItems).toBeDefined()
    expect(glpiApi.listSearchOptions).toBeDefined()
    expect(glpiApi.registerUser).toBeDefined()
    expect(glpiApi.login).toBeDefined()
    expect(glpiApi.getUsers).toBeDefined()
    expect(glpiApi.updateEmails).toBeDefined()
    expect(glpiApi.genericRequest).toBeDefined()
    expect(glpiApi.uploadFile).toBeDefined()
  })
})
