import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import { updateObject } from '../../shared/updateObject'

// Sugar Functions

const changeNotificationMessage = (state, action) => {
  return updateObject(state, {notification: action.notification})
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

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE: return changeNotificationMessage(state, action)
    default: return state
  }
}

export default reducer