import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Invitations from '../data/invitations.json'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'

export default class InvitationsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            list: new WinJS.Binding.List(Invitations.data)
        }
    }

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {item.data['PluginFlyvemdmInvitation.User.name']}
            </div>
        )
    })

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    // handleDelete = () => {
    //     let item = this.props.itemList
    //     let index = this.state.selectedItemList
    //     index.sort()
    //     index.reverse()
    //     index.forEach((i) => {
    //         item.splice(i, 1)
    //     })
    //     this.setState({
    //         selectedItem: [],
    //         selectionMode: false
    //     })
    //     this.props.changeItemList(this.props.location, { itemList: item, sort: this.props.sort })
    // }

    handleSelectionChanged = (eventObject) => {
        // let listView = eventObject.currentTarget.winControl
        // let index = listView.selection.getIndices()
        // setTimeout(function () {
        //     this.setState({ selectedItemList: index });
        //     this.props.onNavigate(index.length === 1 && !this.state.selectionMode ? [this.props.location[0], index[0]] : this.props.location);
        // }.bind(this), 0)
    }

    render() {
        return (
            <div>                
                <ReactWinJS.ToolBar className="listToolBar">

                    <ReactWinJS.ToolBar.Button
                        key="sort"
                        icon="sort"
                        label="Sort"
                        priority={1}
                        onClick={this.handleSort}
                    />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label="Refresh"
                        priority={1}
                    />
    
                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0}
                    />
        
                    {/* {this.state.selectionMode ? deleteCommand : null} */}
    
                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.state.selectionMode}
                    />
                </ReactWinJS.ToolBar>
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.state.list.dataSource}
                        itemTemplate={this.itemRenderer}
                        layout={this.state.layout}
                        selectionMode="single"
                        tapBehavior="directSelect" 
                        onContentAnimating={this.handleContentAnimating}
                        onSelectionChanged={this.handleSelectionChanged}
                    />
            </div>
        )
    }
}
InvitationsPage.propTypes = {

}
