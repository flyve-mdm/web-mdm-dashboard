import * as actionTypes from './actionTypes'

export const changeNotificationMessage = notification => {
  return {
      type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
      notification
  }
}

export const changeUsername = username => {
  return {
      type: actionTypes.CHANGE_USERNAME,
      username
  }
}

export const changeEmail = email =>  {
  return {
      type: actionTypes.CHANGE_EMAIL,
      email
  }
}

export const changeCurrentUser = currentUser =>  {
  return {
      type: actionTypes.CHANGE_CURRENT_USER,
      currentUser
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.LOGOUT_USER
  }
}