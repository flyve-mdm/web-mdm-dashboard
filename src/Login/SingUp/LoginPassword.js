import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Glpi from 'javascript-library-glpi'
import config from '../../config.json'

class LoginPassword extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.passwordInput.focus()
    }

    LogInServer = (e) => {
        e.preventDefault()
        let glpi = new Glpi({ url: config.URL_GLPI_API })
        glpi.login(this.props.username, this.props.password).then((response) => {
            localStorage.setItem('sessionToken', response.sessionToken)
            this.props.history.push(`/app`)
        })
        .catch((error) => {
            this.props.changeNotificationMessage({ title: config.APP_NAME, body: `${error[0]}\n${error[1]}` })
        })
    }

    render () { 
        return (
            <div className="passwordSection">
                <h2 className="win-h2">Enter password</h2>
                <p>
                    Enter the password for
                    <br/>
                    {this.props.username}
                    <br/>
                    {this.state.errorMessage}
                </p>	
                <form onSubmit={this.LogInServer}>
                    <input 
                        type="password" 
                        name="password" 
                        ref={(input) => { this.passwordInput = input; }} 
                        className={this.state.classInput}
                        placeholder="Password"
                        value={this.props.password} 
                        onChange={this.props.changeInput} 
                        required={true}
                    />
                    <button 
                        className="win-button" 
                        type="button" 
                        onClick={() => this.props.changePhase(1)}
                    >
                        Back 
                    </button>

                    <button type="submit" className="win-button win-button-primary">
                        Sign in
                    </button>
                </form>
                <Link to="/forgotPassword">Forgot my password</Link>
            </div>
        )
    }
}

LoginPassword.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    changeNotificationMessage: PropTypes.func.isRequired
}

export default LoginPassword