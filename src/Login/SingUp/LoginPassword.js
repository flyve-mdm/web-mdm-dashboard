import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Glpi from '../../AdminDashboard/Api/Glpi'

class LoginPassword extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: ''
        }
    }

    LogInServer = (e) => {
        e.preventDefault()
        Glpi.login(this.props.email, this.props.password).then(([response, json]) => {
            Glpi.sessionToken(json.session_token)
            Glpi.getFullSession().then(([response, json]) => {
                this.props.history.push(`/app`)
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render () { 
        return (
            <div className="passwordSection">
                <h2 className="win-h2">Enter password</h2>
                <p>
                    Enter the password for
                    <br/>
                    {this.props.email}
                    <br/>
                    {this.state.errorMessage}
                </p>	
                <form onSubmit={this.LogInServer}>
                    <input 
                        type="password" 
                        name="password" 
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

                    <button type="submit" className="win-button win-button-primary">Sing in</button>
                </form>
                <Link to="/forgotPassword">Forgot my password</Link>
            </div>
        )
    }
}

LoginPassword.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default LoginPassword