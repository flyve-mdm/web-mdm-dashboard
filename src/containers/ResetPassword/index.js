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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { I18n } from 'react-i18nify'
import Loading from '../../components/Loading'
import ConstructInputs from '../../components/Forms'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import { fetchResetPassword } from '../../store/authentication/actions'
import { resetPassword, changeState, buildDataArray } from './actions';
import publicURL from '../../shared/publicURL'

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchResetPassword: bindActionCreators(fetchResetPassword, dispatch),
  }
  return { actions }
}

function mapStateToProps(state) {
  return {
    isLoading: state.ui.loading,
    type: state.ui.notification.type,
  }
}

/**
 * Component with the reset password section
 * @class ResetPassword
 * @extends PureComponent
 */
class ResetPassword extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const {
      location,
      history,
    } = this.props

    this.state = {
      isResetSent: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      token: '',
      forceValidation: false,
    }

    const { search } = location
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (token) {
      this.setState({ token })
    } else {
      history.push(`${publicURL}/`)
    }

    this.handleResetPassword = () => resetPassword(this)
    this.changeState = () => changeState(this)
    this.buildDataArray = () => buildDataArray(this, I18n)
  }

    /**
     * Create the element to render
     * @function createRenderElament
     * @return {component}
     */
    createRenderElament = () => {
      const { isResetSent } = this.state
      const { history } = this.props

      let element
      if (!isResetSent) {
        const reset = this.buildDataArray()
        element = (
          <React.Fragment>
            <div style={{ textAlign: 'left' }}>
              <ConstructInputs data={reset.resetInformation} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn--primary"
                style={{ margin: '20px' }}
                onClick={this.handleResetPassword}
                type="button"
              >
                {I18n.t('login.reset_password')}
              </button>
            </div>
          </React.Fragment>
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
              onClick={() => history.push(`${publicURL}/`)}
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
      const { isLoading } = this.props

      if (isLoading) {
        return (
          <div style={{ height: '140px' }}>
            <Loading message={`${I18n.t('commons.sending')}...`} />
          </div>
        )
      }
      return (
        <React.Fragment>
          <h2 style={{ textAlign: 'center' }}>
            {I18n.t('login.reset_password')}
          </h2>
          {this.createRenderElament()}
        </React.Fragment>
      )
    }
}

ResetPassword.propTypes = {
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
}
ResetPassword.defaultProps = {
  type: 'info',
}

export default withAuthenticationLayout(
  connect(mapStateToProps, mapDispatchToProps)(withHandleMessages(ResetPassword)), {
    centerContent: true,
  },
)
