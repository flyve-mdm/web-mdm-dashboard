import React, { Component } from "react"
import PropTypes from 'prop-types'
import UsersContent from './UsersContent'
import UsersEdit from './UsersEdit'
import UserEditOne from './UsersEditOne'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class UsersPage extends Component {
    
    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {
                case "Edit":
                    return (
                        <UsersEdit
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
                        <EmptyMessage
                            message="No Selection"
                            itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
            }
        } else {
            if (this.props.actionList === null) {
                const selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
                if (selectedItemList !== undefined) {
                    return (
                        <UsersContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
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
                    <UserEditOne
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        dataSource={this.props.dataSource}
                        location={this.props.location}
                        selectedIndex={this.props.selectedIndex}
                        changeActionList={this.props.changeActionList} />
                )
            }
        }
    }
}
UsersPage.propTypes = {
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
