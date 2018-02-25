import * as actionTypes from './actionTypes'

export const changeNotificationMessage = newNotification => {
  return {
      type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
      newNotification
  }
}

export const changeUsername = newUsername => {
  return {
      type: actionTypes.CHANGE_USERNAME,
      newUsername
  }
}

export const changeCurrentUser = newCurrentUser =>  {
  return {
      type: actionTypes.CHANGE_CURRENT_USER,
      newCurrentUser
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.LOGOUT_USER
  }
}