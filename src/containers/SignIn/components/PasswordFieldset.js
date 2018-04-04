import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18nify'
import Loading from '../../../components/Loading'

class PasswordFieldset extends Component {
    
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

    render () { 
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <div style={{margin: 50}}>
                    <Loading message={`${I18n.t('commons.loading')}...`} />
                </div>
            )

        } else {
            renderComponent = (
                <div className="authentication-password__div">
                    <h2 className="win-h2">
                        { I18n.t('login.enter_password') }
                    </h2>
                    <p>
                        { I18n.t('login.enter_password_for') }
                    <br />
                        {this.props.username}
                        <br />
                        {this.state.errorMessage}
                    </p>
                    <form onSubmit={this.props.handleOnSubmit}>
                        <input
                            type="password"
                            name="password"
                            ref={(input) => { this.passwordInput = input }}
                            className={this.state.classInput}
                            placeholder={I18n.t('commons.password')}
                            value={this.props.password}
                            onChange={this.props.changeInput}
                            required={true}
                        />

                        <button className="btn --secondary" type="button" onClick={
                            () => this.props.changePhase(1)
                        }>
                            { I18n.t('commons.back') }
                        </button>

                        <button type="submit" className="btn --primary">
                            { I18n.t('commons.sign_in') }
                        </button>
                    </form>
                    
                    <p>
                        <Link to={`${process.env.PUBLIC_URL}/forgotPassword`}>
                            { I18n.t('login.forgot_my_password') }
                        </Link>
                    </p>
                </div>
            )
        }
        
        return renderComponent
    }
}

PasswordFieldset.propTypes = {
    password: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    handleOnSubmit: PropTypes.func.isRequired
}

export default PasswordFieldset