import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import ConstructInputs from '../../Utils/Forms'
import { agentScheme } from '../../Utils/Forms/Schemes'
import Loading from '../../Utils/Loading'

export default class DevicesEditOne extends Component {

    componentDidMount() {
        if (this.props.selectedItemList) {
            this.handleRefresh()
        }
    }

    handleRefresh = () => {
        this.setState({
            isLoading: true
        })
        this.props.glpi.getAnItem({ itemtype: 'PluginFlyvemdmAgent', id: this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'] })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    id: response["id"],
                    name: response["name"],
                    fleet: {
                        value: response["plugin_flyvemdm_fleets_id"],
                        request: {
                            params: ['PluginFlyvemdmFleet', null],
                            method: 'getAllItems',
                            content: 'name',
                            value: 'id'
                        }
                    }
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    id: null,
                    name: '',
                    fleet: {
                        value: '',
                        request: {
                            params: ['PluginFlyvemdmFleet', null],
                            method: 'getAllItems',
                            content: 'name',
                            value: 'id'
                        }
                    }
                })
            })
    }

    changeState = (name, value) => {
        if(name === 'fleet') {
            this.setState({
                [name]: {...this.state[name], value}
            })
        } else {
            this.setState({
                [name]: value
            })
        }   
    }

    handleSaveOneDevices = () => {
        this.setState({
            isLoading: true
        })
        const input = {
            name: this.state.name,
            plugin_flyvemdm_fleets_id: this.state.fleet.value
        }
        this.props.glpi.updateItem({itemtype: 'PluginFlyvemdmAgent', id: this.state.id, input})
        .then(() => {
            this.props.showNotification('Success', 'changes saved successfully')
            this.props.changeAction(null)
            this.props.changeSelectionMode(false)
        })
        .catch((error) => {
            this.setState({
                isLoading: false
            })
            if(error.length > 1) {
                this.props.showNotification(error[0], error[1])
            }
        })
    }
    
    render() {
        const componetRender = (<ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
            <div className="contentHeader">
                <h2 className="win-h2 titleContentPane" > Edit Device</h2>
            </div>
            <div className="separator" />
            <Loading message="Loading..." />
        </ContentPane>) 

        if(!this.state) {
            return componetRender
        } else {
            const agent = this.state.name ? agentScheme({
                state: this.state, 
                changeState: this.changeState,
                glpi: this.props.glpi
            }) : null

            if(agent && !this.state.isLoading) {
                return (
                    <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane" > Edit Device</h2>
                            <button className="win-button win-button-primary" onClick={this.handleSaveOneDevices}>
                                Save
                            </button>
                        </div>
                        <div className="separator" />
                        <ConstructInputs data={agent.mainInformation} />
                    </ContentPane>
                )
            } else {
                return componetRender
            }   
        }
    }
}
DevicesEditOne.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
