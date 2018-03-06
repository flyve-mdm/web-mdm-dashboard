import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Inventory from './Inventory'
import Loader from '../../../../components/Loader'

class SystemReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agent: undefined,
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                agent: undefined,
                isLoading: false
            })
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {

        try {
            this.setState({
                isLoading: true
            })
            const agent = await this.props.glpi.getAnItem({ itemtype: 'PluginFlyvemdmAgent', id: this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'] })
            this.setState({
                isLoading: false,
                agent
            })
        } catch (error) {
            console.log(error)
        }
    }            

    render() {
        if (this.state.isLoading && !this.state.agent) {
            return (<Loader type="content"/>)
        } else if (!this.state.isLoading && this.state.agent){
            return (
                <div className="system-report">
                    <div className="title">Agent</div>
                    <div className="list-content">
                        <div className="list-col">ID</div>
                        <div className="list-col">{this.state.agent['id']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Name</div>
                        <div className="list-col">{this.state.agent['name']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Version</div>
                        <div className="list-col">{this.state.agent['version']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last contact</div>
                        <div className="list-col">{this.state.agent['last_contact']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last report</div>
                        <div className="list-col">{this.state.agent['last_report'] ? this.state.agent['last_report'] : 'N/A'}</div>
                    </div>

                    <Inventory 
                        selectedItemList={this.props.selectedItemList}
                        title='Fleet'
                        itemType='PluginFlyvemdmFleet'
                        itemID={this.state.agent['plugin_flyvemdm_fleets_id']}
                        fields={{id: 'ID', name: 'Name'}}
                        glpi={this.props.glpi}
                    />

                    <Inventory
                        selectedItemList={this.props.selectedItemList}
                        title='Device'
                        itemType='Computer'
                        itemID={this.state.agent['computers_id']}
                        fields={{ 
                            id: 'ID', 
                            name: 'Name',
                            uuid: 'UUID', 
                            date_creation: 'Creation', 
                            date_mod: 'Modification', 
                            computermodels_id: 'Model', 
                            computertypes_id: 'Type', 
                            manufacturers_id: 'Manufacturer', serial: 'Serial' }}
                        parameters={{ 
                            expand_dropdowns: true, 
                            with_devices: true, 
                            with_disks: true, 
                            with_softwares: true, 
                            with_connections: true, 
                            with_networkports: true }}
                        glpi={this.props.glpi}
                    />
                    
                </div>
            )
        } else {
            return (null)
        }
    }
}

SystemReport.propTypes = {
    selectedItemList: PropTypes.array.isRequired
}

export default SystemReport