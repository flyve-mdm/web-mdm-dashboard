import React, { Component } from 'react'
import Invitations from '../data/invitations.json'
import InvitationsLog from '../data/invitationsLog.json'
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
            sort: false
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

    handleDelete = () => {
        let item = this.state.list
        let index = this.state.selectedItemList
        index.sort()
        index.reverse()
        index.forEach((i) => {
            item.splice(i, 1)
        })
        this.setState({
            selectedItem: [],
            selectionMode: false,
            list: item
        })
    }
    
    handleToggleSelectionMode = () => {
        this.setState({ selectionMode: !this.state.selectionMode })
        // this.props.changeActionList(null)
        // this.props.onNavigate([this.props.location[0]])
        this.refs.listView.winControl.selection.clear()
    }
    
    changeSelectItem(item) {
        this.setState({selectedItemList: item})
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        setTimeout(function () {
            this.changeSelectItem(index)
        }.bind(this), 0)
    }

    handleSort = () => {
        let array = []
        this.state.list.map((value, index) =>
            array.push(value)
        )
        this.setState({list: ItemList("Invitation", array, this.state.sort), sort: !this.state.sort})
    }

    render() {
        if (this.state.selectionMode === false && this.state.selectedItemList.length === 1) {

            console.log(Invitations.data[this.state.selectedItemList[0]]['PluginFlyvemdmInvitation.id'])
            let log = []
            for (let index = 0; index < InvitationsLog.data.length; index++) {
                const element = InvitationsLog.data[index]
                if (element['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitation.id'] === Invitations.data[this.state.selectedItemList[0]]['PluginFlyvemdmInvitation.id']) {
                    log.push(element)
                }
            }

            if (log.length > 0) {
                let logList = new WinJS.Binding.List(log)
                let logRender = ReactWinJS.reactRenderer((item) => {
                    console.log(item)
                    return (
                        <div style={{ padding: '14px', width: '100%' }}>
                            <b>{item.data['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitationlog.event']}</b>
                            <br/>
                            {item.data['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitationlog.date_creation']}
                        </div>
                    )
                })
                return (
                     <div>
                        <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem([])}>
                            {'<'} Pending Invitation
                        </h2>
                        <ReactWinJS.ListView
                            ref="listView"
                            className="contentListView win-selectionstylefilled"
                            style={{ height: 'calc(100% - 48px)' }}
                            itemDataSource={logList.dataSource}
                            itemTemplate={logRender}
                            layout={this.state.layout}
                            onContentAnimating={this.handleContentAnimating}
                            selectionMode={'single'}
                        />
                     </div>
                )
            } else {
                return (
                    <div style={{height: '100%'}}>
                        <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem([])}>
                            {'<'} Pending Invitation
                        </h2>
                        <div style={{ display: 'flex', height: '70%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Logs Available</h1>
                        </div>
                    </div>
               )
            }
        } else {
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
}
InvitationsPage.propTypes = {
}
