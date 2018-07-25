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
import ReactWinJS from 'react-winjs'
import I18n from 'shared/i18n'
import animationsWinJs from 'shared/animationsWinJs'
import languageList from 'shared/i18n/languages'
import ContentPane from 'components/ContentPane'

/**
 * Component with the display section
 * @class Display
 * @extends PureComponent
 */
class Display extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    this.state = {
      applicationsUploaded: display.applicationsUploaded !== undefined ? display.applicationsUploaded : true,
      devicesByOperatingSystemVersion: display.devicesByOperatingSystemVersion !== undefined ? display.devicesByOperatingSystemVersion
        : true,
      devicesByUsers: display.devicesByUsers !== undefined ? display.devicesByUsers : true,
      devicesCurrentlyManaged: display.devicesCurrentlyManaged !== undefined ? display.devicesCurrentlyManaged : true,
      filesUploaded: display.filesUploaded !== undefined ? display.filesUploaded : true,
      fleetsCurrentlyManaged: display.fleetsCurrentlyManaged !== undefined ? display.fleetsCurrentlyManaged : true,
      invitationsSent: display.invitationsSent !== undefined ? display.invitationsSent : true,
      numberUsers: display.numberUsers !== undefined ? display.numberUsers : true,
      animations: display.animations !== undefined ? display.animations : true,
      pendingInvitations: display.pendingInvitations !== undefined ? display.pendingInvitations : true,
    }
  }

  /**
   * Change local storage
   * @function componentDidUpdate
   */
  componentDidUpdate() {
    localStorage.setItem('display', JSON.stringify(this.state))
    animationsWinJs(this.state.animations)
  }

  /**
   * Handle change state
   * @function changeLocalStorage
   * @param {string} name
   */
  changeLocalStorage = (name) => {
    const { [name]: currentValue } = this.state
    this.setState({
      [name]: !currentValue,
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      animations,
      devicesCurrentlyManaged,
      fleetsCurrentlyManaged,
      filesUploaded,
      applicationsUploaded,
      invitationsSent,
      numberUsers,
      pendingInvitations,
      devicesByUsers,
      devicesByOperatingSystemVersion,
    } = this.state

    return (
      <ContentPane>
        <h2 style={{ margin: '10px' }}>
          {I18n.t('settings.display.title')}
        </h2>

        <div className="title">
          {I18n.t('commons.language')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.change_interface')}
          </div>
          <div
            className="list-element__controller"
            style={{
              paddingTop: 10,
            }}
          >
            <select
              value={this.props.languageCurrent}
              onChange={event => this.props.changeLanguage(event.target.value)}
            >
              {languageList()}
            </select>
          </div>
        </div>

        <div className="title">
          {I18n.t('commons.animations')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {animations ? I18n.t('settings.display.disable_animations') : I18n.t('settings.display.enable_animations') }
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={animations}
              onChange={() => this.changeLocalStorage('animations')}
            />
          </div>
        </div>

        <div className="title">
          {I18n.t('settings.display.show')}
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.devices_managed')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={devicesCurrentlyManaged}
              onChange={() => this.changeLocalStorage('devicesCurrentlyManaged')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.fleets_managed')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={fleetsCurrentlyManaged}
              onChange={() => this.changeLocalStorage('fleetsCurrentlyManaged')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.files_uploaded')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={filesUploaded}
              onChange={() => this.changeLocalStorage('filesUploaded')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.applications_uploaded')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={applicationsUploaded}
              onChange={() => this.changeLocalStorage('applicationsUploaded')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.users')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={numberUsers}
              onChange={() => this.changeLocalStorage('numberUsers')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.invitations_sent')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={invitationsSent}
              onChange={() => this.changeLocalStorage('invitationsSent')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.pending_invitations')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={pendingInvitations}
              onChange={() => this.changeLocalStorage('pendingInvitations')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.devices_by_users')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={devicesByUsers}
              onChange={() => this.changeLocalStorage('devicesByUsers')}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.devices_by_system')}
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={devicesByOperatingSystemVersion}
              onChange={() => this.changeLocalStorage('devicesByOperatingSystemVersion')}
            />
          </div>
        </div>
      </ContentPane>
    )
  }
}

Display.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default Display
