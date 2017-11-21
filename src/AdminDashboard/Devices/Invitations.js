import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Invitations from '../data/invitations.json'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import ItemList from '../ItemList'

export default class InvitationsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            list: new WinJS.Binding.List(Invitations.data),
            selectedItemList: [],
            selectionMode: false,
            sort: true
        }
    }
    
    componentWillUnmount() {
        this.setState({ selectionMode: false, selectedItemList: [] })
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
    //     let item = this.state.list
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
    //     this.setState({list: })
    //     this.props.changeItemList(this.props.location, { itemList: item, sort: this.props.sort })
    // }

    handleToggleSelectionMode = () => {
        this.setState({ selectionMode: !this.state.selectionMode })
        // this.props.changeActionList(null)
        // this.props.onNavigate([this.props.location[0]])
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        this.setState({ selectedItemList: index })
        // this.props.onNavigate(index.length === 1 && !this.state.selectionMode ? [this.props.location[0], index[0]] : this.props.location)
    }

    handleSort = () => {
        let array = []
        this.state.list.map((value, index) =>
            array.push(value)
        )
        this.setState({list: ItemList(null, array, this.state.sort, false), sort: !this.state.sort})
    }


    render() {
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                priority={0}
                disabled={this.state.selectedItemList.length === 0}
                onClick={this.handleDelete}
            />
        )
        return (
            <div className="listPane" style={{ height: '100%', width: '100%', display: 'inline-block', verticalAlign: 'top' }}>
            
                <ReactWinJS.ToolBar layout={WinJS.UI.Orientation.vertical} className="listToolBar">

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
        
                    {this.state.selectionMode ? deleteCommand : null}
    
                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.state.selectionMode}
                        onClick={this.handleToggleSelectionMode}
                    />
                </ReactWinJS.ToolBar>
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.state.list.dataSource}
                        itemTemplate={this.itemRenderer}
                        layout={this.state.layout}
                        selectionMode={this.state.selectionMode ? 'multi' : 'single'}
                        tapBehavior={this.state.selectionMode ? 'toggleSelect' : 'directSelect'}
                        onContentAnimating={this.handleContentAnimating}
                        onSelectionChanged={this.handleSelectionChanged}
                    />
            </div>
        )
    }
}
InvitationsPage.propTypes = {

}
