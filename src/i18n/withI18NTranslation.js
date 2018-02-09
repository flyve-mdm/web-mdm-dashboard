import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify';

/**
 * 
 * @param {*} WrappedComponent -> React Component
 * @param {*} configurationObject  -> Object {language_default}
 */
const withI18NTranslation = (WrappedComponent, language_default) => {
  return class withI18NTranslation extends Component {
    constructor(props) {
      super(props);

      this.language_default = language_default;
    }

     /**
     * @param {*} i18nConvention -> String, e.g: 'en_GB'
     */
    findI18NString = i18nConvention => {
      import(`./strings/${i18nConvention}.json`).then(jsonModule => {
        I18n.setTranslationsGetter(() => {
            const json = {};
            json[i18nConvention] = jsonModule;
            return json
        });
        I18n.setLocale(i18nConvention);
        this.forceUpdate();
      }).catch(() => {
        I18n.setLocale(this.language_default);
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