import React, { Component } from "react"
import PropTypes from 'prop-types'
import UsersContent from './UsersContent'
import UsersEdit from './UsersEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class UsersPage extends Component {
    
    render() {
        if (this.props.selectedIndex === null) {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        } else {
            if (this.props.actionList !== null) {
                switch (this.props.actionList) {
                    
                    case "Edit":
                        return (
                            <UsersEdit
                                itemListPaneWidth={this.props.itemListPaneWidth}
                                dataSource={this.props.dataSource}
                                selectedIndex={this.props.selectedIndex}
                                changeActionList={this.props.changeActionList} />
                        )
                    default: 
                        return (
                            <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                        )
                }
            } else {
                
                return (
                    <UsersContent 
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        dataSource={this.props.dataSource}
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