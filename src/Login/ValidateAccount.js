import React, { Component } from 'react'
import './Login.css'

export default class ValidateAccount extends Component {
    
    constructor (props) {
        super(props)
        document.body.className = 'color-accent'
    }

    goLogin = () => {
        this.props.history.push(`/`)
    }

    render () {
        return (
            <div className="ms-grid" id="ValidateAccount">
                <div className="ms-row">
                    <div className="m-col-1-1 section1 color-white">
                        <img alt="" src="img/logo-flyve-login.png" className="img-login"/>
                    </div>
                    <div className="m-col-1-1 color-bg-light-vivid-mid" style={{paddingBottom: 20, marginBottom: 10}}>
                        <h2> Your user is not yet activated, please check your email and activate your account </h2>
                        <button className="win-button color-accent" onClick={this.goLogin}>Go to login</button>
                    </div>
                </div>
                <span className="credentials color-type-primary-alt" >
                    A solution powered by &nbsp; <img alt="" src="img/logo-teclib-blanc-1-2.png" />
                </span>
            </div>
        )
    }
}