import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import PropTypes from 'prop-types'

class Display extends Component {

    constructor(props) {
        super(props)

        const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}

        this.state = {
            maximumManagedDevices: display.maximumManagedDevices ? display.maximumManagedDevices: false,
            applicationsUploaded: display.applicationsUploaded ? display.applicationsUploaded: false,
            devicesByOperatingSystemVersion: display.devicesByOperatingSystemVersion ? display.devicesByOperatingSystemVersion: false,
            devicesByUsers: display.devicesByUsers ? display.devicesByUsers: false,
            devicesCurrentlyManaged: display.devicesCurrentlyManaged ? display.devicesCurrentlyManaged: false,
            filesUploaded: display.filesUploaded ? display.filesUploaded: false,
            fleetsCurrentlyManaged: display.fleetsCurrentlyManaged ? display.fleetsCurrentlyManaged: false,
            invitationsSent: display.invitationsSent ? display.invitationsSent: false,
            numberUsers: display.numberUsers ? display.numberUsers: false,
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
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <h2 className="win-h2"> Display </h2>

                <div className="title"> Language </div>

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

                <div className="title"> Animations </div>

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
                                        
                <div className="title">Show in dashboard </div>

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
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleToggleAnimation: PropTypes.func.isRequired
}

export default Display