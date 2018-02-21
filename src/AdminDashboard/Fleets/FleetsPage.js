import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EmptyMessage from '../../Utils/EmptyMessage'
import FleetsNew from './FleetsNew'
import FleetsContent from './FleetsContent'
import PoliciesAdd from './PoliciesAdd'
import FleetsEdit from './FleetsEdit'

export default class FleetsPage extends Component {
    
    render() {
                console.log(this.props.selectedItemList)

        if (this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {

                case "Add":
                    return (
                        <FleetsNew
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            changeActionList={this.props.changeActionList}
                            changeCurrentItem={this.props.changeCurrentItem} 
                            showNotification={this.props.showNotification}
                        />
                    )
                case "Add Tasks":
                    return (
                        <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
                        />
                    )
                case "Add Policies":
                    return (
                        <PoliciesAdd />
                    )
                case "Edit":
                    return (
                        <FleetsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
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
                        <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
                        />
                    )
                } else {
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            } else {
                return (
                    <FleetsEdit
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.props.changeSelectionMode}
                        changeActionList={this.props.changeActionList}
                        showNotification={this.props.showNotification} 
                    />
                )
            }
        }
    }
}
FleetsPage.propTypes = {
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
    showNotification: PropTypes.func.isRequired
}