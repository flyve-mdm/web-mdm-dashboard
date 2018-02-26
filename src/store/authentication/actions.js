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

// Actions Creators

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
        body: `${error[0]}\n${error[1]}` 
      }))
    })
  }
}