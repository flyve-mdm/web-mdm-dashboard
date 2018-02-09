import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { changeLocale } from '../i18n/i18n-redux-helpers';

class LoginContainer extends Component {
    render() {

        const style = {
            textAlign: this.props.centerContent ? 'center' : null,
            width: this.props.width
        }
        return (
            <div className="LoginFormContainer">
                <div className="LoginForm" style={style}>
                    <div className="content">
                        <div className="img-login">
                            <img alt="" src="images/logo2.png" />
                        </div>

                        {this.props.children}
                    </div>

                    <div className="credentials">
                        <a href="https://flyve-mdm.com/privacy-policy/">Terms and Conditions</a>
                        <br />
                        <span>
                            © 2017 Teclib'.
                        </span>
                    </div>
                    <button onClick={() => changeLocale("pt-PT")}>Portugues</button>
                    <button onClick={() => changeLocale("en-GB")}>Ingles</button>
                    <button onClick={() => changeLocale("fr-FR")}>Francia</button>
                    <button onClick={() => changeLocale("es-ES")}>Español</button>
                </div>
            </div>
        )
    }
}

LoginContainer.defaultProps = {
    centerContent: true,
    width: 340
}

LoginContainer.propTypes = {
    centerContent: PropTypes.bool.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default LoginContainer