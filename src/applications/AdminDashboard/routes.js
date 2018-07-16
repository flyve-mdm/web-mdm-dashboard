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

/** import dependencies */
import Dashboard from '../../containers/HomeDashboard'
import Devices from '../../containers/Devices'
import Invitations from '../../containers/Invitations'
import Files from '../../containers/Files'
import Applications from '../../containers/Applications'
import Users from '../../containers/Users'
import SearchEngine from '../../containers/SearchEngine'
import About from '../../containers/About'
import Settings from '../../containers/Settings'
import Fleets from '../../containers/Fleets'
import I18n from '../../shared/i18n'
import ErrorPage from '../../components/ErrorPage'

/**
 * Represents all private routes
 * @constant routes
 * @type {array}
 */
const routes = [{
    path: '/',
    name: I18n.t('commons.home'),
    component: Dashboard,
    exact: true
  },
  {
    path: '/error',
    name: I18n.t('commons.error'),
    component: ErrorPage,
    exact: true,
  },
  {
    path: '/devices',
    name: I18n.t('commons.devices'),
    component: Devices,
    exact: false
  },
  {
    path: '/invitations',
    name: I18n.t('commons.invitations'),
    component: Invitations,
    exact: false
  },
  {
    path: '/files',
    name: I18n.t('commons.files'),
    component: Files,
    exact: false
  },
  {
    path: '/fleets',
    name: I18n.t('commons.fleets'),
    component: Fleets,
    exact: false
  },
  {
    path: '/applications',
    name: I18n.t('commons.applications'),
    component: Applications,
    exact: false
  },
  {
    path: '/users',
    name: I18n.t('commons.users'),
    component: Users,
    exact: false
  },
  {
    path: '/search',
    name: I18n.t('commons.search'),
    component: SearchEngine,
    exact: false
  },
  {
    path: '/about',
    name: I18n.t('commons.about'),
    component: About,
    exact: false
  },
  {
    path: '/settings',
    name: I18n.t('commons.settings'),
    component: Settings,
    exact: false
  }
]

export default routes
