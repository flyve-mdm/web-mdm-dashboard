import * as actionTypes from './actionTypes'
import initialState from "./initialState"

// Actions

export const changeLanguage = languageName => {
  return {
      type: actionTypes.CHANGE_LANGUAGE,
      languageCurrent: languageName
  }
}

export const changeLanguageFallBack = () => {
  return {
      type: actionTypes.CHANGE_LANGUAGE_FALLBACK,
      languageDefault: initialState.languageDefault
  }
}