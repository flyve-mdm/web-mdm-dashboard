import * as actionTypes from './actionTypes'

// Actions

export const uiSetNotification = notification => {
  return {
      type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
      notification
  }
}

export const uiHideNotification = () => {
  return {
    type: actionTypes.HIDE_NOTIFICATION    
  }
}

export const uiTransactionStart = () => {
  return {
      type: actionTypes.UI_TRANSACTION_START
  };
};

export const uiTransactionFinish = success => {
  return {
      type: actionTypes.UI_TRANSACTION_FINISH,
      success
  };
};

export const uiTransactionFail = error => {
  return {
      type: actionTypes.UI_TRANSACTION_FAIL,
      error: error
  };
};