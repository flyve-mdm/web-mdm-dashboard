import React, { Component } from 'react'

export default class InvitationsPage extends Component {
    render() {
        return (
            <div>
                <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem([])}>
                    Enroll new device
                </h2>
                <p>Please insert an active email address.</p>
                <p>An email will be sent with a QR code.</p>
                <input type="text" className="win-textbox" placeholder="Email"/>
                <br/>
                <button className="win-button">Cancel</button>
                <button className="win-button win-button-primary" style={{marginLeft: 10}}>Save</button>
            </div>
        )
    }
}
