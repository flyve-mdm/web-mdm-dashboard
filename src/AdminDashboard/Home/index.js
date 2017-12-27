import React, { Component } from 'react'
import DashboardPage from './DashboardPage'
import { Devices, Fleets, Files, Applications, Users } from '../Data'
import ContentPane from '../../Utils/ContentPane'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pages: {
                devices: Devices.length,
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
                    <div className="wrapper">
                        <DashboardPage count={this.state.pages.devices} name="Devices" icon="deviceIcon"/>
                        <DashboardPage count={this.state.pages.fleets} name="Fleets" icon="goToStartIcon"/>
                        <DashboardPage count={this.state.pages.files} name="Files" icon="copyIcon"/>
                        <DashboardPage count={this.state.pages.applications} name="Applications" icon="appsIcon"/>
                        <DashboardPage count={this.state.pages.users} name="Users" icon="peopleIcon"/>
                    </div>
            </ContentPane>
            
        )
    }
}
