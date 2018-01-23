import React, { Component } from "react"
import SettingsList from "./SettingsList"
import SettingsPage from "./SettingsPage"
import PropTypes from 'prop-types'
import WinJS from 'winjs'

class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemList: new WinJS.Binding.List([
                { title: "Entity" },
                { title: "Profiles" },
                { title: "Supervision" },
                { title: "Security" },
                { title: "Notifications" },
                { title: "Display" }
            ])
        }
    }

    render() {
        const selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return (
                    <SettingsList
                    itemListPaneWidth="100%" 
                    animation={this.props.animation}
                    location={this.props.location}
                    itemList={this.state.itemList}
                    onNavigate={this.props.onNavigate}
                    glpi={this.props.glpi} />
                )
            } else {
                return (
                    <SettingsPage 
                        animation={this.props.animation}
                        handleToggleAnimation={this.props.handleToggleAnimation}
                        location={this.props.location}
                        itemList={this.state.itemList}
                        itemListPaneWidth={0}
                        getPasswordConfiguration={this.props.getPasswordConfiguration}
                        passwordConfiguration={this.props.passwordConfiguration}
                        changeLoading={this.props.changeLoading}
                        isLoading={this.props.isLoading}
                        showNotification={this.props.showNotification}
                        glpi={this.props.glpi}
                    />
                )
            }
        } else {
            const ItemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <SettingsList 
                    itemListPaneWidth={ItemListPaneWidth}
                    animation={this.props.animation}
                    itemList={this.state.itemList}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    glpi={this.props.glpi} />

                    <SettingsPage 
                        animation={this.props.animation}
                        handleToggleAnimation={this.props.handleToggleAnimation}
                        location={this.props.location}
                        itemList={this.state.itemList}
                        itemListPaneWidth={ItemListPaneWidth}
                        getPasswordConfiguration={this.props.getPasswordConfiguration}
                        passwordConfiguration={this.props.passwordConfiguration}
                        isLoading={this.props.isLoading}
                        changeLoading={this.props.changeLoading}
                        showNotification={this.props.showNotification}
                        glpi={this.props.glpi}
                    />
                </div>
            )
        }
    }
}

Settings.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    animation: PropTypes.bool.isRequired,
    handleToggleAnimation: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    getPasswordConfiguration: PropTypes.func.isRequired,
    passwordConfiguration: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    changeLoading: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.func.isRequired
}

export default Settings