import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EditMultiple from '../../../components/EditMultiple'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'

class DevicesEdit extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            FieldList: [
                {
                    name: I18n.t('commons.realname'),
                    type: "text",
                    DBName: "realname"
                },
                {
                    name: I18n.t('commons.first_name'),
                    type: "text",
                    DBName: "firstname"
                },
                {
                    name: I18n.t('commons.phone'),
                    type: "text",
                    DBName: "phone"
                },
                {
                    name: I18n.t('commons.phone_2'),
                    type: "text",
                    DBName: "phone2"
                },
                {
                    name: I18n.t('commons.mobile_phone'),
                    type: "text",
                    DBName: "mobile"
                },
                {
                    name: I18n.t('commons.administrative_number'),
                    type: "text",
                    DBName: "registration_number"
                },
                {
                    name: I18n.t('commons.password'),
                    type: "password",
                    DBName: ["password", "password2"]
                },
                {
                    name: I18n.t('commons.title'),
                    type: "select",
                    DBName: "usertitles_id",
                    params: {itemtype: itemtype.UserTitle, options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: I18n.t('commons.location'),
                    type: "select",
                    DBName: "locations_id",
                    params: {itemtype: itemtype.Location, options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: I18n.t('commons.default_profile'),
                    type: "select",
                    DBName: "profiles_id",
                    params: {},
                    method: "getMyProfiles",
                    content: "name",
                    value: "id"
                },
                {
                    name: I18n.t('commons.category'),
                    type: "select",
                    DBName: "usercategories_id",
                    params: {itemtype: itemtype.UserCategory, options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: I18n.t('commons.default_entity'),
                    type: "select",
                    DBName: "entities_id",
                    params: {},
                    method: "getMyEntities",
                    content: "name",
                    value: "id"
                },
                {
                    name: I18n.t('commons.valid_since'),
                    type: "datePicker",
                    DBName: "begin_date"
                },
                {
                    name: I18n.t('commons.valid_until'),
                    type: "datePicker",
                    DBName: "end_date"
                },
                {
                    name: I18n.t('commons.comments'),
                    type: "textArea",
                    DBName: "comment"
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
                    id: 'User.id',
                    itemtype: itemtype.User
                }}
            />
        )
    }
}

DevicesEdit.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

export default DevicesEdit