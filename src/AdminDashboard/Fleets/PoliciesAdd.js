import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import Policies from '../data/policies.json'
import WinJS from 'winjs'

export default class FleetsAddPolicies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List(Policies.data).createGrouped(this.groupKey, this.groupData),
            layout: { type: WinJS.UI.ListLayout },
            itemSelected: null
        }
    }

    groupKey = (data) => {
        return data['PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename']
    }

    groupData = (data) => {
        return { title: this.groupKey(data) }
    }

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div style={{ padding: '14px', width: '100%'}}>
                {item.data['PluginFlyvemdmPolicy.name']}
            </div>
        )
    })

    render() {
        return (
            <div className="listPane" style={{ height: '100%', width: '100%', display: 'inline-block', verticalAlign: 'top' }}>
                <ReactWinJS.ListView
                    ref="listView"
                    className="contentListView win-selectionstylefilled"
                    style={{ height: '100%' }}
                    itemDataSource={this.state.list.dataSource}
                    groupDataSource={this.state.list.groups.dataSource}                    
                    itemTemplate={this.itemRenderer}
                    layout={this.state.layout}
                    selectionMode="single"
                    tapBehavior="directSelect"
                    onContentAnimating={this.handleContentAnimating}
                    onSelectionChanged={this.handleSelectionChanged}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                />
            </div>
        )
    }
}
