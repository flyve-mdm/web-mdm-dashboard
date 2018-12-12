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
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import Input from 'components/Forms/Input'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'
import withGLPI from 'hoc/withGLPI'

/**
 * Component with the ForgotPassword section
 * @class ForgotPassword
 * @extends PureComponent
 */
class ForgotPassword extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRecoverSent: false,
      text: '',
    }
  }

  /**
   * Focus the form input
   * @function componentDidMount
   */
  componentDidMount() {
    if (this.textInput) this.textInput.focus()
  }

  /**
   * Close the active session (if it exists) and make the request to recover password
   * @function handleRecover
   * @async
   * @param {object} event
   */
  handleRecover = async (event) => {
    event.preventDefault()
    this.setState({
      isLoading: true,
    })
    if (this.props.glpi.sessionToken) {
      try {
        await this.props.glpi.killSession()
      } catch (error) {}
    }
    try {
      await this.props.glpi.genericRequest({
        path: 'lostPassword',
        requestParams: {
          method: 'PUT',
          body: JSON.stringify({
            email: this.state.text,
          }),
        },
      })
      this.setState({
        isRecoverSent: true,
        isLoading: false,
      })
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'success',
        message: I18n.t('notifications.request_sent'),
      }))
    } catch (error) {
      this.setState({
        isLoading: false,
      })
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'warning',
        message: error,
      }))
    }
  }

  /**
   * Validate if necessary the form or the button to go home
   * @function renderElement
   * @return {component}
   */
  renderElement = () => {
    let element
    if (!this.state.isRecoverSent) {
      element = (
        <div className="authentication__forgot-password">
          <p>
            {I18n.t('forgot_password.help_reset_password')}
          </p>
          <form onSubmit={this.handleRecover}>
            <Input
              label=""
              type="text"
              name="text"
              value={this.state.text}
              placeholder={I18n.t('commons.flyve_mdm_email')}
              required
              function={(name, value) => { this.setState({ text: value }) }}
              inputRef={(input) => { this.textInput = input }}
            />

            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => this.props.history.push(`${publicURL}/`)}
            >
              {I18n.t('commons.back')}
            </button>

            <button className="btn btn--primary" type="submit">
              {I18n.t('login.reset_password')}
            </button>
          </form>
        </div>
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
   * Render component
   * @function render
   */
  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.sending')}...`} />
        </div>
      )
    }
    return (
      <React.Fragment>
        <h2>
          {I18n.t('forgot_password.title')}
        </h2>
        { this.renderElement() }
      </React.Fragment>
    )
  }
}

ForgotPassword.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(withAuthenticationLayout((withHandleMessages(ForgotPassword)), {
  centerContent: true,
}))
