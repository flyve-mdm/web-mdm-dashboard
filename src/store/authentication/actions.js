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
import glpi from '../../shared/glpiApi'
import {
  uiTransactionFinish,
  uiTransactionStart
} from '../ui/actions'
import itemtype from '../../shared/itemtype'
import handleMessage from '../../shared/handleMessage'
import appConfig from '../../../public/config.json'

// Actions

/**
 * Action change notification message
 * @param {object} notification
 * @returns {object} notification
 */
export const changeNotificationMessage = notification => {
  return {
    type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
    notification
  }
}

/**
 * Action auth success
 * @param {object} user
 * @returns {object} current user
 */
export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  }
}

/**
 * Action auth fail
 * @param {object} error
 * @returns {object} current error
 */
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

/**
 * Action logout current history
 * @param {object} history
 * @returns {object} current history
 */
export const logout = history => {
  return {
    type: actionTypes.LOGOUT,
    history
  }
}

/**
 * Action refresh captcha
 * @param {object} idCaptcha
 * @param {object} imgCaptcha
 * @param {object} configurationPassword
 * @returns {object} new captcha
 */
export const authRefreshCaptcha = ({
  idCaptcha,
  imgCaptcha,
  configurationPassword
}) => {
  return {
    type: actionTypes.AUTH_REFRESH_CAPTCHA,
    captcha: {
      id: idCaptcha,
      img: imgCaptcha
    },
    configurationPassword: configurationPassword
  }
}

/**
 * Action change password configuration
 * @param {object} newConfiguration
 * @returns {object} new password configuration
 */
export function changePasswordConfiguration(newConfiguration) {
  return {
    type: actionTypes.CHANGE_PASSWORD_CONFIGURATION,
    newConfiguration
  }
}

// Actions Creators

/**
 * Fetch and Sign In a User with credentials
 * @param {String} username
 * @param {String} password
 */
export const fetchSignIn = (username, password) => {
  return dispatch => {
    dispatch(uiTransactionStart())
    glpi.login({
      userName: username,
      userPassword: password
    }).then(response => {
      const user = {
        id: response.userData.id,
        name: response.userData.name,
        email: response.userEmails.length > 0 ? response.userEmails[0].email : '',
        picture: null
      }

      localStorage.setItem('sessionToken', response.sessionToken)
      localStorage.setItem('currentUser', JSON.stringify(user))

      dispatch(uiTransactionFinish())
      dispatch(authSuccess(user))
      dispatch(changeNotificationMessage({
        title: appConfig.appName,
        body: 'Welcome!',
        type: 'success'
      }))
    }).catch(error => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage(handleMessage({
        type: 'alert',
        message: error
      })))
    })
  }
}

/**
 * Fetch and Refresh de Captcha
 */
export const fetchCaptcha = () => {
  return async dispatch => {
    dispatch(uiTransactionStart())
    try {
      const session = await glpi.initSessionByUserToken({
        userToken: appConfig.demoToken
      })
      glpi.sessionToken = session.session_token
      const {
        id
      } = await glpi.addItem({
        itemtype: itemtype.PluginFlyvemdmdemoCaptcha,
        input: {}
      })
      const captcha = await glpi.genericRequest({
        path: `PluginFlyvemdmdemoCaptcha/${id}`,
        queryString: {
          alt: 'media'
        },
        requestParams: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          responseType: 'blob'
        }
      })
      const {
        cfg_glpi
      } = await glpi.getGlpiConfig()
      const configurationPassword = {
        minimunLength: cfg_glpi.password_min_length,
        needDigit: cfg_glpi.password_need_number,
        needLowercaseCharacter: cfg_glpi.password_need_letter,
        needUppercaseCharacter: cfg_glpi.password_need_caps,
        needSymbol: cfg_glpi.password_need_symbol
      }

      dispatch(authRefreshCaptcha({
        idCaptcha: id,
        imgCaptcha: URL.createObjectURL(captcha),
        configurationPassword: configurationPassword
      }))
      dispatch(uiTransactionFinish())
    } catch (error) {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage(handleMessage({
        type: 'alert',
        message: error
      })))
    }
  }
}

/**
 * Fetch and Sign up user
 * @param {Object} data
 */
export const fetchSignUp = (data) => {
  return dispatch => {
    dispatch(uiTransactionStart())
    glpi.registerUser({
        userToken: appConfig.demoToken,
        userData: data,
        itemtype: itemtype.PluginFlyvemdmdemoUser
      })
      .then(() => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage({
          title: appConfig.appName,
          body: 'Successfully registered user',
          type: 'success'
        }))
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({
          type: 'alert',
          message: error
        })))
      })
  }
}

/**
 * Fetch recover password
 * @param {string} email
 */
export const fetchRecoverPassword = (email) => {
  return dispatch => { // TODO: Create this
    dispatch(uiTransactionStart())
    glpi.genericRequest({
        path: 'lostPassword',
        requestParams: {
          method: 'PUT',
          body: JSON.stringify({
            "email": email
          })
        }
      })
      .then(([response, json]) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage({
          title: appConfig.APP_NAME,
          body: 'Request reset password',
          type: 'success'
        }))
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({
          type: 'alert',
          message: error
        })))
      })
  }
}

/**
 * Fetch reset password
 * @param {string} email
 * @param {string} token
 * @param {string} newPassword
 */
export const fetchResetPassword = ({
  email,
  token,
  newPassword
}) => {
  return dispatch => {
    dispatch(uiTransactionStart())
    glpi.genericRequest({
        path: 'lostPassword',
        requestParams: {
          method: 'PUT',
          body: JSON.stringify({
            "email": email,
            "password_forget_token": token,
            "password": newPassword
          })
        }
      })
      .then((response) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage({
          title: appConfig.appName,
          body: response[0],
          type: 'success'
        }))
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({
          type: 'alert',
          message: error
        })))
      })
  }
}

/**
 * Fetch password configuration
 */
export const fetchPasswordConfiguration = () => {
  return (dispatch) => {
    dispatch(uiTransactionStart())
    glpi.configurationPassword.getAll()
      .then(([response, json]) => {
        dispatch(uiTransactionFinish())
        dispatch(changePasswordConfiguration(json)) // TODO: Not Work
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({
          type: 'alert',
          message: error
        })))
      })
  }
}

/**
 * Fetch send feedback
 * @param {object} data
 */
export function fetchSendFeedback(data) {
  return (dispatch) => {
    dispatch(uiTransactionStart())
    glpi.sendFeedback({ // TODO: GLPI Clien no have sendFeedback method
        text: data.text,
        userId: data.userId
      })
      .then(([response, json]) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage({
          title: appConfig.appName,
          body: 'Successfully send feedback',
          type: 'success'
        }))
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({
          type: 'alert',
          message: error
        })))
      })
  }
}
