import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n, Translate } from 'react-i18nify'

import Glpi from '../../shared/glpiApi'
import ToastNotifications from '../../components/ToastNotifications'
import Loading from '../../components/Loading'
import ErrorValidation from '../../components/ErrorValidation'
import ConstructInputs from '../../components/Forms'
import config from '../../config/config.json'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import { changeNotificationMessage, refreshCaptcha } from '../../store/authentication/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    const actions = {
        refreshCaptcha: bindActionCreators(refreshCaptcha, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch)
    }
    return { actions }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,
        captcha: state.auth.captcha,
        configurationPassword: state.auth.configurationPassword
    }
}

class SignUp extends Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            login: '',
            realName: '',
            password: '',
            passwordConfirmation: '',
            captchaValue: '',
            forceValidation: false,
        }
    }

    componentDidMount() {
        this.props.actions.refreshCaptcha()
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
                "_plugin_flyvemdmdemo_captchas_id": this.props.captcha.id,
                "_answer": this.state.captchaValue
            }

            // TODO: Convert into Action Creator
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
                        name: "captchaValue",
                        value: this.state.captchaValue,
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
        if (this.props.isLoading) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            const user = this.buildDataArray()
            renderComponent = (
                <React.Fragment>
                    <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                    <h2 className="win-h2" style={{
                        textAlign: 'center'
                    }}>
                        <Translate value="create_account.create_account"/>
                    </h2>

                    <form className="authentication__form" onSubmit={this.registerUser}>

                        <ConstructInputs data={user.personalInformation} />

                        <ConstructInputs data={user.passwordInformation}  />
                        
                        <ConstructInputs data={user.captchaInformation} />
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <img src={this.props.captcha.img} alt='Captcha' />
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button className='btn --primary' style={{ margin: "20px" }}>
                                <Translate value="create_account.register"/>
                            </button>
                            <p>
                                <Translate value="create_account.do_you_already_have_an_account?"/>
                                &#160;
                                <Link to='/'>
                                    <Translate value="commons.sign_in"/>
                                </Link>
                            </p>
                        </div>

                    </form>
                </React.Fragment>
            )
        }

        return renderComponent
    }
}

SignUp.propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(SignUp, {contentCenter: true}))
