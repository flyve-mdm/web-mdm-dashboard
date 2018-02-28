import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'
import { I18n } from 'react-i18nify'

import ContentPane from '../../components/ContentPane'
import InfoBox from '../../components/InfoBox';

class Dashboard extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="win-h2" style={{ marginLeft: '10px' }}> {I18n.t('commons.dashboard')} </h2>

        <div className="dashboard">

            <div className="wrapper">

                <div className="wrapper-box">

                    <InfoBox
                      to='/devices'
                      count={1}
                      name={I18n.t('commons.devices')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='/applications'
                      count={1}
                      name={I18n.t('commons.applications')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='/files'
                      count={1}
                      name={I18n.t('commons.files')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='/fleets'
                      count={1}
                      name={I18n.t('commons.fleets')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='/invitations'
                      count={1}
                      name={I18n.t('commons.invitations')}
                      icon="deviceIcon"
                    />

                    <InfoBox
                      to='/users'
                      count={1}
                      name={I18n.t('commons.users')}
                      icon="deviceIcon"
                    />

                </div>

                <div className="wrapper-chart">

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
  }
}

Dashboard.propTypes = {

}

export default Dashboard