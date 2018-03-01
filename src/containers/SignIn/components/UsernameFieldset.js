import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18nify';

class UsernameFieldset extends Component {

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
            <div className="authentication-email__div">
                <h2 className="win-h2">Sign in</h2>
                <p className="paragraph__p --description">
                    {I18n.t('login.use_your_flyve_mdm_account')}
                    <br/>
                    <a href="https://flyve-mdm.com/">
                        {I18n.t('login.what_s_this')}
                    </a>	
                </p>

                {this.state.errorMessage}
 
                <form onSubmit={this.LogInServer}>
                    <input 
                        type="text" 
                        name="username"
                        ref={(input) => { this.usernameInput = input; }} 
                        className={this.state.classInput} 
                        placeholder={I18n.t('login.username')}
                        value={this.props.username} 
                        onChange={this.props.changeInput} 
                        required={true}
                    />
                    <button className="btn --primary">
                        {I18n.t('login.next')}
                    </button>
                </form>
                {
                    !this.props.selfRegistration ? '' : (
                        <p>
                            {I18n.t('login.no_account?')}
                            &nbsp;
                            <Link to='/signUp'>
                                {I18n.t('login.create_one!')}
                            </Link>
                        </p>
                    )
                }
               
            </div>
            
        )
    }
}

UsernameFieldset.propTypes = {
    username: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    selfRegistration: PropTypes.bool.isRequired
}

export default UsernameFieldset