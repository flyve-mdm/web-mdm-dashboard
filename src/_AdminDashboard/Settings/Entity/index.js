import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../Utils/ContentPane'
import validateData from '../../../Utils/validateData'
import SettingsEntity from '../../data/SettingsEntity.json'
import ChangeDownloadURL from './ChangeDownloadURL'
import ChangeTokenLife from './ChangeTokenLife'
import Main from './Main'

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

    saveValues = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render () {
        switch (this.state.mode) {

            case 'change Token life':
                return (
                    <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                        <ChangeTokenLife 
                            changeMode={this.changeMode} 
                            tokenLife={this.state.tokenLife}
                            saveValues={this.saveValues}
                            showNotification={this.props.showNotification}
                        />
                    </ContentPane>
                )

            case 'change download URL':
                return (
                    <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                        <ChangeDownloadURL 
                            changeMode={this.changeMode} 
                            downloadURL={this.state.downloadURL} 
                            saveValues={this.saveValues}
                            showNotification={this.props.showNotification}
                        />
                    </ContentPane>
                )
        
            default:
                return (
                    <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                        <Main
                            tokenLife={this.state.tokenLife} 
                            numberCategoriesForPolicies={this.state.numberCategoriesForPolicies} 
                            typesPolicies={this.state.typesPolicies} 
                            invitationsSent={this.state.invitationsSent} 
                            numberUsers={this.state.numberUsers} 
                            applicationsUploaded={this.state.applicationsUploaded} 
                            filesUploaded={this.state.filesUploaded} 
                            fleetsCurrentlyManaged={this.state.fleetsCurrentlyManaged} 
                            devicesCurretlymanaged={this.state.devicesCurretlymanaged} 
                            maximunManagedDevices={this.state.maximunManagedDevices} 
                            entityID={this.state.entityID}  
                            downloadURL={this.state.downloadURL} 
                            changeMode={this.changeMode}
                        />
                    </ContentPane>
                )
        }

    }
}

Entity.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    showNotification: PropTypes.func.isRequired
}

export default Entity