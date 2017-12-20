import React, { Component } from 'react'

export default class LoginContainer extends Component {
  render() {
    return (
        <div className="LoginForm">
            <img alt="" src="images/logo2.png" className="img-login"/>

            { this.props.children }

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
