import React, { Component } from 'react';
import { setupI18NConfiguration, i18nStore } from '../i18n-redux-helpers';

const withI18NTranslation = (WrappedComponent, configurationObject) => {
  return class withI18NSubscribe  extends Component {
    constructor(props) {
      super(props);    
      setupI18NConfiguration(configurationObject)
    }
  
    componentDidMount() {
      this.i18nUnsubscribe = i18nStore.subscribe(this.reRenderOnI18NEvent.bind(this));
    }
    componentWillUnmount() {
      this.i18nUnsubscribe();
    }
  
    reRenderOnI18NEvent() {
      this.forceUpdate();
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withI18NTranslation;