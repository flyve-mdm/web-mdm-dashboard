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
import withAsyncComponent from 'hoc/withAsyncComponent'
import I18n from 'shared/i18n'

/**
 * Represents all private routes
 * @constant routes
 * @type {array}
 */
const routes = [{
  path: '/',
  name: I18n.t('commons.home'),
  component: withAsyncComponent(() => import('containers/HomeDashboard')),
  exact: true,
},
{
  path: '/error',
  name: I18n.t('commons.error'),
  component: withAsyncComponent(() => import('components/ErrorPage')),
  exact: true,
},
{
  path: '/devices',
  name: I18n.t('commons.devices'),
  component: withAsyncComponent(() => import('containers/Devices')),
  exact: false,
},
{
  path: '/invitations',
  name: I18n.t('commons.invitations'),
  component: withAsyncComponent(() => import('containers/Invitations')),
  exact: false,
},
{
  path: '/files',
  name: I18n.t('commons.files'),
  component: withAsyncComponent(() => import('containers/Files')),
  exact: false,
},
{
  path: '/fleets',
  name: I18n.t('commons.fleets'),
  component: withAsyncComponent(() => import('containers/Fleets')),
  exact: false,
},
{
  path: '/applications',
  name: I18n.t('commons.applications'),
  component: withAsyncComponent(() => import('containers/Applications')),
  exact: false,
},
{
  path: '/users',
  name: I18n.t('commons.users'),
  component: withAsyncComponent(() => import('containers/Users')),
  exact: false,
},
{
  path: '/search',
  name: I18n.t('commons.search'),
  component: withAsyncComponent(() => import('containers/SearchEngine')),
  exact: false,
},
{
  path: '/about',
  name: I18n.t('commons.about'),
  component: withAsyncComponent(() => import('containers/About')),
  exact: false,
},
{
  path: '/settings',
  name: I18n.t('commons.settings'),
  component: withAsyncComponent(() => import('containers/Settings')),
  exact: false,
},
]

export default routes
