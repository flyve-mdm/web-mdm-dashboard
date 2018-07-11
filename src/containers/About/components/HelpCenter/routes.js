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
import I18n from '../../../../shared/i18n'
import ErrorPage from '../../../../components/ErrorPage'
import HelpCenterArticle from './HelpCenterArticle'
import HelpCenterList from './HelpCenterList'
import Feedback from './Feedback'

/**
 * Represents all private routes from HelpCenter
 * @constant routes
 * @type {Array}
 */
const routes = [
  {
    path: '/',
    name: I18n.t('about.help_center.home'),
    component: HelpCenterList,
    exact: true,
  },
  {
    path: '/error',
    name: 'commons.error',
    component: ErrorPage,
    exact: true,
  },
  {
    path: '/feedback',
    name: I18n.t('commons.feedback'),
    component: Feedback,
    exact: true,
  },
  {
    path: '/:article',
    name: I18n.t('commons.article'),
    component: HelpCenterArticle,
    exact: false,
  },
]

export default routes
