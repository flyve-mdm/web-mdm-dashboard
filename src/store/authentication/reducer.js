import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import { updateObject } from '../../shared/updateObject'

const changeUsername = (state, action) => {
  return updateObject(state, {username: action.username})
}

const changeEmail = (state, action) => {
  return updateObject(state, {email: action.email})
}

const changeCurrentUser = (state, action) => {
  return updateObject(state, {currentUser: action.currentUser})
}

const changeNotificationMessage = (state, action) => {
  return updateObject(state, {email: action.notification})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USERNAME: return changeUsername(state, action)
    case actionTypes.CHANGE_EMAIL: return changeEmail(state, action)
    case actionTypes.CHANGE_CURRENT_USER: return changeCurrentUser(state, action)
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE: return changeNotificationMessage(state, action)
    default: return state
  }
}

export default reducer