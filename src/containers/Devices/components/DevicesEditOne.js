import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import ConstructInputs from '../../../components/Forms'
import { agentScheme } from '../../../components/Forms/Schemas'
import Loading from '../../../components/Loading'

export default class DevicesEditOne extends Component {

    componentDidMount() {
        if (this.props.selectedItems) {
            this.handleRefresh()
        }
    }

    handleRefresh = () => {
        this.setState({
            isLoading: true
        })
        this.props.glpi.getAnItem({ itemtype: 'PluginFlyvemdmAgent', id: this.props.selectedItems[0]['PluginFlyvemdmAgent.id'] })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    id: response["id"],
                    name: response["name"],
                    fleet: {
                        value: response["plugin_flyvemdm_fleets_id"],
                        request: {
                            params: {itemtype: 'PluginFlyvemdmFleet'},
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
            this.props.setNotification('Success', 'changes saved successfully')
            this.props.changeAction(null)
            this.props.changeSelectionMode(false)
        })
        .catch((error) => {
            this.setState({
                isLoading: false
            })
            if(error.length > 1) {
                this.props.setNotification(error[0], error[1])
            }
        })
    }
    
    render() {
        const componetRender = (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <Loading message="Loading..." />
            </ContentPane>
        ) 

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
                            <button className="btn --primary" onClick={this.handleSaveOneDevices}>
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
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}
