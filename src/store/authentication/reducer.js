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
import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import {
  updateObject
} from "../../shared/updateObject"
import glpi from '../../shared/glpiApi'
import publicURL from '../../shared/publicURL'

/**
 * Change notification message
 * @param {objec} state
 * @param {object} action
 */
const changeNotificationMessage = (state, action) => {
  return updateObject(state, {
    notification: action.notification
  })
}

/**
 * Change password configuration
 * @param {objec} state
 * @param {object} action
 */
const changePasswordConfiguration = (state, action) => {
  return updateObject(state, {
    configurationPassword: action.configurationPassword
  })
}

/**
 * Success authentication user
 * @param {object} state
 * @param {object} action
 */
const authSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: {
      id: action.user.id,
      username: action.user.username,
      email: action.user.email,
      picture: action.user.picture
    }
  })
}

/**
 * Fail authentication user
 * @param {object} state
 * @param {object} action
 */
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

/**
 * Logout current user
 * @param {object} state
 * @param {object} action
 */
const logout = async (state, action) => {
  try {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    await glpi.killSession()
  } catch (error) {}
  return updateObject(state, {
    currentUser: null
  }, () => {
    action.history.push(`${publicURL}/`)
  })
}

/**
 * Refresh captcha authentication
 * @param {object} state
 * @param {object} action
 */
const authRefreshCaptcha = (state, action) => {
  return updateObject(state, {
    captcha: action.captcha,
    configurationPassword: action.configurationPassword
  })
}

/**
 * Define reducers
 * @param {object} state
 * @param {object} action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_REFRESH_CAPTCHA:
      return authRefreshCaptcha(state, action)
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE:
      return changeNotificationMessage(state, action)
    case actionTypes.CHANGE_PASSWORD_CONFIGURATION:
      return changePasswordConfiguration(state, action)
    case actionTypes.LOGOUT:
      return logout(state, action)
    default:
      return state
  }
}

export default reducer
