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

/** @module animations WinJS */

/** Import dependencies */
import I18n from '../i18n'

/**
 * Replace a status code with string associated
 * @param {int} id Status code authentication
 * @returns {string} string associated with a staus code
 */
const authtype = (id) => {
  switch (id) {
    case 1:
      return I18n.t('authtype.glpi_internal_database')
    case 2:
      return I18n.t('authtype.mail_server')
    case 3:
      return I18n.t('authtype.ldap_directory')
    case 4:
      return I18n.t('authtype.other')
    case 5:
      return I18n.t('authtype.cas')
    case 6:
      return I18n.t('authtype.certificate_authentication')
    case 7:
      return I18n.t('authtype.api')
    case 8:
      return I18n.t('authtype.cookie')
    case 0:
      return I18n.t('authtype.not_yet_authenticated')
    default:
      return I18n.t('commons.not_available')
  }
}

/** Export authType animation */
export default authtype
