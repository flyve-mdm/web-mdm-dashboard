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

import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../shared/i18n'

/**
 * Component to errors of a form field
 * @class ErrorValidation
 * @extends PureComponent
 */
class ErrorValidation extends PureComponent {

  /**
   * Validate a data according to determined parameters
   * @static
   * @function validation
   * @param {object} parametersToEvaluate
   * @param {*} value
   * @return {object} shows if there are errors or not, and what are these
   */
  static validation = (parametersToEvaluate, value) => {
    let errorMessages = []

    if (parametersToEvaluate.isRequired && !value)
      errorMessages.push(I18n.t('validation.required_field'))
    if (parametersToEvaluate.minimunLength) {
      if (value.length < parametersToEvaluate.minimunLength)
        errorMessages.push(
          `${I18n.t('validation.insufficient_characters')} ${parametersToEvaluate.minimunLength} ${I18n.t('validation.is_requiered')}`
        )
    }
    if (parametersToEvaluate.needDigit) {
      const myRe = /[\d]/g
      if (!myRe.test(value))
        errorMessages.push(I18n.t('validation.one_digit'))
    }
    if (parametersToEvaluate.needLowercaseCharacter) {
      const myRe = /[a-z]/g
      if (!myRe.test(value))
        errorMessages.push(I18n.t('validation.lowercase_character'))
    }
    if (parametersToEvaluate.needUppercaseCharacter) {
      const myRe = /[A-Z]/g
      if (!myRe.test(value))
        errorMessages.push(I18n.t('validation.uppercase_character'))
    }
    if (parametersToEvaluate.needSymbol) {
      const myRe = /[!@#%^&*?><)(+=._\-\\[\]^~`'"˜$ˆ/:;{}|]/g
      if (!myRe.test(value))
        errorMessages.push(I18n.t('validation.special_character'))
    }
    if (parametersToEvaluate.isEmail) {
      const myRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
      if (!myRe.test(value))
        errorMessages.push(I18n.t('validation.invalid_email'))
    }
    if (parametersToEvaluate.isEqualTo) {
      if (value !== parametersToEvaluate.isEqualTo.value)
        errorMessages.push(parametersToEvaluate.isEqualTo.message)
    }
    if (parametersToEvaluate.customValidation) {
      if (parametersToEvaluate.customValidation(value))
        errorMessages.push(parametersToEvaluate.customValidation(value))
    }

    const result = (errorMessages.length <= 0) ? {
      isCorrect: true,
      errors: []
    } : {
      isCorrect: false,
      errors: errorMessages
    }

    return result
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="error-message">
        <ul>
          {
            this.props.errors.map((element, index) => {
              return <li key={index}>- {element}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

ErrorValidation.defaultProps = {
  errors: []
}

ErrorValidation.propTypes = {
  errors: PropTypes.array
}

export default ErrorValidation
