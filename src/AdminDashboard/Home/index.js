import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardPage from './DashboardPage'
import { Devices, Invitations, Fleets, Files, Applications, Users } from '../Data'
import ContentPane from '../../Utils/ContentPane'
import { VictoryPie } from 'victory'
import { I18n } from 'react-i18nify';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pages: {
                devices: Devices.length,
                invitations: Invitations.length,
                fleets: Fleets.length,
                files: Files.length,
                applications: Applications.length,
                users: Users.length
            }
        }
    }

    render() {

        const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
        let componentsBox = []
        let componentsChart = []

        if (display.maximumManagedDevices === undefined || display.maximumManagedDevices) {
            componentsBox.push(<DashboardPage key="Devices" count={this.state.pages.devices} name={I18n.t('commons.devices')} icon="deviceIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
        } 
        if (display.devicesByOperatingSystemVersion === undefined || display.devicesByOperatingSystemVersion) {
            componentsChart.push(
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
                            { x: "Android", y: 5 },
                            { x: "iOS", y: 2 },
                            { x: "Windows", y: 2 }
                        ]}
                        style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
                    />
                    <span className="title-box">{I18n.t('commons.devices_by_plataform').toUpperCase()}</span>
                </div>
            )
        }
        if (display.applicationsUploaded === undefined || display.applicationsUploaded) {
            componentsBox.push(<DashboardPage key="Applications" count={this.state.pages.applications} name={I18n.t('commons.applications')} icon="appsIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
        }
        if (display.filesUploaded === undefined || display.filesUploaded) {
            componentsBox.push(<DashboardPage key="Files" count={this.state.pages.files} name={I18n.t('commons.files')} icon="copyIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
        }
        if (display.fleetsCurrentlyManaged === undefined || display.fleetsCurrentlyManaged) {
            componentsBox.push(<DashboardPage key="Fleets" count={this.state.pages.fleets} name={I18n.t('commons.fleets')} icon="goToStartIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
        }
        if (display.invitationsSent === undefined || display.invitationsSent) {
            componentsBox.push(<DashboardPage key="Invitations" count={this.state.pages.invitations} name={I18n.t('commons.invitations')} icon="emailIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
            componentsChart.push(
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
                            { x: I18n.t('commons.invitations'), y: this.state.pages.invitations },
                        ]}
                        style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
                    />
                    <span className="title-box">{I18n.t('commons.pending_invitations').toUpperCase()}</span>
                </div>
            )
        }
        if (display.numberUsers === undefined || display.numberUsers) {
            componentsBox.push(<DashboardPage key="Users" count={this.state.pages.users} name={I18n.t('commons.users')} icon="peopleIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers} />)
        }
        
        return (
            <ContentPane itemListPaneWidth={0}>
                <h2 className="win-h2" style={{ marginLeft: '10px' }}> {I18n.t('commons.dashboard')} </h2>
                <div style={{ display: 'inlineBlock'}}>
                    <div className="wrapper">
                        <div className="wrapper-box">
                            {componentsBox}
                        </div>
                        <div className="wrapper-chart">
                            {componentsChart}
                        </div>
                    </div>
                </div>
            </ContentPane>
            
        )
    }
}
Dashboard.propTypes = {
    routers: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeIndex: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
}