import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Glpi from 'javascript-library-glpi'
import config from '../../config.json'
import Loading from '../../Utils/Loading'

class LoginPassword extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: '',
            isLoading: false
        }
    }

    componentDidMount() {
        if (this.passwordInput) {
            this.passwordInput.focus()
        }        
    }

    LogInServer = (e) => {
        e.preventDefault()
        this.setState({
            isLoading: true
        })
        let glpi = new Glpi({ url: config.URL_GLPI_API })
        glpi.login(this.props.username, this.props.password).then((response) => {
            const user = {
                id: response.userData.id,
                name: response.userData.name,
                email: response.userEmails[0].email,
                picture: null
            }
            localStorage.setItem('sessionToken', response.sessionToken)
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.props.history.push(`/app`)
        })
        .catch((error) => {
            console.log(error)
            this.setState({
                isLoading: false
            })
            this.props.changeNotificationMessage({ title: config.APP_NAME, body: `${error[0]}\n${error[1]}` })
        })
    }

    render () { 
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <div style={{margin: 50}}>
                    <Loading message="Loading..." />
                </div>
            )

        } else {
            renderComponent = (
                <div className="passwordSection">
                    <h2 className="win-h2">Enter password</h2>
                    <p>
                        Enter the password for
                    <br />
                        {this.props.username}
                        <br />
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
        
        return renderComponent
    }
}

LoginPassword.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    changeCurrentUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    changeNotificationMessage: PropTypes.func.isRequired
}

export default LoginPassword