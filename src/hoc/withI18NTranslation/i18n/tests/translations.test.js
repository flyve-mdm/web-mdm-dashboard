/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

import {
  I18n
} from 'react-i18nify'
import source_file from '../source_file.json'
import {
  TRANSLATIONS_AVAILABLES,
  LANGUAGE_DEFAULT,
  TRANSLATION_FOLDER,
  LANGUAGE_NAMES
} from './constants'

describe('Check if translations are available', () => {
  beforeAll(() => {
    let json = {}

    json[LANGUAGE_DEFAULT] = source_file

    I18n.setTranslations(json)
    I18n.setLocale(LANGUAGE_DEFAULT)

  })

  it('login page should have english translations', () => {
    expect(I18n.t('login.title')).toBe('Sign in')
    expect(I18n.t('login.username_not_registered')).toBe(
      'The username entered is not registered. Try a different account or')
    expect(I18n.t('login.create_a_new')).toBe('create a new')
    expect(I18n.t('login.use_your_account')).toBe('Use your Flyve MDM account')
    expect(I18n.t('login.what_is_this')).toBe('What\'s this?')
    expect(I18n.t('login.no_account')).toBe('No account?')
    expect(I18n.t('login.create_one')).toBe('Create one!')
    expect(I18n.t('login.enter_password')).toBe('Enter password')
    expect(I18n.t('login.enter_password_for')).toBe('Enter the password for')
    expect(I18n.t('login.forgot_my_password')).toBe('Forgot my password')
  })
})
