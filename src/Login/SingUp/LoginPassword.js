import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Glpi from '../../Utils/GlpiApi'
import config from '../../config.json'
import Loading from '../../Utils/Loading'
import { I18n } from 'react-i18nify';

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
        Glpi.login({ userName: this.props.username, userPassword: this.props.password }).then((response) => {
            let email = response.userEmails.length > 0 ? response.userEmails[0].email : ''
            const user = {
                id: response.userData.id,
                name: response.userData.name,
                email: email,
                picture: null
            }
            localStorage.setItem('sessionToken', response.sessionToken)
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.props.changeCurrentUser(user)
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
                        { I18n.t('login.enter_the_password_for') }
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
                            placeholder={I18n.t('commons.password')}
                            value={this.props.password}
                            onChange={this.props.changeInput}
                            required={true}
                        />
                        <button
                            className="win-button"
                            type="button"
                            onClick={() => this.props.changePhase(1)}
                        >
                        { I18n.t('commons.back') }
                    </button>

                    <button type="submit" className="win-button win-button-primary">
                        { I18n.t('commons.sign_in') }
                    </button>
                    </form>
                    <Link to="/forgotPassword">
                        { I18n.t('login.forgot_my_password') }
                    </Link>
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