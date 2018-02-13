import React from 'react';
import { I18n, Translate } from 'react-i18nify';
import source_file from '../source_file.json';
import {
  TRANSLATIONS_AVAILABLES,
  LANGUAGE_DEFAULT,
  TRANSLATION_FOLDER,
  LANGUAGE_NAMES
} from './constants'

describe('Check if translations are available', () => {;
  beforeAll(()=> {
    let count = 1;
    let json  = {} ;

    json[LANGUAGE_DEFAULT] = source_file;

    I18n.setTranslations(json);

    for (let i in TRANSLATIONS_AVAILABLES) {
      import(`../${TRANSLATION_FOLDER}/${TRANSLATIONS_AVAILABLES[i]}.json`).then(jsonModule => {
        count++;
        json[TRANSLATIONS_AVAILABLES[i]] = jsonModule;
        if (count === LANGUAGE_NAMES.length) {
          I18n.setTranslations(json)
        }
      });
    }
  }) 

  it(`The login have translations in English, ${LANGUAGE_NAMES.join(', ')}`, () => {
    I18n.setLocale(LANGUAGE_DEFAULT); 
    expect(I18n.t('login.use_your_flyve_mdm_account')).toBe('Use your Flyve MDM account')
  })
});