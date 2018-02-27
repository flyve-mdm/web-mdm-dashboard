import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsContent from './ApplicationsContent'
import ApplicationsAdd from './ApplicationsAdd'
import ApplicationsEdit from './ApplicationsEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class ApplicationsPage extends Component {

    render() {
        if (this.props.selectedItemList === null || this.props.action === 'Edit') {
            switch (this.props.action) {
                case "Edit":
                    return (
                        <ApplicationsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeAction={this.props.changeAction}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi}
                        />
                    )
                case "Add":
                    return (
                        <ApplicationsAdd
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
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
                        <ApplicationsContent
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
ApplicationsPage.propTypes = {
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
ApplicationsPage.defaultProps = {
    selectedItemList: [],
    action: null
}
