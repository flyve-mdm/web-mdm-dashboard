import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from '../../components/Loading'
import Input from '../../components/Forms/Input'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import { uiSetNotification } from '../../store/ui/actions'
import withGLPI from '../../hoc/withGLPI'
import { I18n } from 'react-i18nify'
import location from '../../shared/location'
import handleMessage from '../../shared/handleMessage'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ForgotPassword extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: false,
            isRecoverSent: false,
            text: ''
        }

        this.handleRecover = (event) => {
            event.preventDefault()
            this.setState({
                isLoading: true
            }, async () => {
                if (this.props.glpi.sessionToken) {
                    try {
                        await this.props.glpi.killSession()
                    } catch (error) {}
                }
                try {
                    await this.props.glpi.genericRequest({
                        path: 'lostPassword',
                        requestParams: {
                          method: 'PUT',
                          body: JSON.stringify({ "email": this.state.text })
                        }
                    })
                    this.setState({
                        isRecoverSent: true,
                        isLoading: false
                    })
                    this.props.actions.setNotification(handleMessage({
                        type: 'success',
                        message: I18n.t('notifications.request_sent')
                    }))
                } catch (error) {
                    console.log(error)
                    this.setState({
                        isLoading: false
                    })
                    this.props.actions.setNotification(handleMessage({
                        type: 'warning', 
                        message: error
                    }))
                }
            })
        }
    }

    componentDidMount() {
        this.textInput.focus()
    }

    render() {
        
        let element
        
        if (!this.state.isRecoverSent) {
            element = (
                <div className="authentication-forgot__div">
                    <p>
                        {I18n.t('forgot_password.help_reset_password')}
                    </p>
                    <form onSubmit={(event) => { this.handleRecover(event) }}>
                        <Input 
                            label="" 
                            type="text" 
                            name="text" 
                            value={this.state.text} 
                            placeholder={I18n.t('commons.flyve_mdm_account')}
                            required
                            function={(name, value) => {this.setState({ text: value })}}
                            inputRef={(input) => { this.textInput = input }}
                        />

                        <button 
                            className="btn --secondary" 
                            type="button" 
                            onClick={() => this.props.history.push(`${location.pathname}/`)}
                        >
                            {I18n.t('commons.back')}
                        </button>

                        <button className="btn --primary" type="submit">
                            {I18n.t('login.reset_password')}
                        </button>
                    </form>
                    
                </div>
            )
        } else {
            element = (
                <div>
                    <p>
                        {I18n.t('forgot_password.reset_your_password')}
                    </p>
                    <button 
                        className="win-button" 
                        type="button" 
                        onClick={() => this.props.history.push(`${location.pathname}/`)}
                    >
                        {I18n.t('forgot_password.go_home')}
                    </button>
                </div>
            )
        }

        if (this.state.isLoading) {
            return (
                <Loading message={`${I18n.t('commons.sending')}...`} />
            )
        } else {
            return (
                <React.Fragment>
                    <h2 className="win-h2">
                        {I18n.t('forgot_password.title')}
                    </h2>

                    { element }
                </React.Fragment>
            )
        }
    }
}

ForgotPassword.propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}

export default withGLPI(withAuthenticationLayout(
    connect(null, mapDispatchToProps)(withHandleMessages(ForgotPassword)), {
        centerContent: true 
    }
))
