import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Loading from '../../components/Loading'
import Input from '../../components/Forms/Input'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import { fetchRecoverPassword } from '../../store/authentication/actions'
import { handleRecover } from './actions';

function mapDispatchToProps(dispatch) {
    const actions = {
        fetchRecoverPassword: bindActionCreators(fetchRecoverPassword, dispatch),
    }
    return { actions }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,
        type: state.ui.notification.type
    }
}

class ForgotPassword extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isRecoverSent: false,
            text: ''
        }

        this.handleRecover = event => handleRecover(this, event)
    }

    componentDidMount() {
        this.textInput.focus();
    }

    render() {
        
        let element
        
        if (!this.state.isRecoverSent) {
            element = (
                <div className="authentication-forgot__div">
                    <p>
                        We can help you reset password and security info.
                        Please, enter your Flyve MDM account in the following text box.
                    </p>
                    <form onSubmit={(event) => { this.handleRecover(event) }}>
                        <Input 
                            label="" 
                            type="text" 
                            name="text" 
                            value={this.state.text} 
                            placeholder="Flyve MDM account" 
                            required
                            function={(name, value) => {this.setState({ text: value })}}
                            inputRef={(input) => { this.textInput = input }}
                        />

                        <button className="btn --secondary" type="button" onClick={
                            () => this.props.history.push('/')
                        }>
                            Back 
                        </button>

                        <button className="btn --primary" type="submit">
                            Sing in
                        </button>
                    </form>
                    
                </div>
            )
        } else {
            element = (
                <div>
                    <p>
                        To reset your password, open your mailbox and
                        find the email with the subject "Reset Password"
                        and open the link to create a new password.
                    </p>
                    <button 
                        className="win-button" 
                        type="button" 
                        onClick={() => this.props.history.push('/')}
                    >
                        Go home
                    </button>
                </div>
            )
        }

        if (this.props.isLoading) {
            return (
                <Loading message="Sending..." />
            )
        } else {
            return (
                <React.Fragment>
                    <h2 className="win-h2">
                        Recover your <br/>
                        account
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
    type: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default withAuthenticationLayout(
    connect(mapStateToProps, mapDispatchToProps)(ForgotPassword), {
        centerContent: true 
    }
)
