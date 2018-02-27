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
        body: 'Successfully registered user',
        type: 'success'
      }))
    })
    .catch((error) => {
      dispatch(uiTransactionFinish())
      dispatch(changeNotificationMessage({
        title: config.APP_NAME,
        body: ${error[0]}\n${error[1]},
        type: 'warning' 
      }))
    })
  }
}


export const fetchRecoverPassword = ()=> {
  return dispatch => { // TODO: Create this
    dispatch(uiTransactionStart())
  }
}