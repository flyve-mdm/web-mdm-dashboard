import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconItemList from '../../../../components/IconItemList'
import Confirmation from '../../../../components/Confirmation'
import Loading from '../../../../components/Loading'

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            sendingPing: false
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.data.selectedItems !== prevProps.data.selectedItems) {
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
        this.props.data.glpi.getAnItem({ itemtype: 'PluginFlyvemdmAgent', id: this.props.data.selectedItems[0]['PluginFlyvemdmAgent.id'] })
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

            let itemListToDelete = this.props.data.selectedItems.map((item) => {
                return {
                    id: item["PluginFlyvemdmAgent.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            
            this.props.data.glpi.deleteItem({ itemtype: 'PluginFlyvemdmAgent', input: itemListToDelete })
            .then((response) => {
                this.props.data.showNotification('Success', 'elements successfully removed')
                this.props.data.changeSelectionMode(false)
                this.props.data.history.goBack()
                this.props.data.changeAction('reload')
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.data.showNotification(error[0], error[1])
                }
            })
        }
    }

    handleEdit = () => {
        this.props.data.changeAction("EditOne")
    }

    ping = () => {
        this.setState({
            sendingPing: true
        }, async () => {
            try {
                const response = await this.props.data.glpi.genericRequest({
                    path: `PluginFlyvemdmAgent/${this.props.data.selectedItems[0]['PluginFlyvemdmAgent.id']}`,
                    requestParams: {
                        method: 'PUT',
                        body: JSON.stringify({"input":{"_ping": ""}})
                    }
                })
                this.props.data.showNotification('Success', response[0].message ? response[0].message : "Ping sent")
                this.setState({ sendingPing: false }, () => {
                    this.handleRefresh()
                })
            } catch (error) {
                this.props.data.showNotification(error[0], error[1])
                this.setState({ sendingPing: false })
            }
        })
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
                    <div className="itemInfo">
                        {iconComponent}
                        <div className="contentStatus">
                            <div className="name">{this.state.data["name"]}</div>

                            <div className="message">
                                {
                                    this.state.data["is_online"] === 1 ? 'Online' : 'Offline'
                                }
                            </div>
                            <div className="source">
                                {this.state.data["last_contact"]} 
                                &nbsp; last contact
                            </div>   
                            <div style={{overflow: 'auto'}}>
                                <div>
                                    <button className="win-button win-button-primary" style={{float:'left', marginTop: 5, marginBottom: 5}} onClick={this.ping}>
                                        PING
                                    </button>
                                </div>       

                                { this.state.sendingPing ? <Loading small/> : '' }
                            </div>
                            <div>
                                <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                                <span className="deleteIcon" onClick={this.handleDelete} />
                            </div>
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
                <Confirmation title={`Delete devices`} message={this.state.data["name"]} reference={el => this.contentDialog = el} /> 
            </div>
            )
        }
        return renderComponent
    }
}
Main.propTypes = {
    data: PropTypes.shape({
        action: PropTypes.string,
        changeAction: PropTypes.func.isRequired,
        setNotification: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        glpi: PropTypes.object.isRequired
    })
}