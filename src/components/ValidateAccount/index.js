import React from 'react'
import { Link } from 'react-router-dom'

import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import ToastNotifications from '../ToastNotifications'

const ValidateAccount = () => {
    return (
        <React.Fragment>
            <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
            <div>
                <h2 className="win-h2">Validate Account</h2>
                <p>
                    Your user is not yet activated, please check your email and activate your account
                    <br />
                </p>
                <p><Link to='/'>Sign in</Link></p>
            </div>
        </React.Fragment>
    )
}

export default withAuthenticationLayout(ValidateAccount)