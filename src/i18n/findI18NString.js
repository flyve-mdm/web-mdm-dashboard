import { I18n } from 'react-i18nify';

const LANGUAGE_DEFAULT = 'en_GB';
const TRANSLATION_FOLDER = 'strings';

/*
* Import JSON and set it in I18n store
* @ctx -> React Component
* @i18nConvention -> i18n translation name [es_ES, pt_PT]
* */
const findI18NString = (ctx, i18nConvention) => {
  import(`./${TRANSLATION_FOLDER}/${i18nConvention}.json`).then(jsonModule => {
    I18n.setTranslationsGetter(() => {
        const json = {};
        json[i18nConvention] = jsonModule;
        return json
    });
    I18n.setLocale(i18nConvention);
    ctx.forceUpdate();
  }).catch(() => {
    I18n.setLocale(LANGUAGE_DEFAULT);
    ctx.forceUpdate();
  });

};

export default findI18NString;