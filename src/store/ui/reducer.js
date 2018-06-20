/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

/** import dependencies */
import * as actionTypes from './actionTypes'
import initialState from "./initialState"
import {
  updateObject
} from '../../shared/updateObject'

/**
 * Set notification
 * @param {objec} state
 * @param {object} action
 */
const uiSetNotification = (state, action) => {
  return updateObject(state, {
    notification: {
      show: true,
      ...action.notification
    }
  })
}

/**
 * Hide notification
 * @param {objec} state
 * @param {object} action
 */
const uiHideNotification = (state) => {
  return updateObject(state, {
    notification: {
      show: false
    }
  })
}

/**
 * Start transaction
 * @param {objec} state
 * @param {object} action
 */
const uiTransactionStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

/**
 * Fail transaction
 * @param {objec} state
 * @param {object} action
 */
const uiTransactionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

/**
 * Finish transaction
 * @param {objec} state
 * @param {object} action
 */
const uiTransactionFinish = (state, action) => {
  return updateObject(state, {
    error: null,
    success: action.success || null,
    loading: false
  })
}

/**
 * Define reducers
 * @param {object} state
 * @param {object} action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_NOTIFICATION_MESSAGE:
      return uiSetNotification(state, action)
    case actionTypes.HIDE_NOTIFICATION:
      return uiHideNotification(state)
    case actionTypes.UI_TRANSACTION_START:
      return uiTransactionStart(state, action)
    case actionTypes.UI_TRANSACTION_FAIL:
      return uiTransactionFail(state, action)
    case actionTypes.UI_TRANSACTION_FINISH:
      return uiTransactionFinish(state, action)
    default:
      return state
  }
}

export default reducer
