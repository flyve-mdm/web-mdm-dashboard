import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import ConstructInputs from '../../../components/Forms'
import { agentScheme } from '../../../components/Forms/Schemas'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"

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
                            params: {itemtype: 'PluginFlyvemdmFleet'},
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
            this.props.setNotification({
                title: 'Successfully',
                body: 'changes saved successfully',
                type: 'success'
            })
            this.props.changeAction('reload')
            this.props.changeSelectionMode(false)
        })
        .catch((error) => {
            this.setState({
                isLoading: false
            })
            if(error.length > 1) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
        })
    }
    
    render() {
        const componetRender = (
            <ContentPane>
                <Loading message={`${I18n.t('commons.loading')}...`} />
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
                    <ContentPane>
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
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
