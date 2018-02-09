import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeLanguage } from './DuckController';

function mapDispatchToProps(dispatch) {
    const actions = {
        changeLanguage: bindActionCreators(changeLanguage, dispatch)
    }
    return { actions }
}

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
                    <button onClick={() => this.props.actions.changeLanguage('pt-PT')}>Portugues</button>
                    <button onClick={() => this.props.actions.changeLanguage('en-GB')}>Ingles</button>
                    <button onClick={() => this.props.actions.changeLanguage('fr-FR')}>Francia</button>
                    <button onClick={() => this.props.actions.changeLanguage('es-ES')}>Español</button>                    
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

export default connect(
    null,
    mapDispatchToProps
)(LoginContainer)