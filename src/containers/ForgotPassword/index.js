import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../../components/Loading'
import Input from '../../components/Forms/Input'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'

class ForgotPassword extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isRecoverSent: false
        }
    }

    changeInput = (name, value) => {
        this.props.actions.changeEmail(value)
    }

    recover = (event) => {
        event.preventDefault()
        this.setState({
            isRecoverSent: true
        })
        this.props.actions.recoverPassword()
    }    

    render() {
        
        let element
        
        if (!this.state.isRecoverSent) {
            element = (
                <div>
                    <p>
                        We can help you reset password and security info.
                        Please, enter your Flyve MDM account in the following text box.
                    </p>
                    <form onSubmit={this.recover}>
                        <Input 
                            label="" 
                            type="text" 
                            name="email" 
                            value={this.props.email} 
                            placeholder="Flyve MDM account" 
                            required
                            function={this.changeInput}
                        />

                        <button 
                            className="win-button" 
                            type="button" 
                            onClick={() => this.props.history.push('/')}
                        >
                            Back 
                        </button>

                        <button 
                            className="win-button win-button-primary"
                            type="submit" 
                        >
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
                    <h2>
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
    email: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default withAuthenticationLayout(ForgotPassword, { centerContent: true })