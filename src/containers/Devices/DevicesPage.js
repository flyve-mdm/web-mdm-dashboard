import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Enroll from './Enroll'
import DevicesEdit from './DevicesEdit'
import DevicesEditOne from './DevicesEditOne'
import DevicesContent from './DevicesContent'
import EmptyMessage from '../../components/EmptyMessage'

export default class DevicesPage extends Component {
    
    render() {
        if (!this.props.selectedItemList || this.props.action === 'Edit') {
            switch (this.props.action) {
                case "Edit":
                    return (
                        <DevicesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeAction={this.props.changeAction}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi} 
                            />
                    )
                case "Add":
                    return (
                        <Enroll
                            itemListPaneWidth={this.props.itemListPaneWidth}
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
        } else {
            if (!this.props.action) {
                
                if (this.props.selectedItemList.length > 0) {
                    return (
                        <DevicesContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            action={this.props.action}
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
                        <DevicesEditOne 
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
DevicesPage.propTypes = {
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
    glpi: PropTypes.object.isRequired
}
