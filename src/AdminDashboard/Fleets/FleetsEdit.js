import React, { Component } from 'react'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import FleetsEditItemList from './FleetsEditItemList'
import ItemList from '../ItemList'

export default class FleetsEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListArray:[]
        }
    }

    componentWillMount() {
        var newArray = []

        this.props.itemList.map((value, index) =>
            newArray.push(value)
        )

        this.setState({
            itemListArray: newArray
        })
    }

    updateItemList = (index, name) => {
        var newItem = this.state.itemListArray

        //Find index of specific object using findIndex method.    
        var objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmFleet.id"] === index));

        //Update object's name property.
        newItem[objIndex]["PluginFlyvemdmFleet.name"] = name

        this.setState({
            itemListArray: newItem
        })
    }

    handleSaveFleets = () => {

        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeItemList([this.props.location[0]], { itemList: ItemList(this.props.location[0], this.state.itemListArray) })
    }

    render() {

        let selectedItemList
        let selectedIndex = this.props.location.length === 2 ? this.props.location[1] : null

        if(selectedIndex) {

            let renderComponent = selectedIndex.map((index) => {
                selectedItemList = this.props.itemList.getAt(index)                                
                return (
                    <FleetsEditItemList
                    key={index}
                    updateItemList={this.updateItemList}
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    location={this.props.location}
                    currentItem={selectedItemList}
                    changeActionList={this.props.changeActionList} />
                )
            })

            return(
                <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <button className="win-button win-button-primary" onClick={this.handleSaveFleets}>
                            Save
                        </button>
                    </div>
                    <div className="separator" />
                    {renderComponent}
                </div>
            )

            
        } else {
            return (
                <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
                )
    
        }
    }
}
