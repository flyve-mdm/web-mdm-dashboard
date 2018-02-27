import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InvitationsPendingPage from './InvitationsPendingPage'
import Enroll from '../Devices/Enroll'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class InvitationsPage extends Component {

    render() {
        if (this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {

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
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
            }
        } else {
            if (this.props.actionList === null) {

                if (this.props.selectedItemList.length > 0) {
                    return (
                        <InvitationsPendingPage
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            changeSelectionMode={this.props.changeSelectionMode}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi}  />
                    )
                } else {
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            } else {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            }
        }
    }
}
InvitationsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
