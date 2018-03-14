import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'

export default class Enroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            email: ''
        }
    }

    inviteDevice = async () => {
        try {
            if (this.state.email.trim() !== "") {
                
                this.setState({
                    isLoading: true
                })
                
                await this.props.glpi.addItem({ itemtype: 'PluginFlyvemdmInvitation', input: { _useremails: this.state.email.trim() } })
                
                this.setState({
                    isLoading: false
                })

                this.props.setNotification({
                    title: 'Successfully',
                    body: 'Invitation successfully sent!',
                    type: 'success'
                })
                this.props.history.push('/app/devices')
            }
        } catch (error) {
            if (error.length > 1) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <Loading message="Loading..." />
            )
        } else {
            renderComponent = (
                <ContentPane>
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
                    <br />
                    <button className="btn --secondary" onClick={() => this.props.history.push('/app/devices')}>Cancel</button>
                    <button
                        className="btn --primary"
                        style={{ marginLeft: 10 }}
                        onClick={this.inviteDevice}>
                        Save
                    </button>
                </ContentPane >
            )
        }
        
        return renderComponent
    }
}
Enroll.propTypes = {
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
