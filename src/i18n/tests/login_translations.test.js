import React from 'react';
import { I18n, Translate } from 'react-i18nify';
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

  it(`The login have translations in ${LANGUAGE_NAMES.join(', ')}`, () => {
    I18n.setLocale(LANGUAGE_DEFAULT); 
    expect(I18n.t('login.instruction')).toBe('Use your Flyve MDM account')
    I18n.setLocale('pt_BR'); 
    expect(I18n.t('login.instruction')).toBe('Use sua conta do Flyve MDM')
    I18n.setLocale('es'); 
    expect(I18n.t('login.instruction')).toBe('Use su cuenta Flyve MDM')
    I18n.setLocale('fr'); 
    expect(I18n.t('login.instruction')).toBe('Utilisez votre compte Flyve MDM')
  })
});