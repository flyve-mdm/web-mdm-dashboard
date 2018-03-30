import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../../components/Confirmation'
import ErrorValidation from '../../../../components/ErrorValidation'
import ConstructInputs from '../../../../components/Forms'
import Loading from '../../../../components/Loading'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'
import { fetchPasswordConfiguration, logout } from '../../../../store/authentication/actions'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch),
        fetchPasswordConfiguration: bindActionCreators(fetchPasswordConfiguration, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
    return { actions }
}

class Security extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            passwordConfirmation: '',
            forceValidation: false
        }
    }

    deleteUser = async () => {
        const isOK = await Confirmation.isOK(this.deleteAccount)
        if (isOK) {
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.user_deleted'),
                type: 'info'
            })
        }
    }

    closeSession  = async () => {
        const isOK = await Confirmation.isOK(this.killSession)
        if (isOK) {
            this.props.actions.logout(this.props.history)
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.session_closed'),
                type: 'info'
            })
        }
    }

    cleanWebStorage  = async () => {
        const isOK = await Confirmation.isOK(this.deleteBrowserData)
        if (isOK) {
            this.props.actions.logout(this.props.history)
            localStorage.clear()
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.clear_local_storage'),
                type: 'info'
            })
        }
    }

    savePassword = () => {
        this.setState({ forceValidation: true })
    }

    savePassword = (e) => {
        e.preventDefault()
        const password = this.buildDataArray()
        let isCorrect = true

        for (const key in password) {
            if (password.hasOwnProperty(key)) {
                const elements = password[key]
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index]
                    console.log(element.value)
                    if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                        isCorrect = false
                }
            }
        }

        if (isCorrect) {
            this.changeMode('')
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.new_password_saved'),
                type: 'info'
            })
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    changeState = (name, value) => { 
        this.setState({
            [name]: value
        })
    }

    changeMode = (mode) => {
        if (mode === 'Change password') {
            this.props.actions.fetchPasswordConfiguration()
        }
        this.setState({ 
            forceValidation: false,
            mode 
        })
    }

    buildDataArray = () => {
        return [
            [
                {
                    label: I18n.t('commons.password'),
                    type: "password",
                    name: "password",
                    value: this.state.password,
                    placeholder: I18n.t('commons.password'),
                    function: this.changeState,
                    parametersToEvaluate: { 
                        isRequired: true,
                        minimunLength: this.props.passwordConfiguration.minimun_length,
                        needDigit: this.props.passwordConfiguration.need_digit,
                        needLowercaseCharacter: this.props.passwordConfiguration.need_lowercase_character,
                        needUppercaseCharacter: this.props.passwordConfiguration.need_uppercase_character,
                        needSymbol: this.props.passwordConfiguration.need_symbol
                    },
                    forceValidation: this.state.forceValidation,
                    disabled: false,
                    style: null
                }
            ],
            [
                {
                    label: I18n.t('commons.password_confirmation'),
                    type: "password",
                    name: "passwordConfirmation",
                    value: this.state.passwordConfirmation,
                    placeholder: I18n.t('commons.password_confirmation'),
                    function: this.changeState,
                    parametersToEvaluate: { 
                        isRequired: true,
                        minimunLength: this.props.passwordConfiguration.minimun_length,
                        needDigit: this.props.passwordConfiguration.need_digit,
                        needLowercaseCharacter: this.props.passwordConfiguration.need_lowercase_character,
                        needUppercaseCharacter: this.props.passwordConfiguration.need_uppercase_character,
                        needSymbol: this.props.passwordConfiguration.need_symbol,
                        isEqualTo: {
                            value: this.state.password,
                            message: I18n.t('commons.passwords_not_match')
                        }
                    },
                    forceValidation: this.state.forceValidation,
                    disabled: false,
                    style: null
                }
            ]
        ]
    }

    render () {
        if (this.props.isLoading) {
            return (
                <div>
                    <Loading message={`${I18n.t('commons.loading')}...`}/> 
                </div>
            )
        }

        switch (this.state.mode) {
            case I18n.t('commons.change_password'):
                return (
                    <ContentPane>
                        <h2 className="win-h2"> {this.state.mode} </h2>

                        <form className="list-content" onSubmit={this.savePassword}>
    
                            <ConstructInputs data={this.buildDataArray()} />

                            <br/>

                            <button className="win-button" 
                                type="button"
                                style={{marginRight: 10}} 
                                onClick={() => this.changeMode("")}
                            >
                                {I18n.t('commons.cancel')}
                            </button>

                            <button className="win-button">
                                {I18n.t('commons.save')}
                            </button>

                        </form>

                    </ContentPane>
                )
            default:
                return (
                    <ContentPane>
                        <h2 style={{marginBottom: '20px'}}>
                            {I18n.t('commons.security')}
                        </h2>
                        
                        <div className="listElement">
                            <div className="message">
                                {I18n.t('commons.password')}
                                <div className="detail">
                                    {I18n.t('settings.security.change_flyve_passsword')}
                                </div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={() => this.changeMode(I18n.t('commons.change_password'))}>
                                    {I18n.t('commons.edit')}
                                </button>
                            </div>
                        </div>
        
                        <div className="listElement">
                            <div className="message">
                                {I18n.t('commons.kill_session')}
                                <div className="detail">
                                    {I18n.t('settings.security.destroy_session')}
                                </div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={this.closeSession}>
                                    {I18n.t('commons.logout')}
                                </button>
                            </div>
                        </div>

                        <Confirmation 
                            title={I18n.t('commons.kill_session')}
                            message={I18n.t('settings.security.close_session_message')}
                            reference={el => this.killSession = el} 
                        />
        
                        <div className="listElement">
                            <div className="message">
                                {I18n.t('settings.security.delete_data')}
                                <div className="detail">
                                    {I18n.t('settings.security.delete_data_detail')}
                                </div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={this.cleanWebStorage}>
                                    {I18n.t('commons.delete')}
                                </button>
                            </div>
                        </div>

                        <Confirmation 
                            title={I18n.t('settings.security.delete_data')}
                            message={I18n.t('settings.security.delete_data_message')}
                            reference={el => this.deleteBrowserData = el} 
                        />
        
                        <div className="listElement">
                            <div className="message">
                                {I18n.t('settings.security.delete_account')}
                                <div className="detail">
                                    {I18n.t('settings.security.delete_account_detail')}
                                </div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={this.deleteUser}>
                                    {I18n.t('commons.delete')}
                                </button>
                            </div>
                        </div>
                        
                        <Confirmation 
                            title={I18n.t('settings.security.delete_account')}
                            message={I18n.t('settings.security.delete_account_message')}
                            reference={el => this.deleteAccount = el} 
                        />
                    </ContentPane>            
                )
        }
    }
}

Security.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Security)
