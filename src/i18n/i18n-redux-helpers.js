import { createStore } from 'redux';

import Polyglot from 'node-polyglot';

const polyglot = new Polyglot();
const i18n = key => polyglot.t(key);
const i18nReducer = (state, event) => ({"locale" : event.locale});
const i18nStore = createStore(i18nReducer, {locale : ""});

let i18nFileFetchConfiguration = {
  serverPath : "",
  clientPath : "",
  localeFallback : "en-GB",
  initialState : {
    locale : "en-GB", 
    data : {

    }
  }
};

const changeLocale = locale => {
  if ( i18nStore.getState().locale !== locale ) { 
    import('./strings/' + locale + '.json').then(json => {
      polyglot.replace(json);
      i18nStore.dispatch({type : "locale-change", locale : locale});
    }).catch(() => {
      changeLocale(i18nFileFetchConfiguration.fallBackLocale)
    });
  }
}

/**
 ** Configuration of the module
 ** localeFallback : Locale to be used when another selected locale is not found
 ** initialState : The initial state to be used, is an object with locale (the current locale) and the data
 **/
const setupI18NConfiguration = configuration => {
  if ( configuration.initialState ) {
    polyglot.replace(configuration.initialState.data);
    i18nStore.dispatch({
      type : "locale-change",
      locale : configuration.initialState.locale
    });
  }
  i18nFileFetchConfiguration = configuration;
};

export {
  changeLocale,
  i18n,
  setupI18NConfiguration,
  i18nStore
}