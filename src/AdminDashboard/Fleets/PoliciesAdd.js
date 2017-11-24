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
            itemSelected: null,
            suggestionList: Policies.data.map(function(policie) { return policie['PluginFlyvemdmPolicy.name'] }),
            selectedPolicies: []
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

    handleBack = () => {

    }

    handleSuggestionsRequested = (eventObject) => {
        let queryText = eventObject.detail.queryText,
            query = queryText.toLowerCase(),
            suggestionCollection = eventObject.detail.searchSuggestionCollection

        if (queryText.length > 0) {
            for (let i = 0, len = this.state.suggestionList.length; i < len; i++) {
                if (this.state.suggestionList[i].substr(0, query.length).toLowerCase() === query) {
                    suggestionCollection.appendQuerySuggestion(this.state.suggestionList[i])
                }
            }
        }
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let policiesName = listView.selection.getItems()._value[0].data['PluginFlyvemdmPolicy.name']

        let isValid = true
        this.state.selectedPolicies.forEach(selectedPolicy => {
            if (selectedPolicy === policiesName) isValid = false
        })
        if (isValid) this.setState({ selectedPolicies: [...this.state.selectedPolicies,  policiesName] })
    }

    handleQuerySubmitted = (eventObject) => {
        let isValid = true
        this.state.selectedPolicies.forEach(selectedPolicy => {
            if (selectedPolicy === eventObject.detail.queryText) isValid = false
        })
        let isExists = false
        Policies.data.forEach(policiy => {
            if (policiy['PluginFlyvemdmPolicy.name'] === eventObject.detail.queryText) isExists = true
        })
        if (isValid && isExists) {
            document.querySelectorAll('[type="search"]')[0].value = ''            
            this.setState({ selectedPolicies: [...this.state.selectedPolicies, eventObject.detail.queryText] })
        }
        
    }

    render() {
        console.log(this.state.selectedPolicies)
        return (
            <div className="listPane" style={{ height: '100%', width: '100%', display: 'inline-block', verticalAlign: 'top' }}>
                <button style={{display: 'inline-block'}} className="win-backbutton" onClick={this.handleBack} />
                <h2 className="win-h2 titleContentPane" style={{ margin: '20px', display: 'inline-block'}} > Add Policy </h2>
                <ReactWinJS.AutoSuggestBox
                    style={{ margin: '20px'}}
                    placeholderText="Type a policy"
                    onSuggestionsRequested={this.handleSuggestionsRequested}
                    onQuerySubmitted={this.handleQuerySubmitted} />
                
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
