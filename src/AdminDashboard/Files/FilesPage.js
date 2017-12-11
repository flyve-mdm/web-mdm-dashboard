import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesContent from './FilesContent'
import FilesAdd from './FilesAdd'
import FilesEdit from './FilesEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class FilesPage extends Component {

    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            if(this.props.actionList === null) {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            } else {
                switch (this.props.actionList) {
                    case "Edit":    
                        return (
                            <FilesEdit
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
                        <FilesAdd
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
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
                    <FilesContent
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
FilesPage.propTypes = {
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
