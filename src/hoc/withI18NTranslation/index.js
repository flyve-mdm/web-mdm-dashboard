import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import source_file_translation from '../../i18n/source_file.json'

function mapStateToProps(state, props) {
  return {
      languageDefault: state.language.languageDefault,
      languageCurrent: state.language.languageCurrent
  }
}

/**
 * Translations HOC
 * @param {*} WrappedComponent -> React Component
 */
const withI18NTranslation = WrappedComponent => {
  class I18NTranslation extends Component {
     /**
     * @param {*} i18nConvention -> String, e.g: 'pt_BR'
     */
    findI18NString = i18nConvention => {
      let path = i18nConvention === this.props.languageDefault
        ? `./source_file`
        : `./translations/${i18nConvention}`;
        
      import(`${path}.json`).then(jsonModule => {
        I18n.setTranslationsGetter(() => {
          const json = {};
          json[i18nConvention] = jsonModule;
          return json
        });
        I18n.setLocale(i18nConvention);
        this.forceUpdate();
      }).catch(() => {
        I18n.setLocale(this.props.languageDefault);
        this.forceUpdate();
      });
    };
  
    componentWillMount() {
      let json = {};
      json[this.props.languageDefault] = source_file_translation
      I18n.setTranslations(json);
    }

    componentDidMount() {
      this.findI18NString(this.props.languageCurrent);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.languageCurrent !== this.props.languageCurrent) {
          this.findI18NString(nextProps.languageCurrent)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
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

export default withI18NTranslation;