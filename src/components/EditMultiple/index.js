import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../ContentPane'
import Loading from '../Loading'
import { Select, Input, DatePicker, TextArea } from '../Forms'
import ErrorValidation from '../ErrorValidation'
import EmptyMessage from '../EmptyMessage'
import { I18n } from "react-i18nify"

export default class EditMultiple extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItems],
            isLoading: false,
            selectedField: {},
            newValue: '',
            passwordConfirmation: '',
            passwordConfiguration: {},
            forceValidation: false
        }
    }

    handleSave = async () => {
        let isCorrect = true

        if (this.state.selectedField.type === "password") {
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.newValue).isCorrect) 
                isCorrect = false
            
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.passwordConfirmation).isCorrect) 
                isCorrect = false
        }

        if (isCorrect) {
            this.setState({
                isLoading: true
            }, async () => {
                let input = this.state.selectedField.DBName !== "password" ?  
                    {[this.state.selectedField.DBName]: this.state.newValue} :
                    {
                        [this.state.selectedField.DBName[0]]: this.state.newValue,
                        [this.state.selectedField.DBName[1]]: this.state.passwordConfirmation
                    }

                input = this.props.selectedItems.map(element => {
                    return ({
                        id: element[this.props.request.id],
                        ...input
                    })
                })

                try {
                    await this.props.glpi.updateItem({itemtype: this.props.request.itemtype, input})
                    this.setState ({isLoading: false})            
                    this.props.setNotification({
                        title: 'Success',
                        body: 'Elements successfully edited',
                        type: 'success'
                    })
                    this.props.history.goBack()
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
        if(name === "selectedField") {
            this.setState({
                newValue: '',
                selectedField: JSON.parse(value)
            }, ()=> {
                if (value === "password") {
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
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    cancel = () => {
        this.props.history.goBack()
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
    }

    render() {
        if (this.props.selectedItems) {
            let renderComponent
            if (this.state.isLoading) {
                renderComponent = <div style={{marginTop: 40}}><Loading message={`${I18n.t('commons.loading')}...`} /></div>
            } else {
                let input

                switch (this.state.selectedField.type) {
                    case "text": 
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

                    case "password": 
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

                    case 'select':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: this.state.selectedField.params,
                                    method: this.state.selectedField.method,
                                    content: this.state.selectedField.content,
                                    value: this.state.selectedField.value
                                }}
                            />
                        )
                    break

                    case 'datePicker':
                        input = (
                            <DatePicker
                                label="What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break

                    case 'textArea': 
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
                            name="selectedField"
                            value={this.state.field}
                            options={this.props.FieldList.map(field => { return { name: field.name, value: JSON.stringify(field) }})}
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
                <EmptyMessage message={I18n.t('commons.no_selection')}/>
            )
        }
    }
}
EditMultiple.propTypes = {
    selectedItems: PropTypes.array,
    FieldList: PropTypes.array.isRequired,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired
}
