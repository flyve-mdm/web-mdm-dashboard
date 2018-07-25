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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'

const I18nContext = React.createContext()
export const I18nConsumer = I18nContext.Consumer

export class I18nProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageCurrent: I18n.languageCurrent,
      changeLanguage: this.changeLanguage,
      changeLanguageFallBack: this.changeLanguageFallBack,
    }
  }

  changeLanguage = (language = I18n.languageDefault) => {
    I18n.setPolyglot(language)
    this.setState({ languageCurrent: language })
  }

  changeLanguageFallBack = () => {
    I18n.setPolyglot(I18n.languageDefault)
    this.setState({
      languageCurrent: I18n.languageDefault,
    })
  }

  render() {
    const context = { ...this.state }
    const component = (
      <I18nContext.Provider value={{ ...context }}>
        {this.props.children}
      </I18nContext.Provider>
    )
    return Children.only(component)
  }
}

I18nProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
