import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import FleetsEditItemList from './FleetsEditItemList'
import ItemList from '../ItemList'

export default class FleetsNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemListArray: [this.item()]
        }
    }

    item = () => {
        return {
            "PluginFlyvemdmFleet.name": '',
            "PluginFlyvemdmFleet.id": 0,
            "PluginFlyvemdmFleet.PluginFlyvemdmTask.items_id": null,
            "PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype": null,
            "PluginFlyvemdmFleet.is_default": 1
        }
    }

    addFleet = () => {
        this.setState({
            itemListArray: [...this.state.itemListArray, this.item()]
        })
    }

    updateItemList = (index, name) => {
        var newItem = this.state.itemListArray
  
        var objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmFleet.id"] === index));

        newItem[objIndex]["PluginFlyvemdmFleet.name"] = name

        this.setState({
            itemListArray: newItem
        })
    }

    newFleet = () => {
        if (this.state.itemListArray.length > 0) {

            let array = this.props.dataSource.itemList.map((value, index) => {
                return value
            })
             
            array = [
                ...array,
                ...this.state.itemListArray
            ]

            this.props.changeDataSource(this.props.location, { itemList: ItemList(this.props.location[0], array, this.props.dataSource.sort), sort: this.props.dataSource.sort })
            this.props.changeCurrentItem(this.state.itemListArray[0])
            this.props.changeActionList('Add Tasks')
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        let renderComponent = []

        for (let index = 0; index < this.state.itemListArray.length; index++) {
            renderComponent = [
                ...renderComponent,
                <FleetsEditItemList
                    key={index}
                    updateItemList={this.updateItemList}
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    location={this.props.location}
                    currentItem={this.state.itemListArray[index]}
                    changeActionList={this.props.changeActionList} />
            ]
            
        }

        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > New {this.props.location[0]} </h2>
                    <button className="win-button win-button-primary" onClick={this.newFleet}>Save</button>
                </div>
                <div className="separator" />
                <div style={{ float: 'right', textAlign: 'center', display: 'inline-block', marginTop: '20px' }}>
                    <span className="addIcon" style={{ fontSize: '18px' }} onClick={this.addFleet}></span>
                </div>
                {renderComponent}
            </ContentPane>
        )
    }
}
FleetsNew.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    changeCurrentItem:  PropTypes.func,
    changeActionList: PropTypes.func.isRequired
}
