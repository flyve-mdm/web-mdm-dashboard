import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Inventory from './Inventory'
import Loader from '../../../../components/Loader'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'
import Loading from '../../../../components/Loading'

export default class SystemReport extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            update: this.props.update,
            data: undefined,
            isLoading: true,
            requestingInventory: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
            return {
                ...prevState,
                id: nextProps.id,
                update: nextProps.update,
                data: undefined,
                isLoading: true
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        if (this.state.update) {
            this.setState({
                isLoading: true,
                requestingInventory: false
            }, async () => {
                try {
                    this.setState({
                        isLoading: false,
                        data: await this.props.glpi.getAnItem({ 
                            itemtype: itemtype.PluginFlyvemdmAgent, 
                            id: this.state.id 
                        })
                    })
                } catch (error) {
                    this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                }
            })
        }
    }      
    
    requestInventory = () => {
        this.setState({
            requestingInventory: true
        }, async () => {
            try {
                const response = await this.props.glpi.genericRequest({
                    path: `${itemtype.PluginFlyvemdmAgent}/${this.state.id}`,
                    requestParams: {
                        method: 'PUT',
                        body: JSON.stringify({"input":{"_inventory": ""}})
                    }
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message,
                    type: 'success'
                }) 
                this.handleRefresh() 
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))   
                this.setState({
                    requestingInventory: false
                })             
            }
        })
    }

    render() {
        if (this.state.isLoading && !this.state.data) {
            return (<div style={{padding:'20px'}}><Loader type="content"/></div>)
        } else if (!this.state.isLoading && this.state.data){
            return (
                <div className="devices">
                    <div className="system-report">
                        <div className="request-inventory">
                            <button className="btn btn--secondary" onClick={this.requestInventory}>
                                {I18n.t('devices.system_report.request_inventory')}
                            </button>
                            {this.state.requestingInventory ? <Loading small style={{paddingTop: '6px'}}/> : ""}
                        </div>
                        <div className="title">
                            {I18n.t('commons.agent')}
                        </div>
                        <div className="list-content">
                            <div className="list-col">
                                {I18n.t('commons.id')}
                            </div>
                            <div className="list-col">{this.state.data['id']}</div>
                        </div>
                        <div className="list-content">
                            <div className="list-col">
                                {I18n.t('commons.name')}
                            </div>
                            <div className="list-col">{this.state.data['name']}</div>
                        </div>
                        <div className="list-content">
                            <div className="list-col">
                                {I18n.t('commons.version')}
                            </div>
                            <div className="list-col">{this.state.data['version']}</div>
                        </div>
                        <div className="list-content">
                            <div className="list-col">
                                {I18n.t('commons.last_contact')}
                            </div>
                            <div className="list-col">{this.state.data['last_contact']}</div>
                        </div>
                        <div className="list-content">
                            <div className="list-col">
                                {I18n.t('commons.last_report')}
                            </div>
                            <div className="list-col">{this.state.data['last_report'] ? this.state.data['last_report'] : 'N/A'}</div>
                        </div>

                        <Inventory 
                            title={I18n.t('commons.fleet')}
                            itemType='PluginFlyvemdmFleet'
                            itemID={this.state.data['plugin_flyvemdm_fleets_id']}
                            fields={{id: 'ID', name: 'Name'}}
                            glpi={this.props.glpi}
                        />

                        <Inventory
                            title={I18n.t('commons.device')}
                            itemType='Computer'
                            itemID={this.state.data['computers_id']}
                            fields={{ 
                                id: 'ID', 
                                name: 'Name',
                                uuid: 'UUID', 
                                date_creation: 'Creation', 
                                date_mod: 'Modification', 
                                computermodels_id: 'Model', 
                                computertypes_id: 'Type', 
                                manufacturers_id: 'Manufacturer', 
                                serial: 'Serial' 
                            }}
                            parameters={{ 
                                expand_dropdowns: true, 
                                with_devices: true, 
                                with_disks: true, 
                                with_softwares: true, 
                                with_connections: true, 
                                with_networkports: true 
                            }}
                            glpi={this.props.glpi}
                        />
                    </div>
                </div>
            )
        } else {
            return ""
        }
    }
}
SystemReport.propTypes = {
    id: PropTypes.string.isRequired,
    glpi: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    update: PropTypes.bool.isRequired
}
