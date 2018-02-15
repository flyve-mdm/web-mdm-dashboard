import React, { Component } from "react"
import PropTypes from 'prop-types'
import UsersContent from './UsersContent'
import UsersEdit from './UsersEdit'
import UserEditOne from './UsersEditOne'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class UsersPage extends Component {
    
    render() {
        if (this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {
                case "Edit":
                    return (
                        <UsersEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList}
                            showNotification={this.props.showNotification}
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
            if (this.props.actionList === null) {
                if (this.props.selectedItemList.length > 0) {
                    return (
                        <UsersContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList}
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
                switch (this.props.actionList) {
                    case "EditOne":
                    return (
                        <UserEditOne 
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location} 
                            onNavigate={this.props.onNavigate}
                            changeActionList={this.props.changeActionList}
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
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}
