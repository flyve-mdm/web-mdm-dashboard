import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import Title from '../../../../components/Title'

class Display extends Component {

    constructor(props) {
        super(props)

        const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}

        this.state = {
            maximumManagedDevices: display.maximumManagedDevices !== undefined ? display.maximumManagedDevices : true,
            applicationsUploaded: display.applicationsUploaded !== undefined ? display.applicationsUploaded : true,
            devicesByOperatingSystemVersion: display.devicesByOperatingSystemVersion !== undefined ? display.devicesByOperatingSystemVersion : true,
            devicesByUsers: display.devicesByUsers !== undefined ? display.devicesByUsers : true,
            devicesCurrentlyManaged: display.devicesCurrentlyManaged !== undefined ? display.devicesCurrentlyManaged : true,
            filesUploaded: display.filesUploaded !== undefined ? display.filesUploaded : true,
            fleetsCurrentlyManaged: display.fleetsCurrentlyManaged !== undefined ? display.fleetsCurrentlyManaged : true,
            invitationsSent: display.invitationsSent !== undefined ? display.invitationsSent: true,
            numberUsers: display.numberUsers !== undefined ? display.numberUsers: true,
            animations: display.animations !== undefined ? display.animations : true 
        }
    }

    changeLocalStorage = (name) => {
        let display = localStorage.getItem('display') ? localStorage.getItem('display') : '{}'
        display = JSON.parse(display)

        display = { 
            ...display, 
            [name]: !display[name]
        }

        this.setState({
            [name]: !this.state[name]
        })

        localStorage.setItem('display', JSON.stringify(display))

        if (name === 'animations') {
            this.props.handleToggleAnimation()
        }
    }

    render () {
        return (
            <div>
                <Title text="Supervision" style={{marginBottom: '20px'}}/>

                <div className="win-h3"> Language </div>

                <div className="listElement">
                    <div className="message">
                        Change interface language
                    </div>
                    <div 
                    className="controller" 
                    style={{
                        paddingTop: 10
                    }}>
                        <select 
                        className="win-dropdown" 
                        // name={} 
                        // value={}
                        // onChange={}
                        >
                            <option>English</option>
                            <option>French</option>
                            <option>Spanish</option>
                            <option>Portuguese</option>
                        </select>
                    </div>
                </div>

                <div className="win-h3"> Animations </div>

                    <div className="listElement">
                        <div className="message">
                        {this.state.animations ? 'Disable animations' : 'Enable animations' }
                        </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch
                        className="content-text-primary"
                            checked={this.state.animations}
                            onChange={() => this.changeLocalStorage('animations')}
                        />
                    </div>
                </div>
                                        
                <div className="win-h3">Show in dashboard </div>

                <div className="listElement">
                    <div className="message">
                        Maximum managed devices
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            checked={this.state.maximumManagedDevices}
                            onChange={() => this.changeLocalStorage('maximumManagedDevices')}
                            />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Devices currently managed
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.devicesCurrentlyManaged}
                                onChange={() => this.changeLocalStorage('devicesCurrentlyManaged')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Fleets currently managed
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.fleetsCurrentlyManaged}
                                onChange={() => this.changeLocalStorage('fleetsCurrentlyManaged')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Files uploaded
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.filesUploaded}
                                onChange={() => this.changeLocalStorage('filesUploaded')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Applications uploaded   
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.applicationsUploaded}
                                onChange={() => this.changeLocalStorage('applicationsUploaded')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Number of users
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.numberUsers}
                                onChange={() => this.changeLocalStorage('numberUsers')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Invitations sent
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.invitationsSent}
                                onChange={() => this.changeLocalStorage('invitationsSent')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Devices by users
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.devicesByUsers}
                                onChange={() => this.changeLocalStorage('devicesByUsers')}
                                />
                    </div>
                </div>
                
                <div className="listElement">
                    <div className="message">
                        Devices by Operating System version
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                checked={this.state.devicesByOperatingSystemVersion}
                                onChange={() => this.changeLocalStorage('devicesByOperatingSystemVersion')}
                                />
                    </div>
                </div>
                
            </div>
        )
    }
}

Display.propTypes = {
    handleToggleAnimation: PropTypes.func.isRequired
}

export default Display