import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { I18n } from 'react-i18nify'

import { changeLanguage } from '../../store/i18n/actions'

function mapDispatchToProps(dispatch) {
    return { 
        changeLanguage: bindActionCreators(changeLanguage, dispatch) 
    }
}

/**
 * Wrapper a component with divs's stylizeds
 * With a select input to change language
 * @param {* component} WrappedComponent   - Component to wrapper it
 * @param {* object } stylesConfiguration  - Config styles of wrapper div
 */
const withAuthenticationLayout = (WrappedComponent, configStyles) => {
    const authenticationLayout = props => {
        const style = {
            textAlign: configStyles.centerContent ? 'center' : null,
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
                        <br/>
                        <span className='select__span__language'>
                        Idioma
                            <select className='select__input__language' onChange={
                                event => props.changeLanguage(event.target.value)
                            }>
                                <option value='en_GB'>English</option>
                                <option value='pt_BR'>Portuguese</option>
                                <option value='fr_FR'>French</option>
                                <option value='es_ES'>Spain</option>
                            </select>
                        </span>
                    </div>
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