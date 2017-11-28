import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import InvitationsPendingPage from './InvitationsPendingPage'

export default class FilesPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            if(this.props.actionList === null) {
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                        </div>
                    </div>
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
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                            </div>
                        </div>
                    )
                }
            }
        } else {

            const selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)

            return (
                <InvitationsPendingPage
                itemListPaneWidth={this.props.itemListPaneWidth}
                location={this.props.location}
                currentItem={selectedItemList} />
            )
        }
    }
}
FilesPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.number,
    itemList: PropTypes.object.isRequired
}
