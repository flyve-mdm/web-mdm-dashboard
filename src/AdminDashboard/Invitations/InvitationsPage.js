import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import InvitationsPendingPage from './InvitationsPendingPage'
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
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <div className="contentHeader">
                                <h2 className="win-h2 titleContentPane" > Enroll </h2>
                            </div>
                        </div>
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
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired
}
