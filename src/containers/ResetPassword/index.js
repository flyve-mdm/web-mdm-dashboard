import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from '../../components/Loading'
import ConstructInputs from '../../components/Forms'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import { fetchResetPassword } from '../../store/authentication/actions'
import { resetPassword, changeState, buildDataArray } from './actions';
import { I18n } from 'react-i18nify'
import publicURL from '../../shared/publicURL'

function mapDispatchToProps(dispatch) {
    const actions = {
        fetchResetPassword: bindActionCreators(fetchResetPassword, dispatch),
    }
    return { actions }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,
        type: state.ui.notification.type
    }
}

class ResetPassword extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isResetSent: false,
            email: '',
            password: '',
            passwordConfirmation: '',
            token: '',
            forceValidation: false
        }

        const search = this.props.location.search
        const params = new URLSearchParams(search)
        const token = params.get('token')

        if (token) {
            this.setState({ token })
        } else {
            this.props.history.push(`${publicURL}/`)
        }

        this.handleResetPassword = () => resetPassword(this)
        this.changeState = () => changeState(this)
        this.buildDataArray = () => buildDataArray(this, I18n)
    }

    render() {

        let element 
        if (!this.state.isResetSent) {
            const reset = this.buildDataArray()
            element = (
                <React.Fragment>
                    <div style={{ textAlign: 'left' }}>
                    <ConstructInputs data={reset.resetInformation} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className='btn btn--primary' style={{ margin: "20px" }} onClick={this.handleResetPassword}>
                        {I18n.t('login.reset_password')}
                    </button>
                </div>
                </React.Fragment>
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
                        onClick={() => this.props.history.push(`${publicURL}/`)}
                    >
                        {I18n.t('forgot_password.go_home')}
                    </button>
                </div>
            )
        }

        if (this.props.isLoading) {
            return (
                <div style={{ height: '140px' }}><Loading message={`${I18n.t('commons.sending')}...`} /></div>
            )
        } else {
            return (
                <React.Fragment>
                    <h2 style={{ textAlign: 'center' }}>
                        {I18n.t('login.reset_password')}
                    </h2>

                    {element}
                </React.Fragment>
            )
        }
    }
}

ResetPassword.propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
}
ResetPassword.defaultProps = {
    type: 'info',
}

export default withAuthenticationLayout(
    connect(mapStateToProps, mapDispatchToProps)(withHandleMessages(ResetPassword)), {
        centerContent: true
    }
)
