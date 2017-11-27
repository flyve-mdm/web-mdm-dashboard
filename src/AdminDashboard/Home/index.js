import React, { Component } from 'react'
import DashboardPage from './DashboardPage'
import { Devices, Fleets, Files, Applications, Users } from '../Data'

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
            <div className="home">
                <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location} </h2>
                <DashboardPage count={this.state.pages.devices} name="Devices"/>
                <DashboardPage count={this.state.pages.fleets} name="Fleets"/>
                <DashboardPage count={this.state.pages.files} name="Files"/>
                <DashboardPage count={this.state.pages.applications} name="Applications"/>
                <DashboardPage count={this.state.pages.users} name="Users"/>
            </div>
            
        )
    }
}
