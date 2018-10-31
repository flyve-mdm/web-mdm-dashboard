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

import I18n from 'shared/i18n'

/**
 * User data schema
 * @function agent
 * @param {object} state
 * @param {function} changeState
 * @param {function} changeEmail
 * @param {function} deleteEmail
 * @param {function} changeSelect
 * @param {object} glpi
 * @return {array}
 */
export default function ({
  login,
  realName,
  firstName,
  title,
  location,
  phone,
  phone2,
  validSince,
  administrativeNumber,
  passwordConfirmation,
  created,
  mobilePhone,
  password,
  lastLogin,
  comments,
  modified,
  validUntil,
  parametersToEvaluate,
  authentication,
  defaultEntity,
  defaultProfile,
  category,
  emails,
  changeState,
  changeEmail,
  deleteEmail,
  changeSelect,
  glpi,
  newUser,
}) {
  const personalInformation = [
    [
      {
        label: I18n.t('commons.login'),
        type: 'text',
        name: 'login',
        value: `${login}`,
        placeholder: null,
        function: changeState,
        disabled: !newUser,
        style: {
          width: 'auto',
        },
      }],
    [
      {
        label: I18n.t('commons.realname'),
        type: 'text',
        name: 'realName',
        value: `${realName}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
      {
        label: I18n.t('commons.first_name'),
        type: 'text',
        name: 'firstName',
        value: `${firstName}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
    ],
    [
      {
        label: I18n.t('commons.title'),
        type: 'select',
        name: 'title',
        value: title.value,
        options: [],
        function: changeSelect,
        request: title.request,
        glpi,
      },
    ],
  ]

  if (!newUser) {
    personalInformation[2].push(
      {
        label: I18n.t('commons.location'),
        type: 'select',
        name: 'location',
        value: location.value,
        options: [],
        function: changeSelect,
        request: location.request,
        glpi,
      },
      {
        label: I18n.t('commons.default_profile'),
        type: 'select',
        name: 'defaultProfile',
        value: defaultProfile.value,
        options: [],
        function: changeSelect,
        request: defaultProfile.request,
        glpi,
      },
    )
  }

  const contactInformation = [
    [
      {
        label: I18n.t('commons.phone'),
        type: 'text',
        name: 'phone',
        value: `${phone}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
      {
        label: I18n.t('commons.mobile_phone'),
        type: 'text',
        name: 'mobilePhone',
        value: `${mobilePhone}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
    ],
    [
      {
        label: I18n.t('commons.phone_2'),
        type: 'text',
        name: 'phone2',
        value: `${phone2}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
      {
        label: I18n.t('commons.administrative_number'),
        type: 'text',
        name: 'administrativeNumber',
        value: `${administrativeNumber}`,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
    ],
  ]
  const passwordInformation = [
    [
      {
        label: I18n.t('commons.password'),
        type: 'password',
        name: 'password',
        value: password,
        placeholder: null,
        function: changeState,
        parametersToEvaluate,
        disabled: false,
        style: null,
      },
      {
        label: I18n.t('commons.password_confirmation'),
        type: 'password',
        name: 'passwordConfirmation',
        value: passwordConfirmation,
        placeholder: null,
        parametersToEvaluate: {
          ...parametersToEvaluate,
          isEqualTo: {
            value: password,
            message: I18n.t('commons.passwords_not_match'),
          },
        },
        function: changeState,
        disabled: false,
        style: null,
      },
    ],
  ]

  const activityInformation = [
    [
      {
        label: I18n.t('commons.last_login'),
        type: 'text',
        name: 'lastLogin',
        value: `${lastLogin}`,
        placeholder: null,
        function: changeState,
        disabled: true,
        style: {
          width: '100%',
        },
      },
      {
        label: I18n.t('commons.created'),
        type: 'text',
        name: 'created',
        value: `${created}`,
        placeholder: null,
        function: changeState,
        disabled: true,
        style: {
          width: 'auto',
        },
      },
      {
        label: I18n.t('commons.modified'),
        type: 'text',
        name: 'modified',
        value: `${modified}`,
        placeholder: null,
        function: changeState,
        disabled: true,
        style: {
          width: 'auto',
        },
      },
    ],
  ]

  const validDatesInformation = [
    [
      {
        label: I18n.t('commons.valid_since'),
        type: 'date',
        name: 'validSince',
        value: validSince,
        function: changeState,
      },
    ],
    [
      {
        label: I18n.t('commons.valid_until'),
        type: 'date',
        name: 'validUntil',
        value: validUntil,
        function: changeState,
      },
    ],
  ]

  const moreInformation = [
    [
      {
        label: I18n.t('commons.category'),
        type: 'select',
        name: 'category',
        value: category.value,
        options: [],
        function: changeSelect,
        request: category.request,
        glpi,
      },
      {
        label: I18n.t('commons.default_entity'),
        type: 'select',
        name: 'defaultEntity',
        value: defaultEntity.value,
        options: [],
        function: changeSelect,
        request: defaultEntity.request,
        glpi,
      },
    ],
    [
      {
        label: I18n.t('commons.comments'),
        type: 'textArea',
        name: 'comments',
        value: comments,
        placeholder: null,
        function: changeState,
        disabled: false,
        style: null,
      },
    ],
  ]

  if (!newUser) {
    moreInformation.unshift(
      [
        {
          label: I18n.t('commons.authentication'),
          type: 'text',
          name: 'authentication',
          value: `${authentication}`,
          placeholder: null,
          function: changeState,
          disabled: true,
          style: null,
        },
      ],
    )
  }

  let emailsInformation = [
    [],
  ]

  for (let index = 0; index < emails.length; index += 1) {
    emailsInformation = [
      ...emailsInformation, [{
        name: index,
        label: `${I18n.t('commons.email')} ${index + 1}`,
        type: 'email',
        value: emails[index].email,
        placeholder: null,
        function: changeEmail,
        disabled: false,
        style: null,
        delete: deleteEmail,
      }],
    ]
  }

  return {
    personalInformation,
    contactInformation,
    passwordInformation,
    activityInformation,
    validDatesInformation,
    moreInformation,
    emailsInformation,
  }
}
