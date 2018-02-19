import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InvitationsPendingPage from './InvitationsPendingPage'
import Enroll from '../Devices/Enroll'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class InvitationsPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            if(this.props.actionList === null) {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            } else {
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
            }
        } else {

            const selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)

            return (
                <InvitationsPendingPage
                itemListPaneWidth={this.props.itemListPaneWidth}
                location={this.props.location}
                currentItem={selectedItemList} />
            )
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
