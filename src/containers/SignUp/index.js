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
import I18n from '../../shared/i18n'
import Loading from '../../components/Loading'
import ConstructInputs from '../../components/Forms'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import publicURL from '../../shared/publicURL'
import ErrorValidation from '../../components/ErrorValidation'
import appConfig from '../../../public/config.json'

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
  async componentDidMount() {
    try {
      const { auth } = this.props
      await auth.fetchCaptcha()
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
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
      auth,
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
      auth.fetchSignUp({
        name: email,
        realname: realName,
        password,
        password2: passwordConfirmation,
        _useremails: [email],
        _plugin_flyvemdmdemo_captchas_id: auth.captcha.id,
        _answer: captchaValue,
      })
        .then(() => {
          this.props.toast.setNotification({
            title: appConfig.appName,
            body: 'Successfully registered user',
            type: 'success',
          })
          this.props.history.push(`${publicURL}/validateAccount`)
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
   * Render component
   * @function render
   */
  render() {
    const {
      auth,
    } = this.props

    let renderComponent
    if (auth.isLoading) {
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
              <img src={auth.captcha.img} alt="Captcha" />
            </div>
            <div
              className="authentication__captcha-refresh"
              onClick={auth.fetchCaptcha}
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
  auth: PropTypes.object.isRequired,
  type: PropTypes.string,
}

export default withAuthenticationLayout(withHandleMessages(SignUp), {
  contentCenter: true,
})
