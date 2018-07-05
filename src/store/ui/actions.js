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

// Actions
/**
 * Action set notification
 * @param {string} notification
 * @returns {object} action notification
 */
export const uiSetNotification = notification => {
  return {
    type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
    notification
  }
}

/**
 * Action hide notification
 * @returns {object} action hide notification
 */
export const uiHideNotification = () => {
  return {
    type: actionTypes.HIDE_NOTIFICATION
  }
}

/**
 * Action start transaction
 * @returns {object} action start transaction
 */
export const uiTransactionStart = () => {
  return {
    type: actionTypes.UI_TRANSACTION_START
  };
};

/**
 * Action finish transaction
 * @returns {object} action finish transaction
 */
export const uiTransactionFinish = success => {
  return {
    type: actionTypes.UI_TRANSACTION_FINISH,
    success
  }
}

/**
 * Action Fail transaction
 * @returns {object} action Fail transaction
 */
export const uiTransactionFail = error => {
  return {
    type: actionTypes.UI_TRANSACTION_FAIL,
    error: error
  }
}
