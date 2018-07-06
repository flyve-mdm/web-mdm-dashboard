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
import UsersContent from './components/UsersContent'
import UsersEditOne from './components/UsersEditOne'
import UsersEdit from './components/UsersEdit'

/**
 * Represents all private routes from Users
 * @constant routes
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: I18n.t('commons.no_selection'),
  component: EmptyMessage,
  exact: true,
},
{
  path: '/edit',
  name: I18n.t('commons.edit'),
  component: UsersEdit,
  exact: true,
},
{
  path: '/:id/edit',
  name: I18n.t('commons.edit_one'),
  component: UsersEditOne,
  exact: true,
},
{
  path: '/:id',
  name: I18n.t('commons.selected'),
  component: UsersContent,
  exact: true,
},
]

export default routes
