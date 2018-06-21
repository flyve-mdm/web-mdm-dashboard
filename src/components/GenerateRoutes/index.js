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
import {
  Route,
  Switch
} from 'react-router-dom'
import PropsRoute from './PropsRoute'
import NotFound from '../../components/NotFound'

// TODO: Enable PrivateRoute if route if private

/**
 * Generate routes
 * @function GenerateRoutes
 * @param {array} routes
 * @param {string} rootPath
 * @param {*} withNotFound
 * @param {object} data
 * @return {component}
 */
const GenerateRoutes = ({
  routes,
  rootPath,
  withNotFound,
  data
}) => {
  let r = routes.map(({
    exact,
    path,
    component
  }, i) => {
    if (typeof (data) === 'object') {
      return (
        <PropsRoute
          exact={exact}
          component={component}
          key={i}
          {...data}
          path={
            typeof (rootPath) === "string" ?
              path === '/' ?
                rootPath
                : rootPath + path
              : path
          }
        />
      )
    } else {
      return (
        <Route
          exact={exact}
          component={component}
          key={i}
          path={
            typeof (rootPath) === "string" ?
              path === '/' ?
                rootPath
                : rootPath + path
              : path
          }
        />
      )
    }
  })

  withNotFound && r.push(
    <Route
      key={routes.length + 1}
      render={() => <NotFound />}
    />
  )

  return (
    <Switch>
      {r}
    </Switch>
  )
}

export default GenerateRoutes
