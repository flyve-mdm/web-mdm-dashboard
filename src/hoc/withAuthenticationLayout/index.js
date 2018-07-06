/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../shared/i18n'
import languagesList from '../../shared/i18n/languages'
import { AuthenticationConsumer } from '../../providers/AuthenticationProvider'

/**
 * Wrapper component with the basic structure of the authentication pages
 * (Flyve MDM logo in the header and a footer with a drop-down of languages)
 * @param {component} WrappedComponent Component to wrap
 * @param {object} stylesConfiguration Config styles of wrapper div
 * @return {component} The component with the authentication layout
 */
const withAuthenticationLayout = (WrappedComponent, configStyles) => {
  /**
   * Create authenticationLayout
   * @param {object} props
   */
  const authenticationLayout = props => {
    const style = {
      textAlign: configStyles.centerContent ? 'center' : null,
      width: props.width
    }
    return (
      <div className="authentication" style={style} >
        <section>
          <figure>
            <img alt="Flyve MDM Dashboard" src={require('../../assets/images/dashboard.svg')} />
          </figure>
          <AuthenticationConsumer>
            {value =>
              <WrappedComponent {...props} {...value} />
            }
          </AuthenticationConsumer>
        </section>
        <footer>
          <a href="https://flyve-mdm.com/privacy-policy/">
            {I18n.t('commons.terms_and_conditions')}
          </a>
          <br />
          <span>
            © 2017 - 2018 Teclib'.
          </span>
          <br/>
          <select
            onChange={ event => props.changeLanguage(event.target.value) }
            value={props.languageCurrent}
          >
            {languagesList()}
          </select>
        </footer>
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

  return authenticationLayout
}

export default withAuthenticationLayout
