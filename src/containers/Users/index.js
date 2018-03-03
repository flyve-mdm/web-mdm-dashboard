import React, { Component } from 'react'
import UsersList from './UsersList'
import UsersPage from './UsersPage'
import getMode from '../../shared/getMode'
import glpi from '../../shared/glpiApi'

export default class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: ['Users'],
            selectionMode: false,
            action: null,
            animation: false,
        }
    }

    onNavigate = location => this.setState({location})
    changeAction = action => this.setState({action})
    changeSelectionMode = selectionMode => this.setState({selectionMode})
    showNotification = (title, body) => {
    }

    render() {

        let selectedItemList = this.state.location.length === 2 ? this.state.location[1] : null
        if (getMode() === 'small') {
            if (!selectedItemList && !this.state.action) {
                return <UsersList
                    itemListPaneWidth={'100%'}
                    animation={this.state.animation}
                    location={this.state.location}
                    onNavigate={this.onNavigate}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    action={this.state.action}
                    changeAction={this.changeAction}
                    showNotification={this.showNotification} 
                    glpi={glpi} />
            } else {
                return <UsersPage 
                    itemListPaneWidth={0}
                    animation={this.state.animation}
                    location={this.state.location}
                    onNavigate={this.onNavigate}
                    selectedItemList={selectedItemList}
                    changeSelectionMode={this.changeSelectionMode}
                    action={this.state.action}
                    changeAction={this.changeAction}
                    showNotification={this.showNotification} 
                    glpi={glpi} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <UsersList
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.state.animation}
                        location={this.state.location}
                        onNavigate={this.onNavigate}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        action={this.state.action}
                        changeAction={this.changeAction} 
                        showNotification={this.showNotification} 
                        glpi={glpi}
                    />
                    <UsersPage 
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.state.animation}
                        location={this.state.location}
                        onNavigate={this.onNavigate}
                        selectedItemList={selectedItemList}
                        changeSelectionMode={this.changeSelectionMode}
                        action={this.state.action}
                        changeAction={this.changeAction} 
                        showNotification={this.showNotification} 
                        glpi={glpi}
                    />
                </div>
            )
        }
    }
}
