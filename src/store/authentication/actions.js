import * as actionTypes from './actionTypes'
import glpi from '../../shared/glpiApi'
import config from '../../config/config.json'
import { uiTransactionFinish, uiTransactionStart } from '../ui/actions';

// Actions

export const changeNotificationMessage = notification => {
  return {
      type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
      notification
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authSuccess = user => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      user: user
  };
};

export const authFail = error => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  };
};

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
    }).catch( error => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage({
        title: config.APP_NAME,
        body: `${error[0]}\n${error[1]}`,
        type: 'warning'
      }))
    })
  }
}

/** 
* Fetch and Refresh de Captcha 
* 
*/
export const fetchCaptcha = () => {
  return async dispatch => {
    dispatch(uiTransactionStart())
    try {
      const session     = await glpi.initSessionByUserToken({ userToken: config.USER_TOKEN })
      glpi.sessionToken = session.session_token
      const {id}        = await glpi.addItem({ itemtype: 'PluginFlyvemdmdemoCaptcha', input: {}})
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
      dispatch(changeNotificationMessage({
        title: config.APP_NAME,
        body: `${error[0]}\n${error[1]}`,
        type: 'warning'
      }))
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
      userToken: config.USER_TOKEN, 
      userData: data, 
      itemtype: 'PluginFlyvemdmdemoUser' })
    .then(() => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage({
        title: config.APP_NAME,
        body: 'Successfully registered user'
      }))
    })
    .catch((error) => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage({
        title: config.APP_NAME,
        body: `${error[0]}\n${error[1]}`,
        type: 'warning' 
      }))
    })
  }
}
