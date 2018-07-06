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

/** @module handleMessage */

/** import dependencies */
import I18n from '../../shared/i18n'
import logout from '../logout'

/**
 * Add format to error message
 * @param {string} type of message
 * @param {string} message content
 * @param {string} title of message
 * @returns {string} Get error message
 */
export default ({
  type = 'info',
  message,
  title,
}) => {
  const response = {
    type,
    title: (title || I18n.t(`commons.${(type !== 'alert') ? type : 'error'}`)),
    body: message ? (typeof message === 'string' || message instanceof String) ? message : message.statusText : '',
  }
  if (message) {
    switch (true) {
      case (message.status === 0):
        response.body = I18n.t('notifications.no_internet_connection')
        break
      case (message.status === 401):
        response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
        if (message.data[0][1] === 'session_token seems invalid') {
          logout()
        }
        break
      case (message.status === 404):
        response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
        break
      case (message.status >= 400 && message.status < 500 && message.status !== 401):
        response.body = message.data[0][1] ? Array.isArray(message.data[1]) ? message.data[1][0].message
          : message.data[0][1] : message.statusText
        break
      default:
        break
    }
  }
  return response
}
