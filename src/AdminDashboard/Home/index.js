import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardPage from './DashboardPage'
import { Devices, Invitations, Fleets, Files, Applications, Users } from '../Data'
import ContentPane from '../../Utils/ContentPane'
import { VictoryPie } from 'victory'

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
        
        return (
            <ContentPane itemListPaneWidth={0}>
                <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location} </h2>
                <div style={{ display: 'inlineBlock'}}>
                    <div className="wrapper">
                        <div className="wrapper-box">
                            <DashboardPage count={this.state.pages.devices} name="Devices" icon="deviceIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                            <DashboardPage count={this.state.pages.invitations} name="Invitations" icon="emailIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                            <DashboardPage count={this.state.pages.fleets} name="Fleets" icon="goToStartIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                            <DashboardPage count={this.state.pages.files} name="Files" icon="copyIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                            <DashboardPage count={this.state.pages.applications} name="Applications" icon="appsIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                            <DashboardPage count={this.state.pages.users} name="Users" icon="peopleIcon" onNavigate={this.props.onNavigate} changeIndex={this.props.changeIndex} routers={this.props.routers}/>
                        </div>
                        <div className="wrapper-chart">

                            <div className="info-box">
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
                                <span className="title-box">DEVICES BY PLATAFORM</span>
                            </div>

                            <div className="info-box">
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
                                        { x: "Invitations", y: this.state.pages.invitations },
                                    ]}
                                    style={{ labels: { fill: "#000", fontSize: 24, fontWeight: 300 } }}
                                />
                                <span className="title-box">PENDING INVITATIONS</span>
                            </div>
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
}