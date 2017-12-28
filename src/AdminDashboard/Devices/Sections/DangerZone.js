import React, { Component } from 'react'

export default class DangerZone extends Component {
    render() {
        return (
            <div>
                <div className="listElement">
                <div className="message">
                    Wipe Device
                    <div className="detail">Wipe will delete all data on the device</div>
                </div>
                <div className="controller">
                    <button className="win-button">Wipe</button>
                </div>
                </div>

                <div className="listElement">
                <div className="message">
                    Unenrollment Device
                    <div className="detail">Unenrollment will change the state of the device (policies are unapplied, deployed files and app will be removed)</div>
                </div>
                <div className="controller">
                    <button className="win-button">Unenroll</button>
                </div>
                </div>

                <div className="listElement">
                <div className="message">
                    Delete Device
                    <div className="detail">Once you delete a device, there is no going back. Please be certain</div>
                </div>
                <div className="controller">
                    <button className="win-button">Delete</button>
                </div>
                </div>
            </div>
        )
    }
}