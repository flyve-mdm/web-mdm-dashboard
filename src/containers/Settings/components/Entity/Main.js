import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Main extends Component {

    render () {
        return (    
            <React.Fragment>
                <div className="win-h3"> Agent </div>

                <div className="listElement">
                    <div className="message">
                        Token life
                    </div>
                    <div className="controller">
                        <a onClick={() => this.props.changeMode("change Token life")}>{this.props.tokenLife} DAYS</a>
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Download URL
                        <div className="detail">{this.props.downloadURL}</div>
                    </div>

                    <div className="controller">
                        <button className="win-button" onClick={() => this.props.changeMode("change download URL")}>
                            Change
                        </button>
                    </div>
                </div>

                <div className="win-h3"> Configuration </div>

                <div className="listElement">
                    <div className="message">
                        Entity ID
                    </div>
                    <div className="controller">
                        {this.props.entityID}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Maximum managed devices
                    </div>
                    <div className="controller">
                        {this.props.maximunManagedDevices}
                    </div>
                </div>

                <div className="win-h3"> General information </div>

                <div className="listElement">
                    <div className="message">
                        Devices currently managed
                    </div>
                    <div className="controller">
                        {this.props.devicesCurretlymanaged}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Fleets currently managed
                    </div>
                    <div className="controller">
                        {this.props.fleetsCurrentlyManaged}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Files uploaded
                    </div>
                    <div className="controller">
                        {this.props.filesUploaded}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Applications uploaded
                    </div>
                    <div className="controller">
                        {this.props.applicationsUploaded}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Number of users
                    </div>
                    <div className="controller">
                        {this.props.numberUsers}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Invitations sent
                    </div>
                    <div className="controller">
                        {this.props.invitationsSent}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Types of policies
                    </div>
                    <div className="controller">
                        {this.props.typesPolicies}
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Number of categories for policies
                    </div>
                    <div className="controller">
                        {this.props.numberCategoriesForPolicies}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

Main.propTypes = {
    tokenLife: PropTypes.string.isRequired,
    numberCategoriesForPolicies: PropTypes.string.isRequired,
    typesPolicies: PropTypes.string.isRequired,
    invitationsSent: PropTypes.string.isRequired,
    numberUsers: PropTypes.string.isRequired,
    applicationsUploaded: PropTypes.string.isRequired,
    filesUploaded: PropTypes.string.isRequired,
    fleetsCurrentlyManaged: PropTypes.string.isRequired,
    devicesCurretlymanaged: PropTypes.string.isRequired,
    maximunManagedDevices: PropTypes.string.isRequired,
    entityID: PropTypes.string.isRequired, 
    downloadURL: PropTypes.string.isRequired,
    changeMode: PropTypes.func.isRequired
}

export default Main