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

import logout from '../index'
import history from '../../history'
import glpi from '../../glpiApi'

describe('logout', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', 'my user data')
    localStorage.setItem('sessionToken', '12345678')
    sinon.stub(history, 'push').returns({})
    sinon.stub(glpi, 'killSession').returns({})
    glpi.sessionToken = 12345678
  })

  afterEach(() => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    history.push.restore()
    glpi.killSession.restore()
  })

  it('should close the session', async () => {
    logout()
    expect(localStorage.getItem('currentUser')).toBeUndefined()
    expect(localStorage.getItem('sessionToken')).toBeUndefined()
    expect(history.push.called).toEqual(true)
    expect(glpi.killSession.called).toEqual(true)
  })
})
