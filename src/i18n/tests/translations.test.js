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
    // Useless meanwhile no exists translations
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

  it('login page should have english translations', () => {
    I18n.setLocale(LANGUAGE_DEFAULT); 
    expect(I18n.t('login.use_your_flyve_mdm_account')).toBe('Use your Flyve MDM account')
    expect(I18n.t('login.what_s_this')).toBe('What\'s this?')
    expect(I18n.t('login.username')).toBe('Username')
    expect(I18n.t('login.next')).toBe('Next')
    expect(I18n.t('login.no_account?')).toBe('No account?')
    expect(I18n.t('login.create_one!')).toBe('Create one!')
    expect(I18n.t('login.enter_password')).toBe('Enter password')
    expect(I18n.t('login.enter_the_password_for')).toBe('Enter the password for')
    expect(I18n.t('login.forgot_my_password')).toBe('Forgot my password')
  });

  it('create account page should have english translations', () => {
    I18n.setLocale(LANGUAGE_DEFAULT); 
    expect(I18n.t('create_account.create_account')).toBe('Create account')
    expect(I18n.t('create_account.enter_the_code_from_the_image')).toBe('Enter the code from the image')
    expect(I18n.t('create_account.do_you_already_have_an_account?')).toBe('Do you already have an account?')
    expect(I18n.t('create_account.full_name')).toBe('Full name')
    expect(I18n.t('create_account.password_(confirmation)')).toBe('Password (confirmation)')
    expect(I18n.t('create_account.register')).toBe('Register')
  });

  it('The common words are in the commons group', () => {
    I18n.setLocale(LANGUAGE_DEFAULT); 
    expect(I18n.t('commons.email')).toBe('Email')
    expect(I18n.t('commons.name')).toBe('Name')
    expect(I18n.t('commons.password')).toBe('Password')
    expect(I18n.t('commons.back')).toBe('Back')
    expect(I18n.t('commons.sign_in')).toBe('Sign in')
    expect(I18n.t('commons.terms_and_conditions')).toBe('Terms and Conditions')
  })
});