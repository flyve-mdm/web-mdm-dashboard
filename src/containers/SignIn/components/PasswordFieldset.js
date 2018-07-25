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
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'

/**
 * Component with the step 2 (the user password) of the login
 * @class PasswordFieldset
 * @extends PureComponent
 */
class PasswordFieldset extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      classInput: 'win-textbox',
      errorMessage: '',
      isLoading: false,
    }
  }

  /**
   * Focus the password field
   * @function componentDidMount
   */
  componentDidMount() {
    if (this.passwordInput) {
      this.passwordInput.focus()
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.state.isLoading) {
      renderComponent = (
        <div style={{ margin: 50, height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      renderComponent = (
        <div className="authentication__password">
          <h2>
            { I18n.t('login.enter_password') }
          </h2>
          <p>
            { I18n.t('login.enter_password_for') }
            <br />
            {this.props.username}
            <br />
            {this.state.errorMessage}
          </p>
          <form onSubmit={this.props.handleOnSubmit}>
            <input
              type="password"
              name="password"
              ref={(input) => { this.passwordInput = input }}
              className={this.state.classInput}
              placeholder={I18n.t('commons.password')}
              value={this.props.password}
              onChange={this.props.changeInput}
              required
            />

            <button
              className="btn btn--secondary"
              type="button"
              onClick={
                () => this.props.changePhase(1)
            }
            >
              { I18n.t('commons.back') }
            </button>

            <button type="submit" className="btn btn--primary">
              { I18n.t('commons.sign_in') }
            </button>
          </form>

          <p>
            <Link to={`${publicURL}/forgotPassword`}>
              { I18n.t('login.forgot_my_password') }
            </Link>
          </p>
        </div>
      )
    }

    return renderComponent
  }
}

PasswordFieldset.propTypes = {
  password: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changePhase: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default PasswordFieldset
