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

import {
  I18n
} from "react-i18nify"

/**
 * Supervision data schema
 * @function agent
 * @param {object} state
 * @param {function} changeState
 * @return {array}
 */
export default function ({
  state,
  changeState
}) {
  const helpDeskInformation = [
    [{
      label: I18n.t('commons.support_name'),
      type: "text",
      name: "name",
      value: state.name,
      placeholder: null,
      function: changeState,
      disabled: false,
      style: null
    }],
    [{
      label: I18n.t('commons.support_phone'),
      type: "text",
      name: "phone",
      value: state.phone,
      placeholder: null,
      function: changeState,
      disabled: false,
      style: null
    }],
    [{
      label: I18n.t('commons.support_website'),
      type: "text",
      name: "website",
      value: state.website,
      placeholder: null,
      function: changeState,
      disabled: false,
      style: null
    }],
    [{
      label: I18n.t('commons.support_email'),
      type: "text",
      name: "email",
      value: state.email,
      placeholder: null,
      function: changeState,
      disabled: false,
      style: null
    }],
    [{
      label: I18n.t('commons.support_address'),
      type: "textArea",
      name: "address",
      value: state.address,
      placeholder: null,
      function: changeState,
      disabled: false,
      style: null
    }]
  ]

  return {
    helpDeskInformation
  }
}
