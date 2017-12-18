import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoginEmail extends Component {

    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: ''
        }
    }
        
    LogInServer = (e) => {
        e.preventDefault()

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (re.test(this.props.email)) {
            this.props.changeEmail(this.props.email)
            this.props.changePhase(2)
        } else {
            this.setState({
                classInput: 'win-textbox color-line-alert',
                errorMessage: (
                    <p className="color-type-alert"> 
                        <span> The email entered is not registered. Try a different account or </span> 
                        <a>create an new</a>
                    </p>
                )
            })
        }
    }

    render () {
    
        return (
            <div className="emailSection">
                <h2 className="win-h2">Sign in</h2>
                <p>
                    Use your Flyve MDM account.
                    <br/>
                    <a href="https://flyve-mdm.com/"> What's this? </a>	
                </p>

                {this.state.errorMessage}

                <form onSubmit={this.LogInServer}>
                    <input 
                        type="email" 
                        name="email"
                        className={this.state.classInput} 
                        placeholder="Your Email Registered"
                        value={this.props.email} 
                        onChange={this.props.changeInput} 
                        required={true}
                    />
                    <button className="win-button color-accent">Next</button>
                </form>
                <p>No account? <a>Create one!</a></p>
            </div>
            
        )
    }
}

LoginEmail.propTypes = {
    email: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired
}

export default LoginEmail