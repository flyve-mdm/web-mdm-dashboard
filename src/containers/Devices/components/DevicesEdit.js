import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DevicesEditItemList from './DevicesEditItemList'
import ContentPane from '../../../components/ContentPane'
import EmptyMessage from '../../../components/EmptyMessage'
import Loading from '../../../components/Loading'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItems],
            isLoading: false
        }
    }

    updateItemList = (index, name) => {
        let newItem = [...this.state.itemListEdit]

        //Find index of specific object using findIndex method.    
        let objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmAgent.id"] === index))

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

        this.setState({
            isLoading: true
        })

        if (itemListToSave.length > 0) {
            this.props.glpi.updateItem({ itemtype: "PluginFlyvemdmAgent", input: itemListToSave })
            .then((response) => {
                this.setState({
                    isLoading: false
                })
                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')
                this.props.setNotification({
                    title: 'Successfully',
                    body: 'Device successfully updated!',
                    type: 'success'
                })
            })
            .catch((error) => {
                if(error.length > 1) {
                    this.props.setNotification({
                        title: error[0],
                        body: error[1],
                        type: 'alert'
                    })
                }
                this.setState({
                    isLoading: false
                })
            })
        }
    }

    render() {
        if (this.props.selectedItems) {
            
            let renderComponent
            if (this.state.isLoading) {
                renderComponent = <Loading message="Loading..." />
            } else {
                renderComponent = this.props.selectedItems.map((item) => {                                
                    return (
                        <DevicesEditItemList
                            key={item["PluginFlyvemdmAgent.id"]}
                            updateItemList={this.updateItemList}
                            location={this.props.location}
                            currentItem={item}
                        />
                    )
                })
            }

            return(
                <ContentPane>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <button className="btn --primary" onClick={this.handleSaveDevices}>
                            Save
                        </button>
                    </div>
                    <div className="separator" />
                    {renderComponent}
                </ContentPane>
            )
            
        } else {
            return (
                <EmptyMessage message="No Selection"/>
            )
        }
    }
}
DevicesEdit.propTypes = {
    selectedItems: PropTypes.array,
    selectedIndex: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
