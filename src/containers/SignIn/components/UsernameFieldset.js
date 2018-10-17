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
import withGLPI from 'hoc/withGLPI'
import Loading from 'components/Loading'

/**
 * Component with the step 1 (the user name) of the login
 * @function UsernameFieldset
 * @extends PureComponent
 */
class UsernameFieldset extends PureComponent {
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
   * @function LogInServer
   * @param {object} e
   */
  LogInServer = (e) => {
    e.preventDefault()

    if (this.props.username) {
      this.props.changePhase(2)
    } else {
      this.setState(() => ({
        classInput: 'win-textbox color-line-alert',
        errorMessage: (
          <p className="color-type-alert">
            <span>
              {' '}
              {I18n.t('login.username_not_registered')}
              {' '}
            </span>
          </p>),
      }))
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      this.state.isLoading
        ? (
          <div style={{ margin: 50, height: '140px' }}>
            <Loading message={`${I18n.t('commons.loading')}...`} />
          </div>
        )
        : (
          <div className="authentication__email">
            <h2>
              {I18n.t('login.title')}
            </h2>
            <p>
              {I18n.t('login.use_your_account')}
              <br />
              <a href="https://flyve-mdm.com/">
                {I18n.t('login.what_is_this')}
              </a>
            </p>

            {this.state.errorMessage}

            <form onSubmit={this.LogInServer}>
              <input
                type="text"
                name="username"
                ref={(input) => { this.usernameInput = input }}
                className={this.state.classInput}
                placeholder={I18n.t('commons.username')}
                value={this.props.username}
                onChange={this.props.changeInput}
                required
              />
              <button
                className="btn btn--primary"
                type="submit"
              >
                {I18n.t('commons.next')}
              </button>
            </form>
          </div>
        )
    )
  }
}

UsernameFieldset.propTypes = {
  username: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changePhase: PropTypes.func.isRequired,
}

export default withGLPI(UsernameFieldset)
