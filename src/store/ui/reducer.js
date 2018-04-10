import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import { updateObject } from '../../shared/updateObject'

// Sugar Functions

const uiSetNotification = (state, action) => {
  return updateObject(state, {notification: {
    show: true,
    ...action.notification
  }})
}

const uiHideNotification = (state) => {
  return updateObject(state, {notification: {
    show: false
  }})
}

const uiTransactionStart = (state, action) => {
  return updateObject(state, {error: null, loading: true})
}

const uiTransactionFail = (state, action) => {
  return updateObject(state, {error: action.error, loading: false})
}

const uiTransactionFinish = (state, action) => {
  return updateObject(state, {
    error: null,
    success: action.success || null,
    loading: false
  })
}

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE: return uiSetNotification(state, action)
    case actionTypes.HIDE_NOTIFICATION: return uiHideNotification(state)
    case actionTypes.UI_TRANSACTION_START: return uiTransactionStart(state, action)
    case actionTypes.UI_TRANSACTION_FAIL: return uiTransactionFail(state, action)
    case actionTypes.UI_TRANSACTION_FINISH: return uiTransactionFinish(state, action)
    default: return state
  }
}

export default reducer