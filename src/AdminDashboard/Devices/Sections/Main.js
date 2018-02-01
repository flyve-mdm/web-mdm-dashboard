import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import IconItemList from '../../IconItemList'
import Confirmation from '../../../Utils/Confirmation'
import Loading from '../../../Utils/Loading'

class Main extends Component {

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
        this.props.glpi.getAnItem('PluginFlyvemdmAgent', this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'], null)
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

            let itemListToDelete = this.props.selectedItemList.map((item) => {
                return {
                    id: item["PluginFlyvemdmAgent.id"]
                }
            })

            this.setState({
                isLoading: true
            })

            this.props.glpi.deleteItem('PluginFlyvemdmAgent', null, itemListToDelete, null)
            .then((response) => {
                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeSelectionMode(false)
                this.props.onNavigate([this.props.location[0]])
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.showNotification(error[0], error[1])
                }
            })
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
            let imageAgent = this.state.data["mdm_type"] ? `${this.state.data["mdm_type"]}.png` : null
            let iconComponent 
            
            if (imageAgent) {
                iconComponent = <IconItemList image={imageAgent} size={72} backgroundColor="transparent"/>
            } else {
                iconComponent = <IconItemList size={72} />
            }
            renderComponent = (
            <div>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        {iconComponent}
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
                                <div className="title">Type</div>
                                <div>{this.state.data["mdm_type"]}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.data["name"]} reference={el => this.contentDialog = el} /> 
            </div>
            )
        }
        return renderComponent
    }
}

Main.propTypes = {
    dataSource: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    selectedItemList: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default Main