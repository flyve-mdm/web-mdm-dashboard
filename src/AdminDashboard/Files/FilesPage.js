import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesContent from './FilesContent'
import FilesAdd from './FilesAdd'
import FilesEdit from './FilesEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class FilesPage extends Component {

    render() {
        if(this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {
                case "Edit":
                    return (
                        <FilesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi}
                        />
                    )
                case "Add":
                    return (
                        <FilesAdd
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
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
                        <FilesContent
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
                        <EmptyMessage
                            message="No Selection"
                            itemListPaneWidth={this.props.itemListPaneWidth}
                        />
                    )
                }
            } else {
                return (
                    <EmptyMessage
                        message="No Selection"
                        itemListPaneWidth={this.props.itemListPaneWidth} 
                    />
                )
            }
        }
    }
}
FilesPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
