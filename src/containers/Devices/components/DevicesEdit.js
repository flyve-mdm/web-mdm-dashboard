import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditMultiple from '../../../components/EditMultiple'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            FieldList: [{
                name: "Fleet",
                type: "select",
                DBName: "plugin_flyvemdm_fleets_id",
                params: {itemtype: 'PluginFlyvemdmFleet'},
                method: 'getAllItems',
                content: 'name',
                value: 'id'
            }]
        }
    }
    render() {
        return (
            <EditMultiple 
                selectedItems={this.props.selectedItems}
                FieldList={this.state.FieldList}
                changeAction={this.props.changeAction}
                changeSelectionMode={this.props.changeSelectionMode}
                history={this.props.history}
                setNotification={this.props.setNotification}
                glpi={this.props.glpi}
                request={{
                    id: 'PluginFlyvemdmAgent.id',
                    itemtype: 'PluginFlyvemdmAgent'
                }}
            />
        )
    }
}
DevicesEdit.propTypes = {
    selectedItems: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
