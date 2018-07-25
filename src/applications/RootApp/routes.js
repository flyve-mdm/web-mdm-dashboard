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
import publicURL from 'shared/publicURL'
import SignIn from 'containers/SignIn'
import asyncSignUp from 'async/asyncSignUp'
import asyncAdminDashboard from 'async/asyncAdminDashboard'
import asyncValidateAccount from 'async/asyncValidateAccount'
import asyncForgotPassword from 'async/asyncForgotPassword'
import asyncResetPassword from 'async/asyncResetPassword'

/**
 * Represents all public routes
 * @constant routes
 * @type {array}
 */
const routes = [{
  path: `${publicURL}/`,
  component: SignIn,
  exact: true,
  private: false,
},
{
  path: `${publicURL}/signUp`,
  component: asyncSignUp,
  exact: false,
  private: false,
},
{
  path: `${publicURL}/validateAccount`,
  component: asyncValidateAccount,
  exact: false,
  private: false,
},
{
  path: `${publicURL}/forgotPassword`,
  component: asyncForgotPassword,
  exact: false,
  private: false,
},
{
  path: `${publicURL}/resetPassword`,
  component: asyncResetPassword,
  exact: false,
  private: false,
},
{
  path: `${publicURL}/app`,
  component: asyncAdminDashboard,
  exact: false,
  private: false,
},
]

export default routes
