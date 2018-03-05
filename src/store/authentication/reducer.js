import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import { updateObject } from '../../shared/updateObject'

// Sugar Functions

const changeNotificationMessage = (state, action) => {
  return updateObject(state, {notification: action.notification})
}

const changePasswordConfiguration = (state, action) => {
  return updateObject(state, {configurationPassword: action.configurationPassword})
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: {
      id: action.user.id,
      username: action.user.username,
      email: action.user.email,
      picture: action.user.picture
    }
  });
}

const authFail = (state, action) => {
  return updateObject(state, {error: action.error, loading: false})
}

const authLogout = (state, action) => {
  return updateObject(state, {
    id: null,
    username: null,
    email: null, 
    picture: null 
  });
}

const authRefreshCaptcha = (state, action) => {
  return updateObject(state, {
    captcha: action.captcha,
    configurationPassword: action.configurationPassword
  });
}

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_REFRESH_CAPTCHA: return authRefreshCaptcha(state, action);
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE: return changeNotificationMessage(state, action);
    case actionTypes.CHANGE_PASSWORD_CONFIGURATION: return changePasswordConfiguration(state, action);
    default: return state;
  }
}

export default reducer