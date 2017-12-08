import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../../Utils/Calc100PercentMinus'
import currentUser from '../../data/currentUser.json'
import validateData from '../../../Utils/validateData'
import ConstructInputs from './ConstructInputs'

class Profiles extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            buttonSaveClassName: "win-button win-button-primary hidden",
            login: validateData(currentUser["User.name"], undefined),
            firstName: validateData(currentUser["User.firstname"]),
            realName: validateData(currentUser["User.realname"]),
            phone: validateData(currentUser["User.phone"]),
            mobilePhone: validateData(currentUser["User.mobile"]),
            phone2: validateData(currentUser["User.phone2"]),
            administrativeNumber: validateData(currentUser["User.registration_number"]),
            lastLogin: validateData(currentUser["User.last_login"], undefined),
            created: validateData(currentUser["User.date_creation"], undefined),
            modified: validateData(currentUser["User.date_mod"], undefined),
            title: '',
            location: '',
            defaultProfile: ''

        }
    }

    saveChanges = () => {
        this.setState({
            buttonSaveClassName: "win-button win-button-primary hidden"
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.buttonSaveClassName === "win-button win-button-primary hidden") {
            this.setState({
                buttonSaveClassName: "win-button win-button-primary"
            })
        }
    }

    render () {

        let personalInformation = [
            [
                {
                    label: "Login",
                    type: "text",
                    name: "login",
                    value: this.state.login,
                    placeholder: null,
                    function: null,
                    disabled: true,
                    style: {
                        width: 'auto'
                    }
                },
            ],
            [
                {
                    label: "Realname",
                    type: "text",
                    name: "realName",
                    value: this.state.realName,
                    placeholder: "Realname",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                },
                {
                    label: "First name",
                    type: "text",
                    name: "firstName",
                    value: this.state.firstName,
                    placeholder: "First name",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                }
            ],
            [
                {
                    label: "Title",
                    type: "select",
                    name: "title",
                    value: this.state.title,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1'
                        },
                        {
                            label: 'option 2',
                            value: 'option 2'
                        },
                        {
                            label: 'option 3',
                            value: 'option 3'
                        }
                    ],
                    function: this.changeInput
                },
                {
                    label: "Location",
                    type: "select",
                    name: "location",
                    value: this.state.location,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1'
                        },
                        {
                            label: 'option 2',
                            value: 'option 2'
                        },
                        {
                            label: 'option 3',
                            value: 'option 3'
                        }
                    ],
                    function: this.changeInput
                },
                {
                    label: "Default profile",
                    type: "select",
                    name: "defaultProfile",
                    value: this.state.defaultProfile,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1'
                        },
                        {
                            label: 'option 2',
                            value: 'option 2'
                        },
                        {
                            label: 'option 3',
                            value: 'option 3'
                        }
                    ],
                    function: this.changeInput
                }
            ]
        ]

        let contactInformation = [
            [
                {
                    label: "Phone",
                    type: "text",
                    name: "phone",
                    value: this.state.phone,
                    placeholder: "Phone",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                },
                {
                    label: "Mobile phone",
                    type: "text",
                    name: "mobilePhone",
                    value: this.state.mobilePhone,
                    placeholder: "Mobile phone",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                }
            ],
            [
                {
                    label: "Phone 2",
                    type: "text",
                    name: "phone2",
                    value: this.state.phone2,
                    placeholder: "Phone 2",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                },
                {
                    label: "Administrative number",
                    type: "text",
                    name: "administrativeNumber",
                    value: this.state.administrativeNumber,
                    placeholder: "Administrative number",
                    function: this.changeInput,
                    disabled: false,
                    style: null
                }
            ]
        ]

        let activityInformation = [
            [
                {
                    label: "Last login",
                    type: "text",
                    name: "lastLogin",
                    value: this.state.lastLogin,
                    placeholder: "Last login",
                    function: this.changeInput,
                    disabled: true,
                    style: {
                        width: '100%'
                    }
                },
                {
                    label: "Created",
                    type: "text",
                    name: "created",
                    value: this.state.created,
                    placeholder: "Created",
                    function: this.changeInput,
                    disabled: true,
                    style: {
                        width: 'auto'
                    } 
                },
                {
                    label: "Modified",
                    type: "text",
                    name: "modified",
                    value: this.state.modified,
                    placeholder: "Modified",
                    function: this.changeInput,
                    disabled: true,
                    style: {
                        width: 'auto'
                    } 
                }
            ]

        ]

        return (
            <div className="contentPane list-content Profiles" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <h2 className="win-h2"> Profiles </h2>

                <ConstructInputs data={personalInformation} icon="contactIcon" />
                
                <ConstructInputs data={contactInformation} icon="phoneIcon" />
                
                <ConstructInputs data={activityInformation} icon="documentIcon" />

                <button className={ this.state.buttonSaveClassName } style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                    Save
                </button>
                
                <br/>
            </div>
        )
    }
}

Profiles.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Profiles