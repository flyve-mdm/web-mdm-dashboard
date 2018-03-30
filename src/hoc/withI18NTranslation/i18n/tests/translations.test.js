import { I18n } from 'react-i18nify'
import source_file from '../source_file.json'
import {
  TRANSLATIONS_AVAILABLES,
  LANGUAGE_DEFAULT,
  TRANSLATION_FOLDER,
  LANGUAGE_NAMES
} from './constants'

describe('Check if translations are available', () => {
  beforeAll(()=> {
    let json  = {} 

    json[LANGUAGE_DEFAULT] = source_file

    I18n.setTranslations(json)
    I18n.setLocale(LANGUAGE_DEFAULT)
    
  })

  it('login page should have english translations', () => {
    expect(I18n.t('login.title')).toBe('Sign in')
    expect(I18n.t('login.username_not_registered')).toBe('The username entered is not registered. Try a different account or')
    expect(I18n.t('login.create_an_new')).toBe('create an new')
    expect(I18n.t('login.use_your_account')).toBe('Use your Flyve MDM account')
    expect(I18n.t('login.what_is_this')).toBe('What\'s this?')
    expect(I18n.t('login.no_account')).toBe('No account?')
    expect(I18n.t('login.create_one')).toBe('Create one!')
    expect(I18n.t('login.enter_password')).toBe('Enter password')
    expect(I18n.t('login.enter_password_for')).toBe('Enter the password for')
    expect(I18n.t('login.forgot_my_password')).toBe('Forgot my password')
  })
})