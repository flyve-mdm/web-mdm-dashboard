import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Inventory from './Inventory'
import Loader from '../../../../components/Loader'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'

export default class SystemReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            isLoading: false
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id) {
            this.setState({
                data: undefined,
                isLoading: false
            }, () => this.handleRefresh())
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh =  () => {
        this.setState({
            isLoading: true
        }, async () => {
            try {
                this.setState({
                    isLoading: false,
                    data: await this.props.glpi.getAnItem({ 
                        itemtype: itemtype.PluginFlyvemdmAgent, 
                        id: this.props.id 
                    })
                })
            } catch (error) {
                this.props.setNotification(this.props.handleError({ type: 'alert', error: error }))
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
    setNotification: PropTypes.func.isRequired
}
