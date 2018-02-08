import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import ToastNotifications from '../Utils/ToastNotifications'

export default class ValidateAccount extends Component {

    render () {
        return (
            <LoginContainer>
                <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                <div>
                    <h2 className="win-h2">Validate Account</h2>
                    <p>
                        Your user is not yet activated, please check your email and activate your account
                        <br />
                    </p>
                    <p><Link to='/'>Sign in</Link></p>

                </div>
            </LoginContainer>
        )
    }
}