import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import Loading from '../../Utils/Loading'

export default class Enroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            email: ''
        }
    }

    inviteDevice = () => {
        if(this.state.email.trim() !== "") {
            this.setState({
                isLoading: true
            })
            this.props.glpi.addItem({ itemtype: 'PluginFlyvemdmInvitation', input: { _useremails: this.state.email.trim()} })
            .then((response) => {
                
                this.setState({
                    isLoading: false
                })
                this.props.showNotification('Success', 'invitation sent')
                this.props.changeActionList(null)
                
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.showNotification(error[0], error[1])
                }
            })   
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = <Loading message="Loading..." />
        } else {
            renderComponent = (
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
                    <br />
                    <button className="win-button" onClick={() => this.props.changeActionList(null)}>Cancel</button>
                    <button
                        className="win-button win-button-primary"
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
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
