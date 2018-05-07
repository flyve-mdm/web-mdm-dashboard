import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EditMultiple from '../../../components/EditMultiple'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'

export default class DevicesEdit extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            FieldList: [{
                name: I18n.t('commons.fleet'),
                type: "select",
                DBName: "plugin_flyvemdm_fleets_id",
                params: {itemtype: itemtype.PluginFlyvemdmFleet, options: {forcedisplay: [2]}},
                method: 'searchItems',
                content: '1',
                value: '2'
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
                    itemtype: itemtype.PluginFlyvemdmAgent
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
