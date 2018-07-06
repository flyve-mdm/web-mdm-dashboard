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
import I18n from '../../shared/i18n'
import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/ApplicationsContent'
import ApplicationsAdd from './components/ApplicationsAdd'
import ApplicationsEdit from './components/ApplicationsEdit'

/**
 * Represents all routes from Applications section
 * @constant
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: I18n.t('commons.no_selection'),
  component: EmptyMessage,
  exact: true,
},
{
  path: '/add',
  name: I18n.t('commons.add'),
  component: ApplicationsAdd,
  exact: true,
},
{
  path: '/edit',
  name: I18n.t('commons.edit'),
  component: ApplicationsEdit,
  exact: true,
},
{
  path: '/:id/edit',
  name: I18n.t('commons.edit_one'),
  component: ApplicationsEdit,
  exact: true,
},
{
  path: '/:id',
  name: I18n.t('commons.edit_one'),
  component: DevicesContent,
  exact: true,
},
]

export default routes
