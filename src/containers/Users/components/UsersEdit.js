import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditMultiple from '../../../components/EditMultiple'

class DevicesEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FieldList: [
                {
                    name: "Realname",
                    type: "text",
                    DBName: "realname"
                },
                {
                    name: "First name",
                    type: "text",
                    DBName: "firstname"
                },
                {
                    name: "Phone",
                    type: "text",
                    DBName: "phone"
                },
                {
                    name: "Phone 2",
                    type: "text",
                    DBName: "phone2"
                },
                {
                    name: "Mobile phone",
                    type: "text",
                    DBName: "mobile"
                },
                {
                    name: "Administrative number",
                    type: "text",
                    DBName: "registration_number"
                },
                {
                    name: "Password",
                    type: "password",
                    DBName: ["password", "password2"]
                },
                {
                    name: "Title",
                    type: "select",
                    DBName: "usertitles_id",
                    params: {itemtype: 'UserTitle', options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: "Location",
                    type: "select",
                    DBName: "locations_id",
                    params: {itemtype: 'Location', options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: "Default profile",
                    type: "select",
                    DBName: "profiles_id",
                    params: {},
                    method: "getMyProfiles",
                    content: "name",
                    value: "id"
                },
                {
                    name: "Category",
                    type: "select",
                    DBName: "usercategories_id",
                    params: {itemtype: 'UserCategory', options: {range: '0-200', forcedisplay: [2]}},
                    method: "searchItems",
                    content: "1",
                    value: "2"
                },
                {
                    name: "Default entity",
                    type: "select",
                    DBName: "entities_id",
                    params: {},
                    method: "getMyEntities",
                    content: "name",
                    value: "id"
                },
                {
                    name: "Valid since",
                    type: "datePicker",
                    DBName: "begin_date"
                },
                {
                    name: "Valid until",
                    type: "datePicker",
                    DBName: "end_date"
                },
                {
                    name: "Comments",
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
                    itemtype: 'User'
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