import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'
import { I18n } from 'react-i18nify'
import withGLPI from '../../hoc/withGLPI'
import Loading from '../../components/Loading'
import InfoBox from '../../components/InfoBox'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      devices: undefined,
      invitations: undefined
    }
  }

  componentDidMount = async () => {
    try {
      const devices = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmAgent"})
      const invitations = await this.props.glpi.getAllItems({itemtype: "PluginFlyvemdmInvitation"})
      this.setState({
        devices: devices.length,
        invitations: invitations.length,
        isLoading: false
      })
    } catch (error) {
      
    }
  }

  render() {
    const renderComponent = this.state.isLoading ? <Loading message="Loading..." /> :
    (
      <React.Fragment>
        <div className="dashboard-block">

            <div className="dashboard-wrapper__div">

                <div className="dashboard-infobox-wraper__div">

                    <InfoBox
                      to='app/devices'
                      count={this.state.devices}
                      name={I18n.t('commons.devices')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='app/invitations'
                      count={this.state.invitations}
                      name={I18n.t('commons.invitations')}
                      icon="emailIcon"
                    />

                    <InfoBox
                      to='app/fleets'
                      count={1}
                      name={I18n.t('commons.fleets')}
                      icon="goToStartIcon"
                    />

                    <InfoBox
                      to='app/files'
                      count={1}
                      name={I18n.t('commons.files')}
                      icon="filesIcon"
                    />

                    <InfoBox
                      to='app/applications'
                      count={1}
                      name={I18n.t('commons.applications')}
                      icon="switchAppsIcon"
                    />

                    <InfoBox
                      to='app/users'
                      count={1}
                      name={I18n.t('commons.users')}
                      icon="peopleIcon"
                    />

                </div>

                <div className="dashboard-chart-wraper__div">

                  <div key="DevicesOS" className="info-box">
                      <VictoryPie
                          colorScale={[
                              "#969696",
                              "#bdbdbd",
                              "#d9d9d9"]}
                          innerRadius={50}
                          padAngle={5}
                          labelRadius={90}
                          labels={(d) => `${d.x} ${d.y}`}
                          data={[
                              { x: "Android", y: 1 },
                              { x: "iOS", y: 1 },
                              { x: "Windows", y: 1 }
                          ]}
                          style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
                      />
                      <span className="title-box">{I18n.t('commons.devices_by_plataform').toUpperCase()}</span>
                  </div>

                  <div key="InvitationsChart" className="info-box">
                    <VictoryPie
                        colorScale={[
                            "#969696",
                            "#bdbdbd",
                            "#d9d9d9"]}
                        innerRadius={50}
                        padAngle={5}
                        labelRadius={90}
                        labels={(d) => `${d.x} ${d.y}`}
                        data={[
                            { x: I18n.t('commons.invitations'), y: 1 },
                        ]}
                        style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
                    />
                    <span className="title-box">{I18n.t('commons.pending_invitations').toUpperCase()}</span>
                  </div>

                </div>

            </div>

        </div>
      </React.Fragment>
    )

    return renderComponent
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired
}

export default withGLPI(Dashboard)