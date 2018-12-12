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
import logout from 'shared/logout'
import itemtype from 'shared/itemtype'
import Confirmation from 'components/Confirmation'
import ErrorValidation from 'components/ErrorValidation'
import ConstructInputs from 'components/Forms'
import Loading from 'components/Loading'
import ContentPane from 'components/ContentPane'
import withGLPI from 'hoc/withGLPI'

/**
 * Component with the security section
 * @class Security
 * @extends PureComponent
 */
class Security extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      passwordConfirmation: '',
      passwordConfiguration: undefined,
      forceValidation: false,
      isLoading: true,
      selfRegistration: null,
      currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {},
    }
  }

  /**
   * Check if self-registration is enabled
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const plugins = await this.props.glpi.getAllItems({
        itemtype: 'Plugin',
      })
      const pluginDemo = plugins.filter(plugin => plugin.name === 'Flyve MDM Demo')
      if (pluginDemo.length < 1 || pluginDemo[0].status !== 1) {
        throw new Error()
      }
      this.setState({
        isLoading: false,
        selfRegistration: true,
      })
    } catch (e) {
      this.setState({
        isLoading: false,
        selfRegistration: false,
      })
    }
  }

  /**
   * Delete the current user
   * @function deleteUser
   * @async
   */
  deleteUser = async () => {
    const isOK = await Confirmation.isOK(this.deleteAccount)
    if (isOK) {
      this.setState({
        isLoading: true,
      },
      async () => {
        try {
          await this.props.glpi.deleteItem({
            itemtype: itemtype.User,
            input: {
              id: this.state.currentUser.id,
            },
            queryString: {
              force_purge: true,
            },
          })
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.user_deleted'),
            type: 'success',
          })

          logout()
          localStorage.clear()
        } catch (error) {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
          this.setState({
            isLoading: false,
          })
          this.changeMode('')
        }
      })
    }
  }

  /**
   * Close session
   * @function closeSession
   * @async
   */
  closeSession = async () => {
    const isOK = await Confirmation.isOK(this.killSession)
    if (isOK) {
      logout()
      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.session_closed'),
        type: 'success',
      })
    }
  }

  /**
   * Clean web storage and close session
   * @function cleanWebStorage
   * @async
   */
  cleanWebStorage = async () => {
    const isOK = await Confirmation.isOK(this.deleteBrowserData)
    if (isOK) {
      localStorage.clear()
      logout()
      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.clear_local_storage'),
        type: 'success',
      })
    }
  }

  /**
   * Validate the form data and save the new password
   * @function savePassword
   * @param {object} e
   */
  savePassword = (e) => {
    e.preventDefault()
    this.setState({
      forceValidation: true,
    }, () => {
      const passwordArray = this.buildDataArray()
      let isCorrect = true

      for (const key in passwordArray) {
        if (Object.prototype.hasOwnProperty.call(passwordArray, key)) {
          const elements = passwordArray[key]
          for (let index = 0; index < elements.length; index += 1) {
            const element = elements[index]
            if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) { isCorrect = false }
          }
        }
      }

      if (isCorrect) {
        this.setState({
          isLoading: true,
        },
        async () => {
          try {
            await this.props.glpi.updateItem({
              itemtype: itemtype.User,
              id: this.state.currentUser.id,
              input: {
                password: this.state.password,
                password2: this.state.passwordConfirmation,
              },
            })
            this.props.toast.setNotification({
              title: I18n.t('commons.success'),
              body: I18n.t('notifications.new_password_saved'),
              type: 'success',
            })
          } catch (error) {
            this.props.toast.setNotification(this.props.handleMessage({
              type: 'alert',
              message: error,
            }))
          }
          this.setState({
            isLoading: false,
          })
          this.changeMode('')
        })
      } else {
        this.setState({
          forceValidation: true,
        })
      }
    })
  }

  /**
   * Handle set state
   * @function changeState
   * @param {strinf} name
   * @param {strinf} value
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Change mode and request the password restrictions if it's necessary
   * @function changeMode
   * @param {string} mode
   */
  changeMode = (mode) => {
    if (mode === 'Change password') {
      this.setState({
        isLoading: true,
      }, async () => {
        const {
          cfg_glpi: cfgGlpi,
        } = await this.props.glpi.getGlpiConfig()
        this.setState({
          isLoading: false,
          passwordConfiguration: {
            minimunLength: cfgGlpi.password_min_length,
            needDigit: cfgGlpi.password_need_number,
            needLowercaseCharacter: cfgGlpi.password_need_letter,
            needUppercaseCharacter: cfgGlpi.password_need_caps,
            needSymbol: cfgGlpi.password_need_symbol,
          },
          forceValidation: false,
          password: '',
          passwordConfirmation: '',
          mode,
        })
      })
    } else {
      this.setState({
        mode,
      })
    }
  }

  /**
   * Build the data array for the password change form
   * @function buildDataArray
   */
  buildDataArray = () => (
    [
      [{
        label: I18n.t('commons.password'),
        type: 'password',
        name: 'password',
        value: this.state.password,
        placeholder: I18n.t('commons.password'),
        function: this.changeState,
        parametersToEvaluate: {
          isRequired: true,
          ...this.state.passwordConfiguration,
        },
        forceValidation: this.state.forceValidation,
        disabled: false,
        style: null,
      }],
      [{
        label: I18n.t('commons.password_confirmation'),
        type: 'password',
        name: 'passwordConfirmation',
        value: this.state.passwordConfirmation,
        placeholder: I18n.t('commons.password_confirmation'),
        function: this.changeState,
        parametersToEvaluate: {
          isRequired: true,
          ...this.state.passwordConfiguration,
          isEqualTo: {
            value: this.state.password,
            message: I18n.t('commons.passwords_not_match'),
          },
        },
        forceValidation: this.state.forceValidation,
        disabled: false,
        style: null,
      }],
    ]
  )

  /**
   * Render component
   * @function render
   */
  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ height: '100%' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    }

    switch (this.state.mode) {
      case I18n.t('commons.change_password'):
        return (
          <ContentPane>
            <h2>
              {' '}
              {this.state.mode}
              {' '}
            </h2>
            <form className="list-content" onSubmit={this.savePassword}>
              <ConstructInputs data={this.buildDataArray()} />

              <br />

              <button
                className="btn btn--secondary"
                type="button"
                style={{ marginRight: 10 }}
                onClick={() => this.changeMode('')}
              >
                {I18n.t('commons.cancel')}
              </button>

              <button
                className="btn btn--primary"
                type="submit"
              >
                {I18n.t('commons.save')}
              </button>
            </form>
          </ContentPane>
        )
      default:
        return (
          <React.Fragment>
            <Confirmation
              title={I18n.t('commons.kill_session')}
              message={I18n.t('settings.security.close_session_message')}
              reference={(el) => { this.killSession = el }}
            />

            <Confirmation
              title={I18n.t('settings.security.delete_data')}
              message={I18n.t('settings.security.delete_data_message')}
              reference={(el) => { this.deleteBrowserData = el }}
            />

            <Confirmation
              title={I18n.t('settings.security.delete_account')}
              message={I18n.t('settings.security.delete_account_message')}
              reference={(el) => { this.deleteAccount = el }}
            />
            <ContentPane>
              <h2 style={{ margin: '10px' }}>
                {I18n.t('commons.security')}
              </h2>

              <div className="list-element">
                <div className="list-element__message">
                  {I18n.t('commons.password')}
                  <div className="list-element__detail">
                    {I18n.t('settings.security.change_flyve_passsword')}
                  </div>
                </div>
                <div className="list-element__controller">
                  <button
                    className="btn btn--secondary"
                    onClick={() => this.changeMode(I18n.t('commons.change_password'))}
                    type="button"
                  >
                    {I18n.t('commons.edit')}
                  </button>
                </div>
              </div>

              <div className="list-element">
                <div className="list-element__message">
                  {I18n.t('commons.kill_session')}
                  <div className="list-element__detail">
                    {I18n.t('settings.security.destroy_session')}
                  </div>
                </div>
                <div className="list-element__controller">
                  <button
                    className="btn btn--secondary"
                    onClick={this.closeSession}
                    type="button"
                  >
                    {I18n.t('commons.logout')}
                  </button>
                </div>
              </div>

              <div className="list-element">
                <div className="list-element__message">
                  {I18n.t('settings.security.delete_data')}
                  <div className="list-element__detail">
                    {I18n.t('settings.security.delete_data_detail')}
                  </div>
                </div>
                <div className="list-element__controller">
                  <button
                    className="btn btn--secondary"
                    onClick={this.cleanWebStorage}
                    type="button"
                  >
                    {I18n.t('commons.delete')}
                  </button>
                </div>
              </div>

              {
                !this.state.selfRegistration
                  ? '' : (
                    <React.Fragment>
                      <div className="list-element">
                        <div className="list-element__message">
                          {I18n.t('settings.security.delete_account')}
                          <div className="list-element__detail">
                            {I18n.t('settings.security.delete_account_detail')}
                          </div>
                        </div>
                        <div className="list-element__controller">
                          <button
                            className="btn btn--secondary"
                            onClick={this.deleteUser}
                            type="button"
                          >
                            {I18n.t('commons.delete')}
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  )
              }
            </ContentPane>
          </React.Fragment>
        )
    }
  }
}

Security.propTypes = {
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withGLPI(Security)
