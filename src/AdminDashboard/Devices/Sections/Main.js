import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import IconItemList from '../../IconItemList'
import Confirmation from '../../../Utils/Confirmation'
import Loading from '../../../Utils/Loading'

class DangerZone extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        this.props.glpi.getAnItem('PluginFlyvemdmAgent', this.props.selectedItemList[0], { expand_dropdowns: true })
            .then((response) => {
                this.setState({
                    data: response
                })
            })
            .catch((error) => {

            })
    }

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
            this.props.showNotification('Success', 'element successfully removed')
        }
    }

    handleEdit = () => {
        this.props.changeActionList("EditOne")
    }
    
    render() {
        let renderComponent 
        if (this.state.data === undefined) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            renderComponent = (
            <div>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} />
                        <div className="contentStatus">
                            <div className="name">{this.state.data["name"]}</div>

                            <div className="message">
                                {
                                    this.state.data["is_online"] === 1 ? 'Online' : 'Offline'
                                }
                            </div>
                            <div className="source">{this.state.data["last_contact"]} last contact</div>
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
                                <div>{this.state.data["version"]}</div>
                            </div>
                        </li>
                        <li>
                            <div className="callContent">
                                <div className="title">Fleets</div>
                                <div>{this.state.data["plugin_flyvemdm_fleets_id"]}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.data["PluginFlyvemdmAgent.Computer.User.realname"]} reference={el => this.contentDialog = el} /> 
            </div>
            )
        }
        return renderComponent
    }
}

DangerZone.propTypes = {
    dataSource: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    selectedItemList: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default DangerZone