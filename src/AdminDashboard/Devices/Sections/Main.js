import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import IconItemList from '../../IconItemList'
import Confirmation from '../../../Utils/Confirmation'

class DangerZone extends Component {

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            let item = this.props.dataSource.itemList
            let index = this.props.selectedIndex
            index.sort()
            index.reverse()
            index.forEach((i) => {
                item.splice(i, 1)
            })

            this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
            this.props.onNavigate([this.props.location[0]])
        }
    }

    handleEdit = () => {
        this.props.changeActionList("EditOne")
    }
    
    render() {
        return (
            <div>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} />
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"]}</div>

                            <div className="message">
                                {
                                    this.props.selectedItemList["PluginFlyvemdmAgent.is_online"] === 1 ? 'Online' : 'Offline'
                                }
                            </div>
                            <div className="source">{this.props.selectedItemList["PluginFlyvemdmAgent.last_contact"]} last contact</div>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo">
                    <ul>
                        <li>
                            <div className="callContent">
                                <div className="title">Version</div>
                                <div>{this.props.selectedItemList["PluginFlyvemdmAgent.version"]}</div>
                            </div>
                        </li>
                        <li>
                            <div className="callContent">
                                <div className="title">Fleets</div>
                                <div>{this.props.selectedItemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"]} reference={el => this.contentDialog = el} /> 
            </div>
        )
    }
}

DangerZone.propTypes = {
    dataSource: PropTypes.object.isRequired,
    selectedIndex: PropTypes.array.isRequired,
    changeActionList: PropTypes.func.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    selectedItemList: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired
}

export default DangerZone