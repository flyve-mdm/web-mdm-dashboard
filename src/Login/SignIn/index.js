import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ConstructInputs from '../../Utils/Forms'
import ErrorValidation from '../../Utils/Forms/ErrorValidation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail, changeNotificationMessage } from '../DuckController'
import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'
import Glpi from '../../Utils/GlpiApi'
import config from '../../config.json'
import ToastNotifications from '../../Utils/ToastNotifications'

function mapStateToProps(state, props) {
    return {
        email: state.Login.email
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            login: '',
            realName: '',
            password: '',
            passwordConfirmation: '',
            captcha: '',
            captchaID: undefined,
            forceValidation: false,
            configurationPassword: undefined,
            isLoading: true,
            imgCaptcha: undefined
        }
    }

    componentDidMount() {
        this.refreshCaptcha()
    }

    componentWillUnmount() {

        console.log('componentWillUnmount')
    }

    refreshCaptcha = async () => {

        try {
            // Init session by user_token
            const responseSession = await Glpi.genericRequest({ path: 'initSession', queryString: { user_token: config.USER_TOKEN }, requestParams: { method: 'GET' } })
            const session = await responseSession.json()
            Glpi.sessionToken = session.session_token
            // Create new captcha
            const {id} = await Glpi.addItem({ itemtype: 'PluginFlyvemdmdemoCaptcha', input: {}})
            // Get new captcha
            let headers = new Headers()
            headers.append('Content-Type', 'application/octet-stream')
            const captcha = await Glpi.genericRequest({ path: `PluginFlyvemdmdemoCaptcha/${id}`, queryString: { alt: 'media' }, requestParams: { method: 'GET', headers } })
            const imgCaptcha = await captcha.blob()

            // Get Glpi configuration
            const { cfg_glpi } = await Glpi.getGlpiConfig()

            const configurationPassword = {
                minimunLength: cfg_glpi.password_min_length,
                needDigit: cfg_glpi.password_need_number,
                needLowercaseCharacter: cfg_glpi.password_need_letter,
                needUppercaseCharacter: cfg_glpi.password_need_caps,
                needSymbol: cfg_glpi.password_need_symbol
            }

            console.log(configurationPassword)

            this.setState({
                captchaID: id,
                imgCaptcha: URL.createObjectURL(imgCaptcha),
                configurationPassword: configurationPassword,
                isLoading: false
            })
                
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
                "name": this.state.email,
                "realname": this.state.realName,
                "password": this.state.password,
                "password2": this.state.passwordConfirmation,
                "_useremails": [this.state.email],
                "_plugin_flyvemdmdemo_captchas_id": this.state.captchaID,
                "_answer": this.state.captcha
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
                            ...this.state.configurationPassword
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
                            ...this.state.configurationPassword,
                            isEqualTo: {
                                value: this.state.password,
                                message: "Passwords do not match"
                            }
                        },
                        forceValidation: this.state.forceValidation
                    }
                ]
            ],
            captchaInformation: [
                [
                    {
                        label: "Enter the code from the image",
                        type: "text",
                        name: "captcha",
                        value: this.state.captcha,
                        placeholder: null,
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
            ]  
            
        }
        return dataArray
    }

    render() {
        let renderComponent 
        if (this.state.isLoading) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            const user = this.buildDataArray()
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
                        
                        <ConstructInputs data={user.captchaInformation} />
                        <div style={{ textAlign: 'center' }}>
                            <img src={this.state.imgCaptcha} alt='' />
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button className="win-button win-button-primary" style={{ margin: "20px" }}>
                                Register
                            </button>
                            <p>Do you already have an account? <Link to='/'>Sign in</Link></p>
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
    history: PropTypes.object.isRequired  
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
