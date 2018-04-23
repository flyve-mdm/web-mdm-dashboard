import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18nify'
import Loading from '../../components/Loading'
import ConstructInputs from '../../components/Forms'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import {
    changeNotificationMessage,
    fetchCaptcha,
    fetchSignUp
} from '../../store/authentication/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { buildDataArray, changeState, handleSubmitForm } from './actions'
import publicURL from '../../shared/publicURL'

function mapDispatchToProps(dispatch) {
    const actions = {
        fetchCaptcha: bindActionCreators(fetchCaptcha, dispatch),
        fetchSignUp: bindActionCreators(fetchSignUp, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch)
    }
    return { actions }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,
        type: state.ui.notification.type,
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
        
        this.handleSubmitForm = event => handleSubmitForm(this, event)
        this.changeState = () => changeState(this)
        this.buildDataArray = () => buildDataArray(this, I18n)
    }

    componentDidMount() {
        this.props.actions.fetchCaptcha()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type === 'success') {
            this.props.history.push(`${publicURL}/validateAccount`)
        }
    }

    render() {
        let renderComponent 
        if (this.props.isLoading) {
            renderComponent = <div style={{ height: '140px' }}><Loading message={`${I18n.t('commons.loading')}...`}/></div>
        } else {
            const user = this.buildDataArray()
            renderComponent = (
                <React.Fragment>
                    <h2 className="win-h2" style={{textAlign: 'center'}}>
                        { I18n.t('create_account.title') }
                    </h2>

                    <form className="authentication__form" onSubmit={(event) => this.handleSubmitForm(event)}>
                        <ConstructInputs data={user.personalInformation} />
                        <ConstructInputs data={user.passwordInformation} />
                        <ConstructInputs data={user.captchaInformation } />
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <img src={this.props.captcha ? this.props.captcha.img : null } alt='Captcha' />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '15px', color: '#158784', cursor: 'pointer' }} onClick={this.props.actions.fetchCaptcha} >
                            <span style={{ paddingRight: '5px' }} className="refreshIcon" />
                            <span>{I18n.t('login.refresh_captcha')}</span>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button className='btn --primary' style={{ margin: "20px" }}>
                                { I18n.t('commons.register') }
                            </button>
                            <p>
                                { I18n.t('create_account.already_have_account') }
                                &#160;
                                <Link to={`${publicURL}`}>
                                    { I18n.t('commons.sign_in') }
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

SignUp.defaultProps = {
    captcha: {}
}

SignUp.propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(SignUp, {contentCenter: true}))