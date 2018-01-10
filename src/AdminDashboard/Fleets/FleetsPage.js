import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EmptyMessage from '../../Utils/EmptyMessage'
import FleetsNew from './FleetsNew'
import FleetsContent from './FleetsContent'
import PoliciesAdd from './PoliciesAdd'
import FleetsEdit from './FleetsEdit'

export default class FleetsPage extends Component {
    
    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {

                case "Add":
                    return (
                        <FleetsNew
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
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
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            currentItem={this.props.currentItem}
                            changeActionList={this.props.changeActionList} />
                    )
                case "Add Policies":
                    return (
                        <PoliciesAdd />
                    )
                case "Edit":
                    return (
                        <FleetsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} />
                    )
                default:
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
            }
            
        } else {
            if (this.props.actionList === null) {
                let selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
                if (selectedItemList !== undefined) {
                    return (
                        <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedIndex={this.props.selectedIndex}
                            currentItem={selectedItemList}
                            changeActionList={this.props.changeActionList} />
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
                        dataSource={this.props.dataSource}
                        changeDataSource={this.props.changeDataSource}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.props.changeSelectionMode}
                        changeActionList={this.props.changeActionList} />
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
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}