import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import ErrorValidation from '../../Utils/Forms/ErrorValidation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail, fetchData, changeNotificationMessage } from '../DuckController'
import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'
import Glpi from '../../Utils/GlpiApi'
import config from '../../config.json'
import ToastNotifications from '../../Utils/ToastNotifications'

function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading,
        configurationPassword: state.Login.configurationPassword
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch),
        fetchData: bindActionCreators(fetchData, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.props.actions.fetchData('configurationPassword')
        this.state = {
            email: '',
            login: '',
            realName: '',
            password: '',
            passwordConfirmation: '',
            forceValidation: false,
            isLoading: false,
        }
    }

    componentDidMount() {
        this.refreshCaptcha()
    }

    refreshCaptcha = async () => {

        try {
            // Init session by user_token
            const responseSession = await Glpi.genericRequest({ path: 'initSession', queryString: { user_token: config.USER_TOKEN }, requestParams: { method: 'GET' } })
            const session = await responseSession.json()
            Glpi.sessionToken = session.session_token

            // Create new captcha
            const {id} = await Glpi.addItem({ itemtype: 'PluginFlyvemdmdemoCaptcha', input: {}})
                
        } catch (error) {
            console.log(error)
        }
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    showNotification = (title, body) => {
        if (this.toastNotifications) this.toastNotifications.showNotification(title, body)
        this.props.actions.changeNotificationMessage(undefined)
    }

    registerUser = (e) => {
        e.preventDefault()
        
        const user = this.buildDataArray()
        let isCorrect = true

        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const elements = user[key]
                for (let index = 0; index < elements[0].length; index++) {
                    const element = elements[0][index]
                    if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                        isCorrect = false
                }
            }
        }
        
        if (isCorrect) {
            let data = {
                "name": this.state.login,
                "realname": this.state.realName,
                "password": this.state.password,
                "password2": this.state.passwordConfirmation,
                "_useremails": [this.state.email],
                "_profiles_id": 3
            }

            Glpi.registerUser(config.USER_TOKEN, data)
                .then(() => {
                    this.props.actions.changeNotificationMessage({ title: config.APP_NAME, body: "successfully registered user" })
                    this.props.history.push('/')
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false
                    })
                    this.showNotification(error[0], error[1])
                })
            
            this.setState({
                isLoading: true
            })

        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    buildDataArray = () => {
        const dataArray = {
            personalInformation: [
                [
                    {
                        label: "Email",
                        type: "text",
                        name: "email",
                        value: this.state.email,
                        placeholder: "Email",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            isEmail: true
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "Username",
                        type: "text",
                        name: "login",
                        value: this.state.login,
                        placeholder: "Username",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "Full name",
                        type: "text",
                        name: "realName",
                        value: this.state.realName,
                        placeholder: "Full name",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true
                        },
                        forceValidation: this.state.forceValidation
                    }
                ]
            ],
            passwordInformation: [
                [
                    {
                        label: "Password",
                        type: "password",
                        name: "password",
                        value: this.state.password,
                        placeholder: "Password",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            minimunLength: this.props.configurationPassword.minimun_length,
                            needDigit: this.props.configurationPassword.need_digit,
                            needLowercaseCharacter: this.props.configurationPassword.need_lowercase_character,
                            needUppercaseCharacter: this.props.configurationPassword.need_uppercase_character,
                            needSymbol: this.props.configurationPassword.need_symbol
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "Password (confirmation)",
                        type: "password",
                        name: "passwordConfirmation",
                        value: this.state.passwordConfirmation,
                        placeholder: "Password confirmation",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            minimunLength: this.props.configurationPassword.minimun_length,
                            needDigit: this.props.configurationPassword.need_digit,
                            needLowercaseCharacter: this.props.configurationPassword.need_lowercase_character,
                            needUppercaseCharacter: this.props.configurationPassword.need_uppercase_character,
                            needSymbol: this.props.configurationPassword.need_symbol,
                            isEqualTo: {
                                value: this.state.password,
                                message: "Passwords do not match"
                            }
                        },
                        forceValidation: this.state.forceValidation
                    }
                ]
            ] 
            
        }
        return dataArray
    }

    render() {
        const user = this.buildDataArray()

        let renderComponent 
        if (this.props.isLoading || this.state.isLoading) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            renderComponent = (
                <LoginContainer centerContent={false}>
                    <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                    <h2 style={{
                        textAlign: 'center'
                    }}>
                        Create account
                    </h2>

                    <form className="list-content" onSubmit={this.registerUser}>

                        <ConstructInputs data={user.personalInformation} />

                        <ConstructInputs data={user.passwordInformation}  />

                        <div style={{textAlign: 'center'}}>
                            <button className="win-button win-button-primary" style={{ margin: "20px" }}>
                                Register
                            </button>
                        </div>
                    </form>
                </LoginContainer>
            )
        }

        return renderComponent
    }
}

SignIn.propTypes = {
    email: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    configurationPassword: PropTypes.object.isRequired    
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
