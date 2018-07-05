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
  I18n,
} from 'react-i18nify'
import {
  bindActionCreators,
} from 'redux'
import {
  connect,
} from 'react-redux'
import {
  NavLink,
} from 'react-router-dom'
import withGLPI from '../../hoc/withGLPI'
import withHandleMessages from '../../hoc/withHandleMessages'
import Loading from '../../components/Loading'
import InfoBox from '../../components/InfoBox'
import {
  uiSetNotification,
} from '../../store/ui/actions'
import EmptyMessage from '../../components/EmptyMessage'
import ContentPane from '../../components/ContentPane'
import itemtype from '../../shared/itemtype'
import publicURL from '../../shared/publicURL'
import logout from '../../shared/logout'
import {
  slideTop,
} from '../../shared/animations/index'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch),
  }
  return {
    actions,
  }
}

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
    const { glpi } = this.props
    const { display } = this.state

    if (glpi.sessionToken) {
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
      if (isValid && display.applicationsUploaded) {
        try {
          newState.applicationsUploaded = await this.getApplications()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && display.filesUploaded) {
        try {
          newState.filesUploaded = await this.getFiles()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && display.fleetsCurrentlyManaged) {
        try {
          newState.fleetsCurrentlyManaged = await this.getFleets()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && display.invitationsSent) {
        try {
          newState.invitationsSent = await this.getInvitations()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && display.pendingInvitations) {
        try {
          newState.pendingInvitations = await this.getPendingInvitations()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && display.numberUsers) {
        try {
          newState.numberUsers = await this.getUsers()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (isValid && (display.devicesCurrentlyManaged || display.devicesByOperatingSystemVersion
          || display.devicesByUsers)) {
        try {
          newState.devices = await this.getDevices()
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (display.devicesCurrentlyManaged && newState.devices) {
        try {
          newState.devicesCurrentlyManaged = newState.devices.totalcount
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (display.devicesByOperatingSystemVersion && newState.devices && newState.devices.totalcount > 0) {
        try {
          newState.devicesByOperatingSystemVersion = await this.getDevicesByOperatingSystemVersion(newState.devices)
        } catch (error) {
          isValid = this.validateError(error)
        }
      }
      if (display.devicesByUsers && newState.devices && newState.devices.totalcount > 0) {
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
      const { glpi } = this.props

      const devices = await glpi.searchItems({
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
      const { glpi } = this.props

      const users = await glpi.searchItems({
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
      const { glpi } = this.props

      const invitations = await glpi.searchItems({
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
      const { glpi } = this.props

      const pendingInvitations = await glpi.searchItems({
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
      const { glpi } = this.props

      const fleets = await glpi.searchItems({
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
      const { glpi } = this.props

      const files = await glpi.searchItems({
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
      const { glpi } = this.props

      const applications = await glpi.searchItems({
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
    const {
      actions,
      handleMessage,
    } = this.props

    actions.setNotification(handleMessage({
      type: 'alert',
      message: error,
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
    const {
      devicesCurrentlyManaged,
      invitationsSent,
      fleetsCurrentlyManaged,
      filesUploaded,
      applicationsUploaded,
      numberUsers,
    } = this.state

    const boxes = []

    if (devicesCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to="app/devices"
          count={devicesCurrentlyManaged}
          name={(devicesCurrentlyManaged === 1) ? I18n.t('commons.device') : I18n.t('commons.devices')}
          icon="deviceIcon"
          key="devicesCurrentlyManaged"
        />,
      )
    }

    if (invitationsSent) {
      boxes.push(
        <InfoBox
          to="app/invitations"
          count={invitationsSent}
          name={(invitationsSent === 1) ? I18n.t('commons.invitation') : I18n.t('commons.invitations')}
          icon="emailIcon"
          key="invitationsSent"
        />,
      )
    }

    if (fleetsCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to="app/fleets"
          count={fleetsCurrentlyManaged}
          name={(fleetsCurrentlyManaged === 1) ? I18n.t('commons.fleet') : I18n.t('commons.fleets')}
          icon="goToStartIcon"
          key="fleetsCurrentlyManaged"
        />,
      )
    }

    if (filesUploaded) {
      boxes.push(
        <InfoBox
          to="app/files"
          count={filesUploaded}
          name={(filesUploaded === 1) ? I18n.t('commons.file') : I18n.t('commons.files')}
          icon="filesIcon"
          key="filesUploaded"
        />,
      )
    }

    if (applicationsUploaded) {
      boxes.push(
        <InfoBox
          to="app/applications"
          count={applicationsUploaded}
          name={(applicationsUploaded === 1) ? I18n.t('commons.application') : I18n.t('commons.applications')}
          icon="switchAppsIcon"
          key="applicationsUploaded"
        />,
      )
    }

    if (numberUsers) {
      boxes.push(
        <InfoBox
          to="app/users"
          count={numberUsers}
          name={(numberUsers === 1) ? I18n.t('commons.user') : I18n.t('commons.users')}
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
    const {
      devicesByOperatingSystemVersion,
      pendingInvitations,
      devicesByUsers,
    } = this.state

    const graphics = []

    if (devicesByOperatingSystemVersion) {
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
            data={devicesByOperatingSystemVersion}
            style={{ labels: { fill: '#000', fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">
            {I18n.t('commons.devices_by_plataform').toUpperCase()}
          </span>
        </div>,
      )
    }

    if (pendingInvitations) {
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
              { x: I18n.t('commons.invitations'), y: pendingInvitations },
            ]}
            style={{ labels: { fill: '#000', fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">
            {I18n.t('commons.pending_invitations').toUpperCase()}
          </span>
        </div>,
      )
    }

    if (devicesByUsers) {
      graphics.push(
        <div key="devicesByUsersChart" className="info-box navlinks">
          <ul>
            {
              devicesByUsers.map((device, id) => (
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
    const { isLoading } = this.state

    const renderInfoBox = this.renderInfoBox()
    const renderGraphics = this.renderGraphics()
    const renderComponent = isLoading
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
  actions: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps,
)(withGLPI(withHandleMessages(Dashboard)))
