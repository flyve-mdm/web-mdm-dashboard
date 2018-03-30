import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'
import { I18n } from 'react-i18nify'
import withGLPI from '../../hoc/withGLPI'
import Loading from '../../components/Loading'
import InfoBox from '../../components/InfoBox'
import { uiSetNotification } from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EmptyMessage from '../../components/EmptyMessage'
import { NavLink } from 'react-router-dom'
import ContentPane from '../../components/ContentPane'

function mapDispatchToProps(dispatch) {
  const actions = {
      setNotification: bindActionCreators(uiSetNotification, dispatch)
  }
  return { actions }
}

class Dashboard extends Component {
  constructor (props) {
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
      display: localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    }
  }

  showError = (error) => {
    this.props.actions.setNotification({
      title: error[0],
      body: error[1],
      type: 'alert'
    })
  }

  getDevices = () => new Promise(async (resolve) => {
    try {
      const devices = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmAgent"})
      resolve(devices)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getDevicesByOperatingSystemVersion = (devices) => new Promise(async (resolve) => {
    try {
      const devicesAndroid = devices.filter(device => device.mdm_type === "android").length
      const devicesiOS = devices.filter(device => device.mdm_type === "ios").length
      const devicesWindows = devices.filter(device => device.mdm_type === "windows").length
      let devicesByOperatingSystemVersion = []
      if (devicesAndroid) devicesByOperatingSystemVersion.push({ x: 'Android', y: devicesAndroid })
      if (devicesiOS) devicesByOperatingSystemVersion.push({ x: 'iOS', y: devicesiOS })
      if (devicesWindows) devicesByOperatingSystemVersion.push({ x: 'Windows', y: devicesWindows })
      resolve(devicesByOperatingSystemVersion)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getDevicesByUsers = (devices) => new Promise(async (resolve) => {
    try {
      const devicesByUsers = devices.map(device => {
        return ({
          name: device.name,
          id: device.id
        }) 
      })
      resolve(devicesByUsers)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getInvitations = () => new Promise(async (resolve) => {
    try {
      const invitations = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmInvitation"})
      resolve(invitations)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getPendingInvitations = () => new Promise(async (resolve) => {
    try {
      const invitations = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmInvitation"})
      resolve(invitations.filter(invitation => invitation.status === "pending"))
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getFleets = () => new Promise(async (resolve) => {
    try {
      const fleets = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmFleet"})
      resolve(fleets)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getFiles = () => new Promise(async (resolve) => {
    try {
      const files = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmFile"})
      resolve(files)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getApplications = () => new Promise(async (resolve) => {
    try {
      const applications = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmPackage"})
      resolve(applications)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  getUsers = () => new Promise(async (resolve) => {
    try {
      const users = await this.props.glpi.getAllItems({itemtype: "User"})
      resolve(users)
    } catch (error) {
      this.showError(error)
      resolve(null)
    }
  })

  componentDidMount = async () => {
    const applicationsUploaded = this.state.display.applicationsUploaded ? await this.getApplications() : undefined
    const filesUploaded = this.state.display.filesUploaded ? await this.getFiles(): undefined
    const fleetsCurrentlyManaged = this.state.display.fleetsCurrentlyManaged ? await this.getFleets() : undefined
    const invitationsSent = this.state.display.invitationsSent ? await this.getInvitations() : undefined
    const pendingInvitations = this.state.display.pendingInvitations ? await this.getPendingInvitations() : undefined
    const numberUsers = this.state.display.numberUsers ? await this.getUsers() : undefined
    const devices = (this.state.display.devicesCurrentlyManaged || this.state.display.devicesByOperatingSystemVersion || this.state.display.devicesByUsers) ?
      await this.getDevices() : undefined
    const devicesCurrentlyManaged = this.state.display.devicesCurrentlyManaged ? devices : undefined
    const devicesByOperatingSystemVersion = this.state.display.devicesByOperatingSystemVersion ? await this.getDevicesByOperatingSystemVersion(devices) : undefined 
    const devicesByUsers = this.state.display.devicesByUsers ?  await this.getDevicesByUsers(devices) : undefined

    this.setState({
      applicationsUploaded: applicationsUploaded ? applicationsUploaded.length : applicationsUploaded,
      filesUploaded: filesUploaded ? filesUploaded.length : filesUploaded,
      fleetsCurrentlyManaged: fleetsCurrentlyManaged ? fleetsCurrentlyManaged.length : fleetsCurrentlyManaged,
      invitationsSent: invitationsSent ? invitationsSent.length : invitationsSent,
      pendingInvitations: pendingInvitations ? pendingInvitations.length : pendingInvitations,
      numberUsers: numberUsers ? numberUsers.length : numberUsers,
      devicesCurrentlyManaged: devicesCurrentlyManaged ? devicesCurrentlyManaged.length : devicesCurrentlyManaged,
      devicesByOperatingSystemVersion,
      devicesByUsers,
      isLoading: false
    })
  }

  renderInfoBox () {
    let boxes = []

    if (this.state.devicesCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to='app/devices'
          count={this.state.devicesCurrentlyManaged}
          name={I18n.t('commons.devices')}
          icon="deviceIcon"
          key="devicesCurrentlyManaged"
        />
      )
    }

    if (this.state.invitationsSent) {
      boxes.push(
        <InfoBox
          to='app/invitations'
          count={this.state.invitationsSent}
          name={I18n.t('commons.invitations')}
          icon="emailIcon"
          key="invitationsSent"
        />
      )
    }

    if (this.state.fleetsCurrentlyManaged) {
      boxes.push(
        <InfoBox
          to='app/fleets'
          count={this.state.fleetsCurrentlyManaged}
          name={I18n.t('commons.fleets')}
          icon="goToStartIcon"
          key="fleetsCurrentlyManaged"
        />
      )
    }

    if (this.state.filesUploaded) {
      boxes.push(
        <InfoBox
          to='app/files'
          count={this.state.filesUploaded}
          name={I18n.t('commons.files')}
          icon="filesIcon"
          key="filesUploaded"
        />
      )
    }

    if (this.state.applicationsUploaded) {
      boxes.push(
        <InfoBox
          to='app/applications'
          count={this.state.applicationsUploaded}
          name={I18n.t('commons.applications')}
          icon="switchAppsIcon"
          key="applicationsUploaded"
        />
      )
    }

    if (this.state.numberUsers) {
      boxes.push(
        <InfoBox
          to='app/users'
          count={this.state.numberUsers}
          name={I18n.t('commons.users')}
          icon="peopleIcon"
          key="numberUsers"
        />
      )
    }

    return boxes

  }

  renderGraphics () {
    let graphics = []

    if (this.state.devicesByOperatingSystemVersion) {
      graphics.push(
        <div key="DevicesOS" className="info-box">
          <VictoryPie
            colorScale={[
              "#969696",
              "#bdbdbd",
              "#d9d9d9"
            ]}
            innerRadius={50}
            padAngle={5}
            labelRadius={90}
            labels={(d) => `${d.x} ${d.y}`}
            data={this.state.devicesByOperatingSystemVersion}
            style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">{I18n.t('commons.devices_by_plataform').toUpperCase()}</span>
        </div>
      )
    }

    if (this.state.pendingInvitations) {
      graphics.push(
        <div key="InvitationsChart" className="info-box">
          <VictoryPie
              colorScale={[
                "#969696",
                "#bdbdbd",
                "#d9d9d9"
              ]}
              innerRadius={50}
              padAngle={5}
              labelRadius={90}
              labels={(d) => `${d.x} ${d.y}`}
              data={[
                { x: I18n.t('commons.invitations'), y: this.state.pendingInvitations }
              ]}
              style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
          />
          <span className="title-box">{I18n.t('commons.pending_invitations').toUpperCase()}</span>
        </div>
      )
    }

    if (this.state.devicesByUsers) {
      graphics.push(
        <div key="devicesByUsersChart" className="info-box navlinks">
          <ul>
            { 
              this.state.devicesByUsers.map((device, id) => {
                return (
                  <li key={`device${id}`}>
                    <NavLink 
                      exact
                      to={`/app/devices/${device.id}`}
                    >
                      {device.name}
                    </NavLink>
                  </li>
                )
              }) 
            }
          </ul>
          <span className="title-box">{I18n.t('commons.devices_by_users').toUpperCase()}</span>
        </div>
      )
    }
    
    return graphics
  }

  render() {
    const renderInfoBox = this.renderInfoBox()
    const renderGraphics = this.renderGraphics()
    const renderComponent = this.state.isLoading ? <div style={{width: '100%', height: 'calc(100vh - 80px)'}}><Loading message={`${I18n.t('commons.loading')}...`} /></div>:
    (
      <ContentPane>
        <div className="dashboard-block">

        {
          (renderInfoBox.length > 0 || renderGraphics.length > 0) ?
            (
              <div className="dashboard-wrapper__div">

                  <div className="dashboard-infobox-wraper__div">

                    {renderInfoBox}

                  </div>

                  <div className="dashboard-chart-wraper__div">

                    {renderGraphics}

                  </div> 

              </div>
            ) : <EmptyMessage message={I18n.t('commons.no_data')} />
        }

        </div>
      </ContentPane>
    )

    return renderComponent
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(withGLPI(Dashboard))