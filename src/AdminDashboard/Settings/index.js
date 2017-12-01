import React, { Component } from "react"
import SettingsList from "./SettingsList"
import SettingsPage from "./SettingsPage"
import PropTypes from 'prop-types'

class Settings extends Component {

    render() {
        const selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return (
                    <SettingsList
                    itemListPaneWidth="100%" 
                    onNavigate={this.props.onNavigate}/>
                )
            } else {
                return (
                    <SettingsPage 
                    location={this.props.location}
                    itemListPaneWidth={0}/>
                )
            }
        } else {
            const ItemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <SettingsList 
                    itemListPaneWidth={ItemListPaneWidth}
                    onNavigate={this.props.onNavigate}/>

                    <SettingsPage 
                    location={this.props.location}
                    itemListPaneWidth={0}/>
                </div>
            )
        }
    }
}

Settings.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired
}

export default Settings