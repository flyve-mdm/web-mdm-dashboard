import React, { Component } from 'react'
import ChangeDownloadURL from './ChangeDownloadURL'
import ChangeTokenLife from './ChangeTokenLife'
import Main from './Main'
import validateData from '../../../../shared/validateData'
import SettingsEntity from '../../../../data/SettingsEntity.json'
import ContentPane from '../../../../components/ContentPane'
import Loading from '../../../../components/Loading'
import { I18n } from 'react-i18nify'
import withGLPI from '../../../../hoc/withGLPI'
import itemtype from '../../../../shared/itemtype'

class Entity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            mode: '', 
            buttonSaveClassName: "win-button hidden",
            tokenLife: validateData(SettingsEntity["tokenLife"]),
            downloadURL: validateData(SettingsEntity["downloadURL"], "https://"),
            entityID: undefined,
            devicesCurretlymanaged: undefined,
            fleetsCurrentlyManaged: undefined,
            filesUploaded: undefined,
            applicationsUploaded: undefined,
            numberUsers: undefined,
            invitationsSent: undefined,
            typesPolicies: undefined,
            numberCategoriesForPolicies: validateData(SettingsEntity["numberCategoriesForPolicies"])
        }
    }

    componentDidMount = async () => {
        try {
            const devices = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmAgent})
            const applications = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmPackage})
            const users = await this.props.glpi.getAllItems({itemtype: itemtype.User})
            const invitations = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmInvitation})
            const files = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmFile})
            const fleets = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmFleet})
            const { active_profile } = await this.props.glpi.getActiveProfile()
            const policies = await this.props.glpi.getAllItems({itemtype: itemtype.PluginFlyvemdmPolicy})
            this.setState({
                isLoading: false,
                devicesCurretlymanaged: devices.length,
                applicationsUploaded: applications.length,
                numberUsers: users.length,
                invitationsSent: invitations.length,
                filesUploaded: files.length,
                fleetsCurrentlyManaged: fleets.length,
                entityID: active_profile.entities[0].id,
                typesPolicies: policies.length
            })
        } catch (error) {
            console.log(error)
            // this.props.actions.setNotification({
            //     title: error[0],
            //     body: error[1],
            //     type: 'alert'
            // })
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
                            entityID={this.state.entityID}  
                            downloadURL={this.state.downloadURL} 
                            changeMode={this.changeMode}
                        />
                    </ContentPane>
                )
        }

        return (
            this.state.isLoading ? <Loading message={`${I18n.t('commons.loading')}...`}/> :
            (
                <div>
                    <h2>{ I18n.t('settings.entity.title') }</h2> 
                    <div style={{marginTop: '20px'}}>
                        {content}
                    </div>
                </div>
            )
        )
    }
}

export default withGLPI(Entity)