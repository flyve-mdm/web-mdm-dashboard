import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DevicesEditItemList from './DevicesEditItemList'
import ContentPane from '../../Utils/ContentPane'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItemList]
        }
    }

    updateItemList = (index, name) => {
        let newItem = [...this.state.itemListEdit]

        //Find index of specific object using findIndex method.    
        let objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmAgent.id"] === index));

        //Update object's name property.
        newItem[objIndex]["PluginFlyvemdmAgent.name"] = name

        this.setState({
            itemListEdit: [...newItem]
        })
    }

    handleSaveDevices = () => {

        let itemListToSave = this.state.itemListEdit.map((item) => {
            return {
                id: item["PluginFlyvemdmAgent.id"],
                name: item["PluginFlyvemdmAgent.name"]
            }
        })

        if (itemListToSave.length > 0) {
            this.props.glpi.updateItem("PluginFlyvemdmAgent", null, itemListToSave)
            .then((response) => {
                this.props.changeSelectionMode(false)
                this.props.changeActionList(null)
                this.props.onNavigate([this.props.location[0]])
            })
            .catch((error) => {
                console.log(error)
                this.props.changeSelectionMode(false)
                this.props.changeActionList(null)
                this.props.onNavigate([this.props.location[0]])
            })
        }
    }

    render() {
        if (this.props.selectedItemList) {
            let renderComponent = this.props.selectedItemList.map((item) => {                                
                return (
                    <DevicesEditItemList
                    key={item["PluginFlyvemdmAgent.id"]}
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    updateItemList={this.updateItemList}
                    location={this.props.location}
                    currentItem={item}
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
    selectedItemList: PropTypes.array,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
