import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Enroll from './Enroll'
import DevicesEdit from './DevicesEdit'
import DevicesEditOne from './DevicesEditOne'
import DevicesContent from './DevicesContent'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class DevicesPage extends Component {
    
    render() {
        if (this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {
                case "Edit":
                    return (
                        <DevicesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList}
                            showNotification={this.props.showNotification} />
                    )
                case "Add":
                    return (
                        <Enroll
                            itemListPaneWidth={this.props.itemListPaneWidth}
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
        } else {
            if (this.props.actionList === null) {
                
                if (this.props.selectedItemList.length > 0) {
                    return (
                        <DevicesContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi} />
                    )
                } else {
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            } else {
                return (
                    <DevicesEditOne 
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        dataSource={this.props.dataSource}
                        location={this.props.location}    
                        changeActionList={this.props.changeActionList}
                        showNotification={this.props.showNotification} 
                    />
                )
            }
        }
    }
}
DevicesPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
