import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import DevicesEditItemList from './DevicesEditItemList'
import ItemList from '../ItemList'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListArray:[]
        }
    }

    componentWillMount() {
        let newArray = []

        this.props.itemList.map((value, index) =>
            newArray.push(value)
        )

        this.setState({
            itemListArray: newArray
        })
    }

    updateItemList = (index, name) => {
        let newItem = this.state.itemListArray

        //Find index of specific object using findIndex method.    
        let objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmAgent.id"] === index));

        //Update object's name property.
        newItem[objIndex]["PluginFlyvemdmAgent.Computer.User.realname"] = name

        this.setState({
            itemListArray: newItem
        })
    }

    handleSaveDevices = () => {

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
                    <DevicesEditItemList
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
                        <button className="win-button win-button-primary" onClick={this.handleSaveDevices}>
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
DevicesEdit.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired

    // location= PropTypes.
}