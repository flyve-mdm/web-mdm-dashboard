import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EditMultiple from '../../../components/EditMultiple'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'

class FleetsEdit extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            FieldList: [
                {
                    name: I18n.t('commons.child_entities'),
                    type: "select",
                    DBName: "is_recursive",
                    options: [
                        {name: I18n.t('commons.yes'), value: true},
                        {name: I18n.t('commons.no'), value: false}
                    ]
                }
            ]
        }
    }

    render () {
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
                    id: `${itemtype.PluginFlyvemdmFleet}.id`,
                    itemtype: itemtype.PluginFlyvemdmFleet
                }}
            />
        )
    }
}

FleetsEdit.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

export default FleetsEdit