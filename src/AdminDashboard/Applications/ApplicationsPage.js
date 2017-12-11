import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsContent from './ApplicationsContent'
import ApplicationsAdd from './ApplicationsAdd'
import ApplicationsEdit from './ApplicationsEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class ApplicationsPage extends Component {

    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            if (this.props.actionList === null) {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            } else {
                switch (this.props.actionList) {
                    case "Edit":    
                        return (
                            <ApplicationsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} />
                        )
                    case "Add":
                        return (
                            <ApplicationsAdd
                                itemListPaneWidth={this.props.itemListPaneWidth}
                                location={this.props.location}
                                dataSource={this.props.dataSource}
                                changeDataSource={this.props.changeDataSource}
                                changeActionList={this.props.changeActionList} />
                        )
                    default:
                        return (
                            <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                        )
                }
            }
        } else {
            let selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
            
            if(selectedItemList !== undefined) {
                return (
                    <ApplicationsContent
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
        }
    }
}
ApplicationsPage.propTypes = {
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
