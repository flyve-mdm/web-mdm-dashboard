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

import React from 'react'
import renderer from 'react-test-renderer'
import {
  Router,
} from 'react-router-dom'
import history from '../../../shared/history'

import LayoutListWithNavLinks from '../index'

describe('LayoutListWithNavLinks', () => {
  beforeAll(() => {
    global.Animation = class Animation {
      play = () => {}
    }
    global.KeyframeEffect = class KeyframeEffect {}
  })

  afterAll(() => {
    global.Animation = undefined
    global.KeyframeEffect = undefined
  })

  test('renders LayoutListWithNavLinks', () => {
    const component = renderer.create(
      <Router history={history}>
        <LayoutListWithNavLinks
          rootPath=""
          history={history}
          routes={[
            {
              path: '/',
              name: 'test 1',
              component: <ul />,
              exact: true,
            },
            {
              path: '/test',
              name: 'test 2',
              component: <ol />,
              exact: true,
            },
          ]}
        >
          <div />
        </LayoutListWithNavLinks>
      </Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
