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

import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import {
  I18n
} from 'react-i18nify'
import {
  connect
} from 'react-redux'
import {
  withRouter
} from 'react-router'
import source_file_translation from './i18n/source_file.json'

function mapStateToProps(state, props) {
  return {
    languageDefault: state.language.languageDefault,
    languageCurrent: state.language.languageCurrent
  }
}

/**
 * Wrapper component to add the translations
 * @param {component} WrappedComponent React Component
 * @return {component} The translated component
 */
const withI18NTranslation = WrappedComponent => {
  class I18NTranslation extends PureComponent {
    /** @constructor */
    constructor(props) {
      super(props)
      I18n.setTranslations({
        [this.props.languageDefault]: source_file_translation
      })
    }

    /**
     * Find translation
     * @function findI18NString
     * @param {string} i18nConvention
     */
    findI18NString = i18nConvention => {
      let path = i18nConvention === this.props.languageDefault ?
        `./i18n/source_file` :
        `./i18n/translations/${i18nConvention}`

      import (`${path}.json`)
      .then(jsonModule => {
        I18n.setTranslations({
          [i18nConvention]: jsonModule
        })
        I18n.setLocale(i18nConvention)
        this.forceUpdate()
      }).catch((error) => {
        I18n.setTranslations(this.props.languageDefault)
        this.forceUpdate()
      })
    }

    /**
     * Execute findI18NString if it's necessary
     * @function componentDidUpdate
     * @param {object} prevProps
     */
    componentDidUpdate(prevProps) {
      if (this.props.languageCurrent !== prevProps.languageCurrent) {
        this.findI18NString(this.props.languageCurrent)
      }
    }

    /**
     * Execute componentDidMount
     * @function componentDidMount
     */
    componentDidMount() {
      this.findI18NString(this.props.languageCurrent)
    }

    /**
     * Render component
     * @function render
     */
    render() {
      return <WrappedComponent { ...this.props
      }
      />
    }
  }

  I18NTranslation.propTypes = {
    languageDefault: PropTypes.string.isRequired,
    languageCurrent: PropTypes.string.isRequired
  }

  return withRouter(
    connect(mapStateToProps, null)(I18NTranslation)
  )
}

export default withI18NTranslation
