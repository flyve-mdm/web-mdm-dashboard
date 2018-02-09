import { I18n } from 'react-i18nify';

/*
* Import JSON and set it in I18n store
* @ctx -> React Component
* @i18nConvention -> i18n country name [es-ES, pt-PT]
* */
const findI18NString = (ctx, i18nConvention) => {
  import('./strings/' + i18nConvention + '.json').then(jsonModule => {
    I18n.setTranslationsGetter(() => {
        const json = {};
        json[i18nConvention] = jsonModule;
        return json
    });
    I18n.setLocale(i18nConvention);
    ctx.forceUpdate();
  }).catch(() => {
    I18n.setLocale('en-GB');
    ctx.forceUpdate();
  });

};

export default findI18NString;