import React, { Component } from 'react'
import InvitationsList from './InvitationsList'
import InvitationsPage from './InvitationsPage'
import getMode from '../../shared/getMode'
import glpi from '../../shared/glpiApi'

export default class Invitations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: ['Invitations'],
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
                return <InvitationsList
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
                return <InvitationsPage 
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
                <div className="flex-block --with-scroll --with-content-pane">
                    <InvitationsList
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
                    <InvitationsPage 
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
