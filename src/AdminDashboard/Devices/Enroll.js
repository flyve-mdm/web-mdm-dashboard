import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}
Enroll.propTypes = {
    changeActionList: PropTypes.func.isRequired
}
