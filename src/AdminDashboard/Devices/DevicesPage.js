import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Enroll from './Enroll'
import DevicesEdit from './DevicesEdit'
import DevicesEditOne from './DevicesEditOne'
import DevicesContent from './DevicesContent'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class DevicesPage extends Component {
    
    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {
                case "Edit":
                    return (
                        <DevicesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            onNavigate={this.props.onNavigate}
                            location={this.props.location}
                            itemList={this.props.itemList}
                            changeItemList={this.props.changeItemList}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} />
                    )
                case "Add":
                    return (
                        <Enroll
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            changeActionList={this.props.changeActionList} />
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
                const selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
                if (selectedItemList !== undefined) {
                    return (
                        <DevicesContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            selectedIndex={this.props.selectedIndex}
                            selectedItemList={selectedItemList}
                            changeActionList={this.props.changeActionList} />
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
                        location={this.props.location}    
                        itemList={this.props.itemList}
                        changeActionList={this.props.changeActionList} />
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
    selectedIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    location: PropTypes.array.isRequired,
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired
}
