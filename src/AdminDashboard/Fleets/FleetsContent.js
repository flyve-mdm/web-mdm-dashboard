import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import Confirmation from '../../Utils/Confirmation'

export default class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
        }
    }

    deletePolicy = (policy) => {
        // const index = this.state.list.indexOf(policy)
        // this.setState({
            // list: [
                // ...this.state.list.slice(0, index),
                // ...this.state.list.slice(index+1)
            // ]
        // })
    }

    changeInput = (e) => {
        // const newArray = this.state.list.map(element => {
            // if (element['PluginFlyvemdmPolicy.id'].toString() === e.target.name) {
                // const editElement = { 
                    // ...element,
                    // 'PluginFlyvemdmPolicy.default_value': e.target.value
                // }
                // return editElement
            // }
            // return element
        // })
// 
        // this.setState({ list: newArray })
    }

    editPolicy = (name, value) => {
        // const newArray = this.state.list.map(element => {
        //     if (element['PluginFlyvemdmPolicy.id'] === name) {
        //         const editElement = { 
        //             ...element,
        //             'PluginFlyvemdmPolicy.default_value': value
        //         }
        //         return editElement
        //     }
        //     return element
        // })

        // this.setState({ list: newArray })
    }

    handleAddPolicy = () => {
        // this.setState({ addPolicy: true })
    }

    handleSuggestionsRequested = (eventObject) => {
        // let queryText = eventObject.detail.queryText,
        //     query = queryText.toLowerCase(),
        //     suggestionCollection = eventObject.detail.searchSuggestionCollection

        // if (queryText.length > 0) {
        //     for (let i = 0, len = this.state.suggestionList.length; i < len; i++) {
        //         if (this.state.suggestionList[i].toLowerCase().indexOf(query) !== -1) {
        //             suggestionCollection.appendQuerySuggestion(this.state.suggestionList[i])
        //         }
        //     }
        // }
    }

    componentWillReceiveProps (newProps) {
        // let policies = newProps.currentItem['PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype']
        // this.setState({addPolicy: false, list: policies})
    }

    handleQuerySubmitted = (eventObject) => {
        // if (!this.state.list) this.setState({ list: []})
        // let isValid = true
        // this.state.list.forEach(policy => {
            // if (policy['PluginFlyvemdmPolicy.name'] === eventObject.detail.queryText) isValid = false
        // })
        // let isExists = false
        // Policies.data.forEach(policiy => {
            // if (policiy['PluginFlyvemdmPolicy.name'] === eventObject.detail.queryText) isExists = true
        // })
        // if (isValid && isExists) {
            // for (let index = 0; index < Policies.data.length; index++) {
                // const policy = Policies.data[index]
                // if(policy['PluginFlyvemdmPolicy.name'] === eventObject.detail.queryText) { 
                    // document.querySelectorAll('[type="search"]')[0].value = ''
                    // this.setState({ 
                        // list: [
                            // ...this.state.list,
                            // policy
                        // ],
                        // addPolicy: false
                    // })
                // }
            // } 
        // }
    }

    handleEdit = () => {
        // this.props.changeActionList("EditOne")
    }

    handleDelete = async () => {
        //const isOK = await Confirmation.isOK(this.contentDialog)
        //if (isOK) {
        //    let item = this.props.dataSource.itemList
        //    let index = this.props.selectedIndex
        //    index.sort()
        //    index.reverse()
        //    index.forEach((i) => {
        //        item.splice(i, 1)
        //    })
//
        //    this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
        //    this.props.onNavigate([this.props.location[0]])
        //    this.props.showNotification('Success', 'deleted fleet')
        //}
    }

    render() {
        let renderComponent
        if (this.props.policiesData) {
            renderComponent = this.props.policiesData.map((item, index) => {
                return (
                    <FleetsTaskItemList
                        key={[item['PluginFlyvemdmPolicy.name'], index].join("_")}
                        data={item} 
                        deletePolicy={this.deletePolicy}
                        changeInput={this.changeInput}
                        editPolicy={this.editPolicy} />
                )
            })
        }

        return ( 
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList[0]["PluginFlyvemdmFleet.name"]}</div>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo" style={{ width: '100%', marginTop: '20px', marginBottom: '20px', display: 'inline-block' }} >
                    <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                </div>

                { renderComponent }

                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList[0]["PluginFlyvemdmFleet.name"]} reference={el => this.contentDialog = el} />
            </ContentPane>
        )
    }
}
FleetsContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    policiesData: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired
}