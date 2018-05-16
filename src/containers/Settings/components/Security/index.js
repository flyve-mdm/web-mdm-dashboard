import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../../components/Confirmation'
import ErrorValidation from '../../../../components/ErrorValidation'
import ConstructInputs from '../../../../components/Forms'
import Loading from '../../../../components/Loading'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'
import logout from '../../../../shared/logout'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import itemtype from '../../../../shared/itemtype'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class Security extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            passwordConfirmation: '',
            passwordConfiguration: undefined,
            forceValidation: false,
            isLoading: true,
            selfRegistration: null,
            currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {}
        }
    }

    componentDidMount = async () => {
        try {
            const plugins = await this.props.glpi.getAllItems({ itemtype: 'Plugin' })
            const pluginDemo = plugins.filter(plugin => plugin.name === "Flyve MDM Demo")
            if (pluginDemo.length < 1 || pluginDemo[0].status !== 1) {
                throw new Error()
            }
            this.setState({
                isLoading: false,
                selfRegistration: true
            })
        } catch (e) {
            this.setState({
                isLoading: false,
                selfRegistration: false
            })
        }
    }

        deleteUser = async () => {
        const isOK = await Confirmation.isOK(this.deleteAccount)
        if (isOK) {

            this.setState(
                { isLoading: true}, 
                async () => {
                    try {
                        await this.props.glpi.deleteItem({ 
                            itemtype: itemtype.User, 
                            input: {id: this.state.currentUser.id}, 
                            queryString: { force_purge: true } 
                        })
                        this.props.actions.setNotification({
                            title: I18n.t('commons.success'),
                            body: I18n.t('notifications.user_deleted'),
                            type: 'success'
                        })

                        logout()
                        localStorage.clear()

                    } catch (error) {
                        this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                        this.setState({ isLoading: false })
                        this.changeMode('')
                    } 
                }
            )
        }
    }

    closeSession  = async () => {
        const isOK = await Confirmation.isOK(this.killSession)
        if (isOK) {
            logout()            
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.session_closed'),
                type: 'success'
            })
        }
    }

    cleanWebStorage  = async () => {
        const isOK = await Confirmation.isOK(this.deleteBrowserData)
        if (isOK) {
            localStorage.clear()
            logout()            
            this.props.actions.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.clear_local_storage'),
                type: 'success'
            })
        }
    }

    savePassword = () => {
        this.setState({ forceValidation: true })
    }

    savePassword = (e) => {
        e.preventDefault()
        this.setState({ forceValidation: true }, () => {
            const password = this.buildDataArray()
            let isCorrect = true
    
            for (const key in password) {
                if (password.hasOwnProperty(key)) {
                    const elements = password[key]
                    for (let index = 0; index < elements.length; index++) {
                        const element = elements[index]
                        if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                            isCorrect = false
                    }
                }
            }
    
            if (isCorrect) {
                this.setState(
                    { isLoading: true},
                    async () => {
                        try {
                            await this.props.glpi.updateItem({
                                itemtype: itemtype.User, 
                                id: this.state.currentUser.id,
                                input: {
                                    password: this.state.password,
                                    password2: this.state.passwordConfirmation
                                }
                            })
                            this.props.actions.setNotification({
                                title: I18n.t('commons.success'),
                                body: I18n.t('notifications.new_password_saved'),
                                type: 'success'
                            })
                        } catch (error) {
                            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                        } 
                        this.setState({ isLoading: false })
                        this.changeMode('')
                    }
                )
            } else {
                this.setState({
                    forceValidation: true
                })
            }
        })
    }

    changeState = (name, value) => { 
        this.setState({
            [name]: value
        })
    }

    changeMode = (mode) => {
        if (mode === 'Change password') {
            this.setState({ 
                isLoading: true
            }, async () => {
                const {cfg_glpi} = await this.props.glpi.getGlpiConfig()
                this.setState({
                    isLoading: false,
                    passwordConfiguration: {
                        minimunLength: cfg_glpi.password_min_length,
                        needDigit: cfg_glpi.password_need_number,
                        needLowercaseCharacter: cfg_glpi.password_need_letter,
                        needUppercaseCharacter: cfg_glpi.password_need_caps,
                        needSymbol: cfg_glpi.password_need_symbol
                    },
                    forceValidation: false,
                    password: '',
                    passwordConfirmation: '',
                    mode 
                })
            })
        } else {
            this.setState({ mode })
        }
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
                        ...this.state.passwordConfiguration
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
                        ...this.state.passwordConfiguration,
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
        if (this.state.isLoading) {
            return (
                <div style={{height: '100%'}}>
                    <Loading message={`${I18n.t('commons.loading')}...`}/> 
                </div>
            )
        }

        switch (this.state.mode) {
            case I18n.t('commons.change_password'):
                return (
                    <ContentPane>
                        <h2> {this.state.mode} </h2>

                        <form className="list-content" onSubmit={this.savePassword}>
    
                            <ConstructInputs data={this.buildDataArray()} />

                            <br/>

                            <button className="btn btn--secondary" 
                                type="button"
                                style={{marginRight: 10}} 
                                onClick={() => this.changeMode("")}
                            >
                                {I18n.t('commons.cancel')}
                            </button>

                            <button className="btn btn--primary">
                                {I18n.t('commons.save')}
                            </button>

                        </form>

                    </ContentPane>
                )
            default:
                return (
                    <React.Fragment>
                        <Confirmation 
                            title={I18n.t('commons.kill_session')}
                            message={I18n.t('settings.security.close_session_message')}
                            reference={el => this.killSession = el} 
                        />
          
                        <Confirmation 
                            title={I18n.t('settings.security.delete_data')}
                            message={I18n.t('settings.security.delete_data_message')}
                            reference={el => this.deleteBrowserData = el} 
                        />          
                        
                        <Confirmation 
                            title={I18n.t('settings.security.delete_account')}
                            message={I18n.t('settings.security.delete_account_message')}
                            reference={el => this.deleteAccount = el} 
                        />                  
                        <ContentPane>
                            <h2 style={{ margin: '10px' }}>
                                {I18n.t('commons.security')}
                            </h2>
                            
                            <div className="list-element">
                                <div className="list-element__message">
                                    {I18n.t('commons.password')}
                                    <div className="list-element__detail">
                                        {I18n.t('settings.security.change_flyve_passsword')}
                                    </div>
                                </div>
                                <div className="list-element__controller">
                                    <button className="btn btn--secondary" onClick={() => this.changeMode(I18n.t('commons.change_password'))}>
                                        {I18n.t('commons.edit')}
                                    </button>
                                </div>
                            </div>
            
                            <div className="list-element">
                                <div className="list-element__message">
                                    {I18n.t('commons.kill_session')}
                                    <div className="list-element__detail">
                                        {I18n.t('settings.security.destroy_session')}
                                    </div>
                                </div>
                                <div className="list-element__controller">
                                    <button className="btn btn--secondary" onClick={this.closeSession}>
                                        {I18n.t('commons.logout')}
                                    </button>
                                </div>
                            </div>
            
                            <div className="list-element">
                                <div className="list-element__message">
                                    {I18n.t('settings.security.delete_data')}
                                    <div className="list-element__detail">
                                        {I18n.t('settings.security.delete_data_detail')}
                                    </div>
                                </div>
                                <div className="list-element__controller">
                                    <button className="btn btn--secondary" onClick={this.cleanWebStorage}>
                                        {I18n.t('commons.delete')}
                                    </button>
                                </div>
                            </div>


                            {
                                !this.state.selfRegistration ? '' :
                                <React.Fragment>
                                    <div className="list-element">
                                        <div className="list-element__message">
                                            {I18n.t('settings.security.delete_account')}
                                            <div className="list-element__detail">
                                                {I18n.t('settings.security.delete_account_detail')}
                                            </div>
                                        </div>
                                        <div className="list-element__controller">
                                            <button className="btn btn--secondary" onClick={this.deleteUser}>
                                                {I18n.t('commons.delete')}
                                            </button>
                                        </div>
                                    </div>
                                    

                                </React.Fragment>
                            }
            
                        </ContentPane>            
                    </React.Fragment>
                    
                )
        }
    }
}

Security.propTypes = {
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(withGLPI(withHandleMessages(Security)))
