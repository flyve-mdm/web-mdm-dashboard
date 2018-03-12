import React, { Component } from "react"
import PropTypes from 'prop-types'
import UsersContent from './UsersContent'
import UsersEdit from './UsersEdit'
import UserEditOne from './UsersEditOne'
import EmptyMessage from '../../components/EmptyMessage'

export default class UsersPage extends Component {
    
    render() {
        if (this.props.selectedItemList === null || this.props.action === 'Edit') {
            switch (this.props.action) {
                case "Edit":
                    return (
                        <UsersEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeAction={this.props.changeAction}
                            showNotification={this.props.showNotification}
                            history={this.props.history}
                            setNotification={this.props.setNotification}
                            glpi={this.props.glpi}                             
                        />
                    )
                default:
                    return (
                        <EmptyMessage
                            message="No Selection"
                            itemListPaneWidth={this.props.itemListPaneWidth} 
                        />
                    )
            }
        } else {
            if (this.props.action === null) {
                if (this.props.selectedItemList.length > 0) {
                    return (
                        <UsersContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeAction={this.props.changeAction}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi} 
                        />
                    )
                } else {
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            } else {
                switch (this.props.action) {
                    case "EditOne":
                    return (
                        <UserEditOne 
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location} 
                            onNavigate={this.props.onNavigate}
                            changeAction={this.props.changeAction}
                            showNotification={this.props.showNotification} 
                            glpi={this.props.glpi}
                        />
                    )
                    default:
                    return (
                        <EmptyMessage 
                            message="No Selection" 
                            itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            }
        }
    }
}

UsersPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}
