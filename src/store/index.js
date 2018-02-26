import { combineReducers } from 'redux';
import reducerI18N from './i18n/reducer'
import reducerAuthentication from './authentication/reducer'
import reducerUI from './ui/reducer'

export default combineReducers({
  language: reducerI18N,
  auth: reducerAuthentication,
  ui: reducerUI
})