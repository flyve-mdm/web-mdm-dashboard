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
import {
  Link,
} from 'react-router-dom'
import {
  I18n,
} from 'react-i18nify'
import {
  bindActionCreators,
} from 'redux'
import {
  connect,
} from 'react-redux'
import Loading from '../../components/Loading'
import ConstructInputs from '../../components/Forms'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import {
  changeNotificationMessage,
  fetchCaptcha,
  fetchSignUp,
} from '../../store/authentication/actions'
import publicURL from '../../shared/publicURL'
import ErrorValidation from '../../components/ErrorValidation'

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchCaptcha: bindActionCreators(fetchCaptcha, dispatch),
    fetchSignUp: bindActionCreators(fetchSignUp, dispatch),
    changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
  }
  return {
    actions,
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.ui.loading,
    type: state.ui.notification.type,
    captcha: state.auth.captcha,
    configurationPassword: state.auth.configurationPassword,
  }
}

/**
 * Component with the registration form
 * @class SignUp
 * @extends PureComponent
 */
class SignUp extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      realName: '',
      password: '',
      passwordConfirmation: '',
      captchaValue: '',
      forceValidation: false,
    }
  }

  /**
   * Fetch the captcha
   * @function componentDidMount
   */
  componentDidMount() {
    const { actions } = this.props
    actions.fetchCaptcha()
  }

  /**
   * redirect to '/validateAccount' when the registration is success
   * @function componentDidUpdate
   */
  componentDidUpdate() {
    const {
      type,
      history,
    } = this.props

    if (type === 'success') {
      history.push(`${publicURL}/validateAccount`)
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
   * @function buildDataArray
   * @return {array}
   */
  buildDataArray = () => {
    const {
      email,
      forceValidation,
      realName,
      password,
      configurationPassword,
      passwordConfirmation,
      captchaValue,
    } = this.state

    const dataArray = {
      personalInformation: [
        [{
          label: I18n.t('commons.email'),
          type: 'text',
          name: 'email',
          value: email,
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
          forceValidation,
        },
        {
          label: I18n.t('create_account.full_name'),
          type: 'text',
          name: 'realName',
          value: realName,
          placeholder: I18n.t('create_account.full_name'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
          },
          forceValidation,
        },
        ],
      ],
      passwordInformation: [
        [{
          label: I18n.t('commons.password'),
          type: 'password',
          name: 'password',
          value: password,
          placeholder: I18n.t('commons.password'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...configurationPassword,
          },
          forceValidation,
        },
        {
          label: I18n.t('commons.password_confirmation'),
          type: 'password',
          name: 'passwordConfirmation',
          value: passwordConfirmation,
          placeholder: I18n.t('commons.password_confirmation'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...configurationPassword,
            isEqualTo: {
              value: password,
              message: I18n.t('commons.passwords_not_match'),
            },
          },
          forceValidation,
        },
        ],
      ],
      captchaInformation: [
        [{
          label: I18n.t('create_account.enter_code_image'),
          type: 'text',
          name: 'captchaValue',
          value: captchaValue,
          placeholder: null,
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
          },
          forceValidation,
        }],
      ],
    }
    return dataArray
  }

  /**
   * Handle submit form
   * @function handleSubmitForm
   * @param {*} event
   */
  handleSubmitForm = (event) => {
    event.preventDefault()

    const {
      email,
      realName,
      password,
      passwordConfirmation,
      captchaValue,
    } = this.state
    const {
      actions,
      captcha,
    } = this.props

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
      actions.fetchSignUp({
        name: email,
        realname: realName,
        password,
        password2: passwordConfirmation,
        _useremails: [email],
        _plugin_flyvemdmdemo_captchas_id: captcha.id,
        _answer: captchaValue,
      })
    } else {
      this.setState({
        forceValidation: true,
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      isLoading,
      captcha,
      actions,
    } = this.props

    let renderComponent
    if (isLoading) {
      renderComponent = (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      const user = this.buildDataArray()
      renderComponent = (
        <React.Fragment>
          <h2 style={{ textAlign: 'center' }}>
            { I18n.t('create_account.title') }
          </h2>

          <form onSubmit={event => this.handleSubmitForm(event)}>
            <ConstructInputs data={user.personalInformation} />
            <ConstructInputs data={user.passwordInformation} />
            <ConstructInputs data={user.captchaInformation} />
            <div className="authentication__captcha-img">
              <img src={captcha.img} alt="Captcha" />
            </div>
            <div
              className="authentication__captcha-refresh"
              onClick={actions.fetchCaptcha}
              role="button"
              tabIndex="0"
            >
              <span className="refreshIcon" />
              <span>
                {I18n.t('login.refresh_captcha')}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn--primary"
                style={{ margin: '20px' }}
                type="submit"
              >
                { I18n.t('commons.register') }
              </button>
              <p>
                { I18n.t('create_account.already_have_account') }
                &#160;
                <Link to={`${publicURL}`}>
                  { I18n.t('commons.sign_in') }
                </Link>
              </p>
            </div>
          </form>
        </React.Fragment>
      )
    }

    return renderComponent
  }
}

SignUp.defaultProps = {
  captcha: {
    img: null,
  },
  type: null,
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  captcha: PropTypes.object,
  type: PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuthenticationLayout(SignUp, {
  contentCenter: true,
}))
