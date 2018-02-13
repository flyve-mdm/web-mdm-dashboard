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
import withI18NTranslation from '../../i18n/withI18NTranslation';
import { I18n, Translate } from 'react-i18nify';

function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        locationLanguage: state.Login.locationLanguage
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
            imgCaptcha: undefined,
        }
    }

    componentDidMount() {
        this.refreshCaptcha()
    }

    refreshCaptcha = async () => {

        try {
            // Init session by user_token
            const session = await Glpi.initSessionByUserToken({ userToken: config.USER_TOKEN })
            Glpi.sessionToken = session.session_token
            // Create new captcha
            const {id} = await Glpi.addItem({ itemtype: 'PluginFlyvemdmdemoCaptcha', input: {}})
            // Get new captcha
            const captcha = await Glpi.genericRequest({ path: `PluginFlyvemdmdemoCaptcha/${id}`, queryString: { alt: 'media' }, requestParams: { method: 'GET', headers: {'Content-Type': 'application/octet-stream'}, responseType: 'blob' } })
            // Get Glpi configuration
            const { cfg_glpi } = await Glpi.getGlpiConfig()

            const configurationPassword = {
                minimunLength: cfg_glpi.password_min_length,
                needDigit: cfg_glpi.password_need_number,
                needLowercaseCharacter: cfg_glpi.password_need_letter,
                needUppercaseCharacter: cfg_glpi.password_need_caps,
                needSymbol: cfg_glpi.password_need_symbol
            }

            this.setState({
                captchaID: id,
                imgCaptcha: URL.createObjectURL(captcha),
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

            Glpi.registerUser({ userToken: config.USER_TOKEN, userData: data, itemtype: 'PluginFlyvemdmdemoUser' })
                .then(() => {
                    this.props.actions.changeNotificationMessage({ title: config.APP_NAME, body: "successfully registered user" })
                    this.props.history.push('/validateAccount')
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
                        label: I18n.t('commons.email'),
                        type: "text",
                        name: "email",
                        value: this.state.email,
                        placeholder: I18n.t('commons.email'),
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
                        label: I18n.t('create_account.full_name'),
                        type: "text",
                        name: "realName",
                        value: this.state.realName,
                        placeholder: I18n.t('create_account.full_name'),
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
                        label: I18n.t('commons.password'),
                        type: "password",
                        name: "password",
                        value: this.state.password,
                        placeholder: I18n.t('commons.password'),
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
                        label: I18n.t('create_account.password_(confirmation)'),
                        type: "password",
                        name: "passwordConfirmation",
                        value: this.state.passwordConfirmation,
                        placeholder: I18n.t('create_account.password_(confirmation)'),
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
                        label: I18n.t('create_account.enter_the_code_from_the_image'),
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
                        <Translate value="create_account.create_account"/>
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
                                <Translate value="create_account.register"/>
                            </button>
                            <p>
                                <Translate value="create_account.do_you_already_have_an_account?"/>
                                &#160;
                                <Link to='/'>
                                    <Translate value="create_account.sign_in"/>
                                </Link>
                            </p>
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
    history: PropTypes.object.isRequired,
    locationLanguage: PropTypes.string.isRequired
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(withI18NTranslation(SignIn))