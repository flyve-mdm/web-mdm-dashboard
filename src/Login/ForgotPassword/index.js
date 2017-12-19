import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../Utils/Forms'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail, recoverPassword } from '../DuckController'
import Loading from '../../Utils/Loading'


function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading,
        isRecoverPasswordSuccess: state.Login.isRecoverPasswordSuccess
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        recoverPassword: bindActionCreators(recoverPassword, dispatch),
        changeEmail: bindActionCreators(changeEmail, dispatch)
    }
    return { actions }
}

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
                        Please, enter your Flyve MDM account in the text box.
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
                        To reset your password, open your mailbox and find the email with the subject "Reset Password" and open the link to create a new password.
                    </p>
                </div>
            )
        }

        if (this.props.isLoading) {

            return <Loading message="Sending..." />

        } else {
            return (
                <div className="LoginForm">
                    <img alt="" src="images/logo2.png" className="img-login"/>

                    <h2>
                        Recover your <br/>
                        account
                    </h2>

                    { element }
                    
                    <div className="credentials">
                        <a href="https://flyve-mdm.com/privacy-policy/">Terms and Conditions</a>
                        <br />
                        <span>
                            © 2017 Teclib'.
                        </span>
                    </div>
                </div>
            )
        }
    }
}

ForgotPassword.propTypes = {
    email: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword)
    