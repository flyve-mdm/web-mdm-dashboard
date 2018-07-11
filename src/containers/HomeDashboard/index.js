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
  VictoryPie,
} from 'victory'
import {
  NavLink,
} from 'react-router-dom'
import I18n from '../../shared/i18n'
import withGLPI from '../../hoc/withGLPI'
import Loading from '../../components/Loading'
import InfoBox from '../../components/InfoBox'
import EmptyMessage from '../../components/EmptyMessage'
import ContentPane from '../../components/ContentPane'
import itemtype from '../../shared/itemtype'
import publicURL from '../../shared/publicURL'
import logout from '../../shared/logout'
import {
  slideTop,
} from '../../shared/animations/index'

/**
 * Component with the Home section
 * @class Dashboard
 * @extends PureComponent
 */
class Dashboard extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      applicationsUploaded: undefined,
      devicesByOperatingSystemVersion: undefined,
      devicesByUsers: undefined,
      devicesCurrentlyManaged: undefined,
      filesUploaded: undefined,
      fleetsCurrentlyManaged: undefined,
      invitationsSent: undefined,
      numberUsers: undefined,
      pendingInvitations: undefined,
      display: localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {},
    }
  }

  /**
   * Get all necessary data
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    if (this.props.glpi.sessionToken) {
      let isValid = true
      const newState = {
        applicationsUploaded: undefined,
        filesUploaded: undefined,
        fleetsCurrentlyManaged: undefined,
        invitationsSent: undefined,
        pendingInvitations: undefined,
        numberUsers: undefined,
        devicesCurrentlyManaged: undefined,
        devicesByOperatingSystemVersion: undefined,
        devicesByUsers: undefined,
      }
      if (isValid && this.state.display.applicationsUploaded) {
        try {
          newState.applicationsUploaded = await this.getApplications()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && this.state.display.filesUploaded) {
        try {
          newState.filesUploaded = await this.getFiles()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && this.state.display.fleetsCurrentlyManaged) {
        try {
          newState.fleetsCurrentlyManaged = await this.getFleets()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && this.state.display.invitationsSent) {
        try {
          newState.invitationsSent = await this.getInvitations()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && this.state.display.pendingInvitations) {
        try {
          newState.pendingInvitations = await this.getPendingInvitations()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && this.state.display.numberUsers) {
        try {
          newState.numberUsers = await this.getUsers()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && (this.state.display.devicesCurrentlyManaged || this.state.display.devicesByOperatingSystemVersion
          || this.state.display.devicesByUsers)) {
        try {
          newState.devices = await this.getDevices()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (this.state.display.devicesCurrentlyManaged && newState.devices) {
        try {
          newState.devicesCurrentlyManaged = newState.devices.totalcount
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (this.state.display.devicesByOperatingSystemVersion && newState.devices && newState.devices.totalcount > 0) {
        try {
          newState.devicesByOperatingSystemVersion = await this.getDevicesByOperatingSystemVersion(newState.devices)
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (this.state.display.devicesByUsers && newState.devices && newState.devices.totalcount > 0) {
        try {
          newState.devicesByUsers = await this.getDevicesByUsers(newState.devices)
        } catch (error) {
          isValid = this.validateError(error)
        }
      }

      this.setState({
        applicationsUploaded: newState.applicationsUploaded,
        filesUploaded: newState.filesUploaded,
        fleetsCurrentlyManaged: newState.fleetsCurrentlyManaged,
        invitationsSent: newState.invitationsSent,
        pendingInvitations: newState.pendingInvitations,
        numberUsers: newState.numberUsers,
        devicesCurrentlyManaged: newState.devicesCurrentlyManaged,
        devicesByOperatingSystemVersion: newState.devicesByOperatingSystemVersion,
        devicesByUsers: newState.devicesByUsers,
        isLoading: false,
      }, () => {
        // Play the animation
        slideTop(this.home).play()
      })
    } else {
      logout()
    }
  }

  /**
   * Get devices
   * @function getDevices
   * @async
   * @return {promise}
   */
  getDevices = () => new Promise(async (resolve, reject) => {
    try {
      const devices = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmAgent,
        options: {
          uid_cols: true,
          forcedisplay: [2, 12],
        },
      })
      resolve(devices)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get users
   * @function getUsers
   * @async
   * @return {promise}
   */
  getUsers = () => new Promise(async (resolve, reject) => {
    try {
      const users = await this.props.glpi.searchItems({
        itemtype: itemtype.User,
      })
      resolve(users.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get devices by operating system version
   * @function getDevicesByOperatingSystemVersion
   * @async
   * @param {object} devices
   * @return {promise}
   */
  getDevicesByOperatingSystemVersion = devices => new Promise(async (resolve, reject) => {
    try {
      const devicesAndroid = devices.data.filter(device => device[`${itemtype.PluginFlyvemdmAgent}.mdm_type`]
        === 'android').length
      const devicesiOS = devices.data.filter(device => device[`${itemtype.PluginFlyvemdmAgent}.mdm_type`] === 'ios')
        .length
      const devicesWindows = devices.data.filter(device => device[`${itemtype.PluginFlyvemdmAgent}.mdm_type`]
        === 'windows').length
      const devicesByOperatingSystemVersion = []
      if (devicesAndroid) {
        devicesByOperatingSystemVersion.push({
          x: 'Android',
          y: devicesAndroid,
        })
      }
      if (devicesiOS) {
        devicesByOperatingSystemVersion.push({
          x: 'iOS',
          y: devicesiOS,
        })
      }
      if (devicesWindows) {
        devicesByOperatingSystemVersion.push({
          x: 'Windows',
          y: devicesWindows,
        })
      }
      resolve(devicesByOperatingSystemVersion)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get devices by users
   * @function getDevicesByUsers
   * @async
   * @param {object} devices
   * @return {promise}
   */
  getDevicesByUsers = devices => new Promise(async (resolve, reject) => {
    try {
      const devicesByUsers = devices.data.map(device => ({
        name: device[`${itemtype.PluginFlyvemdmAgent}.name`],
        id: device[`${itemtype.PluginFlyvemdmAgent}.id`],
      }))
      resolve(devicesByUsers)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get invitations
   * @function getInvitations
   * @async
   * @return {promise}
   */
  getInvitations = () => new Promise(async (resolve, reject) => {
    try {
      const invitations = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
      })
      resolve(invitations.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get pending invitations
   * @function getPendingInvitations
   * @async
   * @return {promise}
   */
  getPendingInvitations = () => new Promise(async (resolve, reject) => {
    try {
      const pendingInvitations = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        criteria: [{
          field: 3,
          link: 'and',
          searchtype: 'equal',
          value: 'pending',
        }],
      })
      resolve(pendingInvitations.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get fleets
   * @function getFleets
   * @async
   * @return {promise}
   */
  getFleets = () => new Promise(async (resolve, reject) => {
    try {
      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
      })
      resolve(fleets.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get files
   * @function getFiles
   * @async
   * @return {promise}
   */
  getFiles = () => new Promise(async (resolve, reject) => {
    try {
      const files = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFile,
      })
      resolve(files.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Get applications
   * @function getApplications
   * @async
   * @return {promise}
   */
  getApplications = () => new Promise(async (resolve, reject) => {
    try {
      const applications = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
      })
      resolve(applications.totalcount)
    } catch (error) {
      this.showError(error)
      reject(error)
    }
  })

  /**
   * Show the error notifications
   * @function showError
   * @param {*} error
   */
  showError = (error) => {
    this.props.toast.setNotification(this.props.handleMessage({
      type: 'alert',
      message: error,
      customErrorRoute: `${publicURL}/app/error`,
    }))
  }

  /**
   * Validate if an invalid session exists
   * @function validateError
   * @param {*} error
   * @return {boolean}
   */
  validateError = error => (
    !((error && error.data && error.data[0] && (error.data[0][1] === 'session_token seems invalid')))
  )

  /**
   * Build the necessary infoboxes
   * @function renderInfoBox
   * @return {array}
   */
  renderInfoBox() {
    const boxes = []

    if (this.state.devicesCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to="app/devices"
          count={this.state.devicesCurrentlyManaged}
          name={(this.state.devicesCurrentlyManaged === 1) ? I18n.t('commons.device') : I18n.t('commons.devices')}
          icon="deviceIcon"
          key="devicesCurrentlyManaged"
        />,
      )
    }

    if (this.state.invitationsSent) {
      boxes.push(
        <InfoBox
          to="app/invitations"
          count={this.state.invitationsSent}
          name={(this.state.invitationsSent === 1) ? I18n.t('commons.invitation') : I18n.t('commons.invitations')}
          icon="emailIcon"
          key="invitationsSent"
        />,
      )
    }

    if (this.state.fleetsCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to="app/fleets"
          count={this.state.fleetsCurrentlyManaged}
          name={(this.state.fleetsCurrentlyManaged === 1) ? I18n.t('commons.fleet') : I18n.t('commons.fleets')}
          icon="goToStartIcon"
          key="fleetsCurrentlyManaged"
        />,
      )
    }

    if (this.state.filesUploaded) {
      boxes.push(
        <InfoBox
          to="app/files"
          count={this.state.filesUploaded}
          name={(this.state.filesUploaded === 1) ? I18n.t('commons.file') : I18n.t('commons.files')}
          icon="filesIcon"
          key="filesUploaded"
        />,
      )
    }

    if (this.state.applicationsUploaded) {
      boxes.push(
        <InfoBox
          to="app/applications"
          count={this.state.applicationsUploaded}
          name={(this.state.applicationsUploaded === 1) ? I18n.t('commons.application') : I18n.t('commons.applications')}
          icon="switchAppsIcon"
          key="applicationsUploaded"
        />,
      )
    }

    if (this.state.numberUsers) {
      boxes.push(
        <InfoBox
          to="app/users"
          count={this.state.numberUsers}
          name={(this.state.numberUsers === 1) ? I18n.t('commons.user') : I18n.t('commons.users')}
          icon="peopleIcon"
          key="numberUsers"
        />,
      )
    }

    return boxes
  }

  /**
   * Build the necessary graphics
   * @function renderGraphics
   * @return {array}
   */
  renderGraphics() {
    const graphics = []

    if (this.state.devicesByOperatingSystemVersion) {
      graphics.push(
        <div key="DevicesOS" className="info-box">
          <VictoryPie
            colorScale={[
              '#969696',
              '#bdbdbd',
              '#d9d9d9',
            ]}
            innerRadius={50}
            padAngle={5}
            labelRadius={90}
            labels={d => `${d.x} ${d.y}`}
            data={this.state.devicesByOperatingSystemVersion}
            style={{ labels: { fill: '#000', fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">
            {I18n.t('commons.devices_by_plataform').toUpperCase()}
          </span>
        </div>,
      )
    }

    if (this.state.pendingInvitations) {
      graphics.push(
        <div key="InvitationsChart" className="info-box">
          <VictoryPie
            colorScale={[
              '#969696',
              '#bdbdbd',
              '#d9d9d9',
            ]}
            innerRadius={50}
            padAngle={5}
            labelRadius={90}
            labels={d => `${d.x} ${d.y}`}
            data={[
              { x: I18n.t('commons.invitations'), y: this.state.pendingInvitations },
            ]}
            style={{ labels: { fill: '#000', fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">
            {I18n.t('commons.pending_invitations').toUpperCase()}
          </span>
        </div>,
      )
    }

    if (this.state.devicesByUsers) {
      graphics.push(
        <div key="devicesByUsersChart" className="info-box navlinks">
          <ul>
            {
              this.state.devicesByUsers.map((device, id) => (
                <li key={`device-${id.toString()}`}>
                  <NavLink
                    exact
                    to={`${publicURL}/app/devices/${device.id}`}
                  >
                    {device.name}
                  </NavLink>
                </li>
              ))
            }
          </ul>
          <span className="title-box">
            {I18n.t('commons.devices_by_users').toUpperCase()}
          </span>
        </div>,
      )
    }

    return graphics
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const renderInfoBox = this.renderInfoBox()
    const renderGraphics = this.renderGraphics()
    const renderComponent = this.state.isLoading
      ? (
        <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
      : (
        <ContentPane>
          <div className="dashboard" ref={(home) => { this.home = home }}>
            {
                (renderInfoBox.length > 0 || renderGraphics.length > 0)
                  ? (
                    <div className="dashboard__wrapper">
                      <div className="dashboard__infobox">
                        {renderInfoBox}
                      </div>

                      <div className="dashboard__chart">
                        {renderGraphics}
                      </div>
                    </div>
                  )
                  : <EmptyMessage message={I18n.t('commons.no_data')} />
              }
          </div>
        </ContentPane>
      )
    return renderComponent
  }
}

Dashboard.propTypes = {
  glpi: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withGLPI(Dashboard)
