import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import validateData from '../../Utils/validateData'
import SettingsEntity from '../data/SettingsEntity.json'

class Entity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: '', 
            buttonSaveClassName: "win-button win-button-primary hidden",
            tokenLife: validateData(SettingsEntity["tokenLife"]),
            downloadURL: validateData(SettingsEntity["downloadURL"], "https://"),
            entityID: validateData(SettingsEntity["entityID"]),
            maximunManagedDevices: validateData(SettingsEntity["maximunManagedDevices"]),
            devicesCurretlymanaged: validateData(SettingsEntity["devicesCurretlymanaged"]),
            fleetsCurrentlyManaged: validateData(SettingsEntity["fleetsCurrentlyManaged"]),
            filesUploaded: validateData(SettingsEntity["filesUploaded"]),
            applicationsUploaded: validateData(SettingsEntity["applicationsUploaded"]),
            numberUsers: validateData(SettingsEntity["numberUsers"]),
            invitationsSent: validateData(SettingsEntity["invitationsSent"]),
            typesPolicies: validateData(SettingsEntity["typesPolicies"]),
            numberCategoriesForPolicies: validateData(SettingsEntity["numberCategoriesForPolicies"])
        }
    }

    changeMode = (mode) => {
        this.setState({ mode })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {
        switch (this.state.mode) {

            case 'change download URL':
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <h2 className="win-h2"> Entity </h2>
                        
                        <div className="listElement">
                            URL of the application
                            <div className="detail">File extension as apk or upk</div>
                        </div>
                        <div className="listElement">
                            <input 
                                type="text" 
                                className="win-textbox" 
                                name="downloadURL"
                                value={this.state.downloadURL}
                                onChange={this.changeInput}
                            />
                        </div>
                        <button className="win-button" style={{marginRight: 10}} onClick={() => this.changeMode("")}>
                            Cancel
                        </button>
                        <button className="win-button win-button-primary" onClick={() => this.changeMode("")}>
                            Save
                        </button>

                    </div>
                )
        
            default:
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <h2 className="win-h2"> Entity </h2>

                    <div className="title"> Agent </div>

                    <div className="listElement">
                        <div className="message">
                            Token life
                        </div>
                        <div className="controller">
                            <a>{this.state.tokenLife} DAYS</a>
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Download URL
                            <div className="detail">{this.state.downloadURL}</div>
                        </div>

                        <div className="controller">
                            <button className="win-button" onClick={() => this.changeMode("change download URL")}>
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="title"> Configuration </div>

                    <div className="listElement">
                        <div className="message">
                            Entity ID
                        </div>
                        <div className="controller">
                            {this.state.entityID}
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Maximum managed devices
                        </div>
                        <div className="controller">
                            {this.state.maximunManagedDevices}
                        </div>
                    </div>

                    <div className="title"> General information </div>

                    <div className="listElement">
                        <div className="message">
                            Devices currently managed
                        </div>
                        <div className="controller">
                            {this.state.devicesCurretlymanaged}
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Fleets currently managed
                        </div>
                        <div className="controller">
                            {this.state.fleetsCurrentlyManaged}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Files uploaded
                        </div>
                        <div className="controller">
                            {this.state.filesUploaded}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Applications uploaded
                        </div>
                        <div className="controller">
                            {this.state.applicationsUploaded}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Number of users
                        </div>
                        <div className="controller">
                            {this.state.numberUsers}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Invitations sent
                        </div>
                        <div className="controller">
                            {this.state.invitationsSent}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Types of policies
                        </div>
                        <div className="controller">
                            {this.state.typesPolicies}
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Number of categories for policies
                        </div>
                        <div className="controller">
                            {this.state.numberCategoriesForPolicies}
                        </div>
                    </div>
                        
                </div>
                )
        }

    }
}

Entity.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Entity