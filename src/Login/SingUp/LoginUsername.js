import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { i18n } from '../../i18n/i18n-redux-helpers';

class LoginUsername extends Component {

    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.usernameInput.focus()
    }

    LogInServer = (e) => {
        e.preventDefault()
        if (this.props.username) {
            this.props.changeUsername(this.props.username)
            this.props.changePhase(2)
        } else {
            this.setState({
                classInput: 'win-textbox color-line-alert',
                errorMessage: (
                    <p className="color-type-alert"> 
                        <span> The username entered is not registered. Try a different account or </span> 
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
                    {i18n('login.instruction')}
                    <br/>
                    <a href="https://flyve-mdm.com/"> {i18n('login.what_s_this')} </a>	
                </p>

                {this.state.errorMessage}

                <form onSubmit={this.LogInServer}>
                    <input 
                        type="text" 
                        name="username"
                        ref={(input) => { this.usernameInput = input; }}
                        className={this.state.classInput} 
                        placeholder={i18n('login.username')}
                        value={this.props.username} 
                        onChange={this.props.changeInput} 
                        required={true}
                    />
                    <button className="win-button color-accent">{i18n('login.next')}</button>
                </form>
                {
                    !this.props.selfRegistration ? '' : (
                        <p>{i18n('login.no_account?')} <Link to='/signIn'>{i18n('login.create_one!')}</Link></p>
                    )
                }
               
            </div>
            
        )
    }
}

LoginUsername.propTypes = {
    username: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    changeUsername: PropTypes.func.isRequired,
    selfRegistration: PropTypes.bool.isRequired
}

export default LoginUsername