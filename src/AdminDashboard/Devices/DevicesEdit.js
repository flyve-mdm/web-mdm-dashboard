import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DevicesEditItemList from './DevicesEditItemList'
import ItemList from '../ItemList'
import ContentPane from '../../Utils/ContentPane'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListArray:[]
        }
    }

    componentWillMount() {
        let newArray = []

        this.props.dataSource.itemList.map((value, index) =>
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

        this.props.changeSelectionMode(false)
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeDataSource([this.props.location[0]], { itemList: ItemList(this.props.location[0], this.state.itemListArray), sort: this.props.dataSource.sort })
    }

    render() {

        let selectedItemList
        let selectedIndex = this.props.location.length === 2 ? this.props.location[1] : null

        if(selectedIndex) {

            let renderComponent = selectedIndex.map((index) => {
                selectedItemList = this.props.dataSource.itemList.getAt(index)                                
                    
                return (
                    <DevicesEditItemList
                    key={index}
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    updateItemList={this.updateItemList}
                    location={this.props.location}
                    currentItem={selectedItemList}
                    changeActionList={this.props.changeActionList} />
                )
            })

            return(
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <button className="win-button win-button-primary" onClick={this.handleSaveDevices}>
                            Save
                        </button>
                    </div>
                    <div className="separator" />
                    {renderComponent}
                </ContentPane>
            )
            
        } else {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }
    }
}
DevicesEdit.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
}
