import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import EmptyMessage from '../../../components/EmptyMessage'
import Loading from '../../../components/Loading'
import { Select, Input, DatePicker, TextArea } from '../../../components/Forms'
import ErrorValidation from '../../../components/ErrorValidation'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItems],
            isLoading: false,
            field: undefined,
            newValue: '',
            passwordConfirmation: '',
            passwordConfiguration: {},
            forceValidation: false
        }
    }

    handleSave = async () => {
        let isCorrect = true

        if (this.state.field === "Password") {
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.newValue).isCorrect) 
                isCorrect = false
            
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.passwordConfirmation).isCorrect) 
                isCorrect = false
        }

        if (isCorrect) {
            this.setState({
                isLoading: true
            }, async () => {
                let input

                switch (this.state.field) {
                    case 'Realname': input = {realname: this.state.newValue}
                        break

                    case 'First name': input = {firstname: this.state.newValue}
                        break
                    
                    case 'Title': input = {usertitles_id: this.state.newValue}
                        break

                    case 'Location': input = {locations_id: this.state.newValue}
                        break
                    
                    case 'Default profile': input = {profiles_id: this.state.newValue}
                        break

                    case 'Password': input = {password: this.state.newValue, password2: this.state.passwordConfirmation}
                        break

                    case 'Valid since': input = {begin_date: this.state.newValue}
                        break

                    case 'Valid until': input = {end_date: this.state.newValue}
                        break
                    
                    case 'Phone': input = {phone: this.state.newValue}
                        break

                    case 'Phone 2': input = {phone2: this.state.newValue}
                        break

                    case 'Mobile phone': input = {mobile: this.state.newValue}
                        break

                    case 'Administrative number': input = {registration_number: this.state.newValue}
                        break

                    case 'Category': input = {usercategories_id: this.state.newValue}
                        break

                    case 'Default entity': input = {entities_id: this.state.newValue}
                        break

                    case 'Comments': input = {comment: this.state.newValue}
                        break

                    default:
                        break
                }

                input = this.props.selectedItems.map(element => {
                    return ({
                        id: element['User.id'],
                        ...input
                    })
                })

                try {
                    await this.props.glpi.updateItem({itemtype: 'User', input})
                    this.setState ({isLoading: false})            
                    this.props.setNotification({
                        title: 'Success',
                        body: 'Users successfully edited',
                        type: 'success'
                    })
                    this.props.history.push('/app/users')
                    this.props.changeAction('reload')
                    this.props.changeSelectionMode(false)
                } catch (error) {
                    this.setState ({isLoading: false})            
                    this.props.setNotification({
                        title: error[0],
                        body: error[1],
                        type: 'alert'
                    })
                }
            })
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    change = (name, value) => {
        if(name === "field") {
            this.setState({
                newValue: ''
            }, ()=> {
                if (value === "Password") {
                    this.setState({
                        isLoading: true
                    }, async () => {
                        const { cfg_glpi } = await this.props.glpi.getGlpiConfig()
                        this.setState({
                            passwordConfiguration: {
                                minimunLength: cfg_glpi.password_min_length,
                                needDigit: cfg_glpi.password_need_number,
                                needLowercaseCharacter: cfg_glpi.password_need_letter,
                                needUppercaseCharacter: cfg_glpi.password_need_caps,
                                needSymbol: cfg_glpi.password_need_symbol
                            },
                            isLoading: false
                        })
                    })
                }
            })
        } 
        this.setState({
            [name]: value
        })
    }

    cancel = () => {
        this.props.history.push('/app/users')
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
    }

    render() {
        if (this.props.selectedItems) {
            let renderComponent
            if (this.state.isLoading) {
                renderComponent = <div style={{marginTop: 40}}><Loading message="Loading..." /></div>
            } else {
                let input
                switch (this.state.field) {
                    case 'Realname':
                    case 'First name':
                    case 'Phone':
                    case 'Phone 2':
                    case 'Mobile phone':
                    case 'Administrative number':
                        input = (
                            <Input
                                label="What will be the new value?"
                                type="text"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break

                    case 'Password':
                        input = [
                            <Input
                                label="What is the new password?"
                                type="password"
                                name="newValue"
                                value={this.state.newValue}
                                parametersToEvaluate={this.state.passwordConfiguration}
                                function={this.change}
                                forceValidation={this.state.forceValidation}
                                key="password-1"
                            />,
                            <Input
                                label="Please repeat the password"
                                type="password"
                                name="passwordConfirmation"
                                value={this.state.passwordConfirmation}
                                parametersToEvaluate={{
                                    ...this.state.passwordConfiguration,
                                    isEqualTo: {
                                        value: this.state.newValue,
                                        message: "Passwords do not match"
                                    }
                                }}
                                function={this.change}
                                forceValidation={this.state.forceValidation}
                                key="password-2"
                            />
                        ]
                    break

                    case 'Title':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'UserTitle', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )
                    break

                    case 'Location':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'Location', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )
                    break

                    case 'Default profile':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {},
                                    method: 'getMyProfiles',
                                    content: 'name',
                                    value: 'id'
                                }}
                            />
                        )
                    break

                    case 'Category':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'UserCategory', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )  
                    break

                    case 'Default entity':
                        input = (
                            <Select
                                label="What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {},
                                    method: 'getMyEntities',
                                    content: 'name',
                                    value: 'id'
                                }}
                            />
                        )  
                    break

                    case 'Valid since':
                    case 'Valid until':
                        input = (
                            <DatePicker
                                label="What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break

                    case 'Comments': 
                        input = (
                            <TextArea
                                label="What will be the new value?"
                                type="text"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break
                
                    default:
                        break
                }
                renderComponent = (
                    <div>
                        {input}
                    </div>
                )
            }      
            
            return (
                <ContentPane>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit Users </h2>
                        <h4  className="win-h4">
                            Select the field that you want to update
                        </h4>
                        <Select
                            name="field"
                            value={this.state.field}
                            options={[
                                'Realname',
                                'First name',
                                'Title',
                                'Location',
                                'Default profile',
                                'Password',
                                'Valid since',
                                'Valid until',
                                'Phone',
                                'Phone 2',
                                'Mobile phone',
                                'Administrative number',
                                'Category',
                                'Default entity',
                                'Comments'
                            ]}
                            function={this.change}
                        />
                        
                        {renderComponent}
                        

                        { this.state.isLoading ? "" : (
                            <React.Fragment>
                                <br/>

                                <button className="btn --secondary" onClick={this.cancel}>
                                    Cancel
                                </button>
                                
                                <button className="btn --primary" onClick={this.handleSave} style={{marginLeft: 10}}>
                                    Save
                                </button>
                            </React.Fragment>
                        )}
                    </div>
                </ContentPane>
            )

        } else {
            return (
                <EmptyMessage message="No Selection"/>
            )
        }
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
