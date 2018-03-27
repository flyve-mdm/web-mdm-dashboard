import React, { Component } from 'react'
import ChangeDownloadURL from './ChangeDownloadURL'
import ChangeTokenLife from './ChangeTokenLife'
import Main from './Main'
import validateData from '../../../../shared/validateData'
import SettingsEntity from '../../../../data/SettingsEntity.json'
import ContentPane from '../../../../components/ContentPane'

class Entity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: '', 
            buttonSaveClassName: "win-button hidden",
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
        let content
        switch (this.state.mode) {

            case 'change Token life':
                content = (
                    <ContentPane>
                        <ChangeTokenLife 
                            changeMode={this.changeMode} 
                            tokenLife={this.state.tokenLife}
                            saveValues={this.saveValues}
                            showNotification={this.props.showNotification}
                        />
                    </ContentPane>
                )
                
            break

            case 'change download URL':
                content = (
                    <ContentPane>
                        <ChangeDownloadURL 
                            changeMode={this.changeMode} 
                            downloadURL={this.state.downloadURL} 
                            saveValues={this.saveValues}
                            showNotification={this.props.showNotification}
                        />
                    </ContentPane>
                )

            break
        
            default:
                content = (
                    <ContentPane>
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

        return (
            <div>
                <h2>Entity</h2> 
                <div style={{marginTop: '20px'}}>
                    {content}
                </div>
            </div>
        )

    }
}

export default Entity