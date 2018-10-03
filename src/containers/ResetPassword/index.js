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
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import ConstructInputs from 'components/Forms'
import ErrorValidation from 'components/ErrorValidation'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component with the reset password section
 * @class ResetPassword
 * @extends PureComponent
 */
class ResetPassword extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    const { search } = this.props.location
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (!token) {
      this.props.history.push(`${publicURL}/`)
    }

    this.state = {
      token,
      isResetSent: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      forceValidation: false,
    }
  }

  /**
   * Create the element to render
   * @function createRenderElament
   * @return {component}
   */
  createRenderElament = () => {
    let element
    if (!this.state.isResetSent) {
      const reset = this.buildDataArray()
      element = (
        <>
          <div style={{ textAlign: 'left' }}>
            <ConstructInputs data={reset.resetInformation} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn--primary"
              style={{ margin: '20px' }}
              onClick={this.handleResetPassword}
              type="submit"
            >
              {I18n.t('login.reset_password')}
            </button>
          </div>
        </>
      )
    } else {
      element = (
        <div>
          <p>
            {I18n.t('forgot_password.reset_your_password')}
          </p>
          <button
            className="win-button"
            type="button"
            onClick={() => this.props.history.push(`${publicURL}/`)}
          >
            {I18n.t('forgot_password.go_home')}
          </button>
        </div>
      )
    }
    return element
  }

  /**
   * Validate new password and save this in glpi
   * @function handleResetPassword
   */
  handleResetPassword = () => {
    const user = this.buildDataArray()
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
      this.setState({
        isResetSent: true,
      })
      this.props.auth.fetchResetPassword({
        email: this.state.email,
        token: this.state.token,
        newPassword: this.state.password,
      })
        .then((response) => {
          this.props.toast.setNotification(response)
        })
        .catch((error) => {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
        })
    } else {
      this.setState({
        forceValidation: true,
      })
    }
  }

  /**
   * Handle change state
   * @function changeState
   * @return {function}
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Build the array to generate the form
   * @param {object} I18n
   * @return {array}
   */
  buildDataArray = () => {
    const dataArray = {
      resetInformation: [
        [{
          label: I18n.t('commons.email'),
          type: 'text',
          name: 'email',
          value: this.state.email,
          placeholder: I18n.t('commons.email'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            isEmail: true,
          },
          forceValidation: this.state.forceValidation,
        },
        {
          label: I18n.t('commons.password'),
          type: 'password',
          name: 'password',
          value: this.state.password,
          placeholder: I18n.t('commons.password'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...this.state.configurationPassword,
          },
          forceValidation: this.state.forceValidation,
        },
        {
          label: I18n.t('commons.password_confirmation'),
          type: 'password',
          name: 'passwordConfirmation',
          value: this.state.passwordConfirmation,
          placeholder: I18n.t('commons.password_confirmation'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...this.state.configurationPassword,
            isEqualTo: {
              value: this.state.password,
              message: I18n.t('commons.passwords_not_match'),
            },
          },
          forceValidation: this.state.forceValidation,
        },
        ],
      ],
    }
    return dataArray
  }


  /**
   * Render component
   * @function render
   */
  render() {
    if (this.props.auth.isLoading) {
      return (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.sending')}...`} />
        </div>
      )
    }
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>
          {I18n.t('login.reset_password')}
        </h2>
        {this.createRenderElament()}
      </>
    )
  }
}

ResetPassword.defaultProps = {
}

ResetPassword.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withAuthenticationLayout((withHandleMessages(ResetPassword)), {
  centerContent: true,
})
