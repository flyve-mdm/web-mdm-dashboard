import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                        <img alt="" src="images/logo2.png"/>
                    </div>

                    { this.props.children }
                </div>

                <div className="credentials">
                    <a href="https://flyve-mdm.com/privacy-policy/">Terms and Conditions</a>
                    <br />
                    <span>
                        © 2017 Teclib'.
                    </span>
                </div>
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