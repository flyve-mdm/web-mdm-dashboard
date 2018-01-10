import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'

export default class Enroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    inviteDevice = () => {
        if(this.state.email.trim() !== "") {
            this.props.changeActionList(null)
            this.props.showNotification('Success', 'invitation sent')
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2 titleContentPane">
                    Enroll new device
                </h2>
                <p>Please insert an active email address.</p>
                <p>An email will be sent with a QR code.</p>
                <input 
                    type="email" 
                    className="win-textbox" 
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeInput}
                    required
                />
                <br/>
                <button className="win-button" onClick={() => this.props.changeActionList(null)}>Cancel</button>
                <button 
                    className="win-button win-button-primary" 
                    style={{marginLeft: 10}}
                    onClick={this.inviteDevice}
                >
                    Save
                </button>
            </ContentPane >
        )
    }
}
Enroll.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}
