import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify';
// import source_file from './source_file.json';

const LENGUAGE_DEFAULT = 'en_GB';

let json = {};

// json[LENGUAGE_DEFAULT] = source_file;

I18n.setTranslations(json);

/**
 * 
 * @param {*} WrappedComponent -> React Component
 * @param {*} configurationObject  -> Object {language_default}
 */
const withI18NTranslation = (WrappedComponent) => {
  return class withI18NTranslation extends Component {
     /**
     * @param {*} i18nConvention -> String, e.g: 'pt_BR'
     */
    findI18NString = i18nConvention => {
      let path = i18nConvention === LENGUAGE_DEFAULT
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
        I18n.setLocale(LENGUAGE_DEFAULT);
        this.forceUpdate();
      });
    };
  
    componentDidMount() {
      this.findI18NString(this.props.locationLanguage);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (nextProps.locationLanguage !== this.props.locationLanguage) {
          this.findI18NString(nextProps.locationLanguage)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

withI18NTranslation.propTypes = {
  locationLanguage: PropTypes.string.isRequired
}

export default withI18NTranslation;