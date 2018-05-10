import * as actionTypes from './actionTypes'
import glpi from '../../shared/glpiApi'
import { uiTransactionFinish, uiTransactionStart } from '../ui/actions'
import itemtype from '../../shared/itemtype'
import handleMessage from '../../shared/handleMessage'
import appConfig from '../../../public/config.json'

// Actions

export const changeNotificationMessage = notification => {
  return {
      type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
      notification
  }
}

export const authSuccess = user => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      user
  }
}

export const authFail = error => {
  return {
      type: actionTypes.AUTH_FAIL,
      error
  }
}

export const logout = history => {
  return {
      type: actionTypes.LOGOUT,
      history
  }
}

export const authRefreshCaptcha = ({ idCaptcha, imgCaptcha, configurationPassword }) => {
  return {
    type: actionTypes.AUTH_REFRESH_CAPTCHA,
    captcha: {
      id: idCaptcha,
      img: imgCaptcha
    },
    configurationPassword: configurationPassword
  }
}

export function changePasswordConfiguration (newConfiguration) {
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
    }).then( response => {      
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
    }).catch( error => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error})))
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
      const session     = await glpi.initSessionByUserToken({ userToken: appConfig.userToken })
      glpi.sessionToken = session.session_token
      const {id}        = await glpi.addItem({ itemtype: itemtype.PluginFlyvemdmdemoCaptcha, input: {}})
      const captcha     = await glpi.genericRequest({
        path: `PluginFlyvemdmdemoCaptcha/${id}`,
        queryString: { alt: 'media' }, 
        requestParams: { 
        method: 'GET', 
        headers: {'Content-Type': 'application/octet-stream'}, 
        responseType: 'blob' } 
      })
      const { cfg_glpi } = await glpi.getGlpiConfig()
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
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
    }
  }
}
/**
 * 
 * @param {Object} data
 */
export const fetchSignUp = (data) => {
  return dispatch => {
    dispatch(uiTransactionStart())
    glpi.registerUser({ 
      userToken: appConfig.userToken,
      userData: data, 
      itemtype: itemtype.PluginFlyvemdmdemoUser })
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
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
    })
  }
}

export const fetchRecoverPassword = (email) => {
  return dispatch => { // TODO: Create this
    dispatch(uiTransactionStart())
    glpi.genericRequest({
      path: 'lostPassword',
      requestParams: {
        method: 'PUT',
        body: JSON.stringify({ "email": email })
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
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
    })
  }
}

export const fetchResetPassword = ({email, token, newPassword}) => {
  return dispatch => { // TODO: Create this
    dispatch(uiTransactionStart())
    glpi.genericRequest({
      path: 'lostPassword',
      requestParams: {
        method: 'PUT',
        body: JSON.stringify({ "email": email, "password_forget_token": token, "password": newPassword })
      }
    })
      .then(([response, json]) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage({
          title: appConfig.APP_NAME,
          body: json[0],
          type: 'success'
        }))
      })
      .catch((error) => {
        dispatch(uiTransactionFinish())
        dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
      })
  }
}

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
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
    })
  }
}

export function fetchSendFeedback (data) {
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
      dispatch(changeNotificationMessage(handleMessage({ type: 'alert', message: error })))
    })
  }
}
