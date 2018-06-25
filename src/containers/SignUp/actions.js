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
import ErrorValidation from '../../components/ErrorValidation';

/**
 * Handle change state
 * @function changeState
 * @param {object} ctx
 * @return {function}
 */
export const changeState = ctx => (name, value) => {
  ctx.setState({
    [name]: value,
  })
}

/**
 * Build the array to generate the form
 * @function buildDataArray
 * @param {object} ctx
 * @param {*} I18n
 * @return {array}
 */
export const buildDataArray = (ctx, I18n) => {
  const dataArray = {
    personalInformation: [
      [{
        label: I18n.t('commons.email'),
        type: 'text',
        name: 'email',
        value: ctx.state.email,
        placeholder: I18n.t('commons.email'),
        function: ctx.changeState(),
        disabled: false,
        style: {
          width: 340,
        },
        parametersToEvaluate: {
          isRequired: true,
          isEmail: true,
        },
        forceValidation: ctx.state.forceValidation,
      },
      {
        label: I18n.t('create_account.full_name'),
        type: 'text',
        name: 'realName',
        value: ctx.state.realName,
        placeholder: I18n.t('create_account.full_name'),
        function: ctx.changeState(),
        disabled: false,
        style: {
          width: 340,
        },
        parametersToEvaluate: {
          isRequired: true,
        },
        forceValidation: ctx.state.forceValidation,
      },
      ],
    ],
    passwordInformation: [
      [{
        label: I18n.t('commons.password'),
        type: 'password',
        name: 'password',
        value: ctx.state.password,
        placeholder: I18n.t('commons.password'),
        function: ctx.changeState(),
        disabled: false,
        style: {
          width: 340,
        },
        parametersToEvaluate: {
          isRequired: true,
          ...ctx.state.configurationPassword,
        },
        forceValidation: ctx.state.forceValidation,
      },
      {
        label: I18n.t('commons.password_confirmation'),
        type: 'password',
        name: 'passwordConfirmation',
        value: ctx.state.passwordConfirmation,
        placeholder: I18n.t('commons.password_confirmation'),
        function: ctx.changeState(),
        disabled: false,
        style: {
          width: 340,
        },
        parametersToEvaluate: {
          isRequired: true,
          ...ctx.state.configurationPassword,
          isEqualTo: {
            value: ctx.state.password,
            message: I18n.t('commons.passwords_not_match'),
          },
        },
        forceValidation: ctx.state.forceValidation,
      },
      ],
    ],
    captchaInformation: [
      [{
        label: I18n.t('create_account.enter_code_image'),
        type: 'text',
        name: 'captchaValue',
        value: ctx.state.captchaValue,
        placeholder: null,
        function: ctx.changeState(),
        disabled: false,
        style: {
          width: 340,
        },
        parametersToEvaluate: {
          isRequired: true,
        },
        forceValidation: ctx.state.forceValidation,
      }],
    ],
  }
  return dataArray
}

/**
 * Handle submit form
 * @function handleSubmitForm
 * @param {*} ctx
 * @param {*} event
 */
export const handleSubmitForm = (ctx, event) => {
  event.preventDefault()
  const user = ctx.buildDataArray()

  let isCorrect = true

  for (const key in user) {
    if (Object.prototype.hasOwnProperty.call(user, key)) {
      const elements = user[key]
      for (let index = 0; index < elements[0].length; index += 1) {
        const element = elements[0][index]
        if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) { isCorrect = false }
      }
    }
  }

  if (isCorrect) {
    ctx.props.actions.fetchSignUp({
      name: ctx.state.email,
      realname: ctx.state.realName,
      password: ctx.state.password,
      password2: ctx.state.passwordConfirmation,
      _useremails: [ctx.state.email],
      _plugin_flyvemdmdemo_captchas_id: ctx.props.captcha.id,
      _answer: ctx.state.captchaValue,
    })
  } else {
    ctx.setState({
      forceValidation: true,
    })
  }
}
