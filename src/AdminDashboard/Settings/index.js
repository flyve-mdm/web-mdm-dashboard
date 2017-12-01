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
                    location={this.props.location}
                    itemList={this.state.itemList}
                    onNavigate={this.props.onNavigate}/>
                )
            } else {
                return (
                    <SettingsPage 
                    location={this.props.location}
                    itemList={this.state.itemList}
                    itemListPaneWidth={0}/>
                )
            }
        } else {
            const ItemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <SettingsList 
                    itemListPaneWidth={ItemListPaneWidth}
                    itemList={this.state.itemList}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}/>

                    <SettingsPage 
                    location={this.props.location}
                    itemList={this.state.itemList}
                    itemListPaneWidth={ItemListPaneWidth}/>
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