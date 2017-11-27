import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import Policies from '../data/policies.json'
import ItemList from '../ItemList'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'

export default class FleetsContent extends Component {

    constructor(props) {
        super(props)
        let policies = this.props.currentItem['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype']
        this.state = {
            suggestionList: Policies.data.map(function(policy) { return policy['PluginFlyvemdmPolicy.name'] }),
            list: policies,
            selectedPolicies: [],            
            layout: { type: WinJS.UI.ListLayout },
            addPolicy: false
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <FleetsTaskItemList
            key={ItemList.data['PluginFlyvemdmPolicy.name']}
            data={ItemList.data} />
        )
    })

    handleAddPolicy = () => {
        this.setState({ addPolicy: true })
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

    componentWillReceiveProps (newProps) {
        let policies = newProps.currentItem['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype']
        this.setState({addPolicy: false, list: new WinJS.Binding.List(policies)})
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
            let array = this.props.itemList.map((item) => {
                    if (item['PluginFlyvemdmFleet.id'] === this.props.currentItem['PluginFlyvemdmFleet.id']) {
                        for (let index = 0; index < Policies.data.length; index++) {
                            const element = Policies.data[index]
                            if(element['PluginFlyvemdmPolicy.name'] === eventObject.detail.queryText) {
                                if (Array.isArray(item['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype'])) {
                                    item['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype'] = [
                                        ...item['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype'], 
                                        element
                                    ]
                                    item['PluginFlyvemdmFleet.PluginFlyvemdmTask.items_id'] = [
                                        ...item['PluginFlyvemdmFleet.PluginFlyvemdmTask.items_id'],
                                        element['PluginFlyvemdmPolicy.id']
                                    ]
                                } else {
                                    item['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype'] = [ element ]
                                    item['PluginFlyvemdmFleet.PluginFlyvemdmTask.items_id'] = [ element['PluginFlyvemdmPolicy.id'] ]
                                }
                            }
                        }
                        return item
                    }
                    return item
                })
            this.props.changeItemList(this.props.location, { itemList: ItemList(this.props.location[0], array) })
            
        }
        
    }

    render() {
        let addPolicy = <span/>
        if (this.state.addPolicy) {
            addPolicy = <ReactWinJS.AutoSuggestBox
                        style={{ margin: '20px'}}
                        placeholderText="Type a policy"
                        onSuggestionsRequested={this.handleSuggestionsRequested}
                        onQuerySubmitted={this.handleQuerySubmitted} />
        } else {
            addPolicy = (
                <div style={{ float: 'right', textAlign: 'center', display: 'inline-block' }}>
                    <span className="addIcon" style={{ fontSize: '18px' }} onClick={this.handleAddPolicy}></span>
                </div>
            )
        }

        let renderComponent

        if (this.state.list) {
            renderComponent = this.state.list.map(function (item, index) {
                return (
                    <FleetsTaskItemList
                        key={[item['PluginFlyvemdmPolicy.name'], index].join("_")}
                        data={item} />
                )
            })
        }

        return ( 
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} />
                        <div className="contentStatus">
                            <div className="name">{this.props.currentItem["PluginFlyvemdmFleet.name"]}</div>
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo" style={{ width: '100%', marginTop: '20px', display: 'inline-block' }} >
                    <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                    { addPolicy }
                </div>
                { renderComponent }
            </div>
        )
    }
}