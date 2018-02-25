import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { I18n } from 'react-i18nify'
import { changeLanguage } from '../../store/i18n/actions'

function mapDispatchToProps(dispatch) {
    const actions = {
        changeLanguage: bindActionCreators(changeLanguage, dispatch)
    }
    return { actions }
}

/**
 * Wrapper a component with divs's stylizeds
 * With a select input to change language
 * @param {* component} WrappedComponent   - Component to wrapper it
 * @param {* object } stylesConfiguration  - Config styles of wrapper div
 */
const withAuthenticationLayout = (WrappedComponent, stylesConfiguration) => {
    const authenticationLayout = props => {
        const style = {
            textAlign: (stylesConfiguration && stylesConfiguration.centerContent) ? 'center' : null,
            width: props.width
        }

        return (
            <div className="LoginBlock">
                <div className="LoginForm" style={style}>
                    <div className="content">
                        <div className="img-login">
                            <img alt="Flyve MDM Dashboard" src="images/logo2.png" />
                        </div>
    
                        <WrappedComponent {...props} />

                    </div>
    
                    <div className="credentials">
                        <a href="https://flyve-mdm.com/privacy-policy/">
                            {I18n.t('commons.terms_and_conditions')}
                        </a>
                        <br />
                        <span>
                            © 2017 Teclib'.
                        </span>
                    </div>
                    {
                        <React.Fragment>
                            <button onClick={() => props.actions.changeLanguage('en_GB')}>English</button>
                            <button onClick={() => props.actions.changeLanguage('pt_BR')}>Portuguese</button>
                            <button onClick={() => props.actions.changeLanguage('fr_FR')}>French</button>
                            <button onClick={() => props.actions.changeLanguage('es_ES')}>Spain</button>
                        </React.Fragment>
                    }
                </div>
            </div>
        )
    }

    authenticationLayout.defaultProps = {
        centerContent: true,
        width: 340
    }
    
    authenticationLayout.propTypes = {
        centerContent: PropTypes.bool.isRequired,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }

    return connect(null, mapDispatchToProps)(authenticationLayout)
}



export default withAuthenticationLayout