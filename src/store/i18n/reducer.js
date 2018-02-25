import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import { updateObject } from '../../shared/updateObject'

const changeLanguage = (state, action) => {
  return updateObject(state, {locationLanguage: action.languageCurrent})
}

const changeLanguageFallBack = (state, action) => {
  return updateObject(state, {locationLanguage: action.languageDefault})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE: return changeLanguage(state, action);
    case actionTypes.CHANGE_LANGUAGE_FALLBACK: return changeLanguageFallBack(state, action);
    default: return state
  }
}

export default reducer