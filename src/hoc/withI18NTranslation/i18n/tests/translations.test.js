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
    I18n.setLocale(LANGUAGE_DEFAULT); 
    
    // Useless meanwhile no exists translations
    // for (let i in TRANSLATIONS_AVAILABLES) {
    //   import(`../${TRANSLATION_FOLDER}/${TRANSLATIONS_AVAILABLES[i]}.json`).then(jsonModule => {
    //     count++;
    //     json[TRANSLATIONS_AVAILABLES[i]] = jsonModule;
    //     if (count === LANGUAGE_NAMES.length) {
    //       I18n.setTranslations(json)
    //     }
    //   });
    // }
  });

  it('login page should have english translations', () => {
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
    expect(I18n.t('create_account.create_account')).toBe('Create account')
    expect(I18n.t('create_account.enter_the_code_from_the_image')).toBe('Enter the code from the image')
    expect(I18n.t('create_account.do_you_already_have_an_account?')).toBe('Do you already have an account?')
    expect(I18n.t('create_account.full_name')).toBe('Full name')
    expect(I18n.t('create_account.password_(confirmation)')).toBe('Password (confirmation)')
    expect(I18n.t('create_account.register')).toBe('Register')
  });

  it('logout modal should have english translations', () => {
    expect(I18n.t('logout.close_session')).toBe('Close session')
    expect(I18n.t('logout.are_you_sure_you_want_to_close_your_session?')).toBe('Are you sure you want to close your session?')
  });

  it('about page should have english translations', () => {
    expect(I18n.t('about.overview.title')).toBe('Overview')
    expect(I18n.t('about.system_information.title')).toBe('System information')
    expect(I18n.t('about.help_center.title')).toBe('Help Center')
    expect(I18n.t('about.contact.title')).toBe('Contact')
    expect(I18n.t('about.release_notes.title')).toBe('Release notes')
    expect(I18n.t('about.term_of_use.title')).toBe('Term of use')
    expect(I18n.t('about.license.title')).toBe('License')
  });

  it('The common words are in the commons group', () => {
    expect(I18n.t('commons.email')).toBe('Email')
    expect(I18n.t('commons.name')).toBe('Name')
    expect(I18n.t('commons.password')).toBe('Password')
    expect(I18n.t('commons.back')).toBe('Back')
    expect(I18n.t('commons.sign_in')).toBe('Sign in')
    expect(I18n.t('commons.terms_and_conditions')).toBe('Terms and Conditions')
    expect(I18n.t('commons.devices')).toBe('Devices')
    expect(I18n.t('commons.applications')).toBe('Applications')
    expect(I18n.t('commons.files')).toBe('Files')
    expect(I18n.t('commons.fleets')).toBe('Fleets')
    expect(I18n.t('commons.invitations')).toBe('Invitations')
    expect(I18n.t('commons.users')).toBe('Users')
    expect(I18n.t('commons.devices_by_plataform')).toBe('Devices by plataform')
    expect(I18n.t('commons.pending_invitations')).toBe('Pending invitations')
    expect(I18n.t('commons.dashboard')).toBe('Dashboard')
    expect(I18n.t('commons.ok')).toBe('Ok')
    expect(I18n.t('commons.cancel')).toBe('Cancel')
    expect(I18n.t('commons.no_selection')).toBe('No Selection')
    expect(I18n.t('commons.map')).toBe('Map')
    expect(I18n.t('commons.call')).toBe('Call')
    expect(I18n.t('commons.send')).toBe('Send')
    expect(I18n.t('commons.sending')).toBe('Sending')
  });
});