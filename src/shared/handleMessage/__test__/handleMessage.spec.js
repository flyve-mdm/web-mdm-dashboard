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

import handleMessage from '../index'
import history from '../../history'

describe('handleMessage', () => {
  beforeEach(() => {
    sinon.stub(history, 'push').returns({})
  })

  afterEach(() => {
    history.push.restore()
  })

  it('should set a generic error message', () => {
    expect(handleMessage({
      type: 'alert',
      message: 'error message',
    }))
      .toEqual({
        body: 'error message',
        title: 'Error',
        type: 'alert',
      })
  })

  it('should set a generic message', () => {
    expect(handleMessage({
      message: 'message',
    }))
      .toEqual({
        body: 'message',
        title: 'Info',
        type: 'info',
      })
  })

  it('should set a "no internet connection" message', () => {
    expect(
      handleMessage({
        type: 'alert',
        message: {
          status: 0,
        },
      }),
    ).toEqual({
      body: 'No Internet Connection',
      title: 'Error',
      type: 'alert',
    })
  })

  it('should set a 404 error message', () => {
    expect(
      handleMessage({
        type: 'alert',
        message: {
          status: 404,
          statusText: 'error 404',
          data: [
            ['Error', ''],
          ],
        },
      }),
    ).toEqual({
      body: 'error 404',
      title: 'Error',
      type: 'alert',
    })
  })

  it('should set a 401 error message', () => {
    expect(
      handleMessage({
        type: 'alert',
        message: {
          status: 401,
          data: [
            ['ERROR_SESSION_TOKEN_INVALID', 'session_token seems invalid'],
          ],
        },
      }),
    ).toEqual({
      body: 'session_token seems invalid',
      title: 'Error',
      type: 'alert',
    })
  })
})

it('should set a 400 error message', () => {
  expect(
    handleMessage({
      type: 'alert',
      message: {
        status: 400,
        data: [
          ['Error', 'error 400'],
        ],
      },
    }),
  ).toEqual({
    body: 'error 400',
    title: 'Error',
    type: 'alert',
  })
})
