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
        if (this.props.selectedItems !== prevProps.selectedItems) {
            this.setState({
                data: undefined
            })
            this.handleRefresh()
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id) {
            this.setState({
                data: undefined
            }, () => this.handleRefresh())
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
            this.setState({ 
                data: await this.props.glpi.getAnItem({ 
                    itemtype: 'PluginFlyvemdmAgent', 
                    id: this.props.id 
                }) 
            })
        } catch (error) {
            this.props.setNotification({
                title: "Error",
                body: "There was a problem loading the data of this device",
                type: "alert"
            }) 
            this.props.history.push("/app/devices")
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item["PluginFlyvemdmAgent.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            
            this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmAgent', input: itemListToDelete })
            .then((response) => {
                this.props.setNotification({
                    title: 'Successfully',
                    body: 'Device successfully removed',
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.history.goBack()
                this.props.changeAction('reload')
            })
            .catch((error) => {
                if (error.length > 1) {
                    this.props.setNotification({
                        title: error[0],
                        body: error[1],
                        type: 'alert'
                    })
                }
            })
        }
    }

    handleEdit = () => {
        const location = `${this.props.history.location.pathname}/edit`
        this.props.history.push(location)
    }

    ping = () => {
        this.setState({
            sendingPing: true
        }, async () => {
            try {
                const response = await this.props.glpi.genericRequest({
                    path: `PluginFlyvemdmAgent/${this.props.id}`,
                    requestParams: {
                        method: 'PUT',
                        body: JSON.stringify({"input":{"_ping": ""}})
                    }
                })
                this.props.setNotification({
                    title: 'Successfully',
                    body: response[0].message ? response[0].message : "Ping sent",
                    type: 'success'
                })
                this.setState({ sendingPing: false }, () => {
                    this.handleRefresh()
                })
            } catch (error) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
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
            <div className="devices">
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
                                        <button className="btn --primary" style={{float:'left', marginTop: 5, marginBottom: 5}} onClick={this.ping}>
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
                            <div className="detailContent">
                                <div className="title">Version</div>
                                <div>{this.state.data["version"]}</div>
                            </div>
                        </li>
                        <li>
                            <div className="detailContent">
                                <div className="title">Type</div>
                                <div>{this.state.data["mdm_type"]}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <Confirmation 
                    title="Delete devices" 
                    message={this.state.data["name"]} 
                    reference={el => this.contentDialog = el} 
                /> 
            </div>
            )
        }
        return renderComponent
    }
}
Main.propTypes = {
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
}