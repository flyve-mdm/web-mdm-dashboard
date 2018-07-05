/** import dependencies */
import React from 'react'
import {
  I18n
} from 'react-i18nify'

/**
 * Generate array with the different available language options
 * @function languages
 * @return {array}
 */
export default () => {
  const languages = [{
      abbreviation: 'en_GB',
      name: I18n.t('commons.english'),
      country: I18n.t('commons.Britain'),
      isAvailable: true
    },
    {
      abbreviation: 'cs_CZ',
      name: I18n.t('commons.czech'),
      country: I18n.t('commons.Czech_Republic'),
      isAvailable: true
    },
    {
      abbreviation: 'fr_FR',
      name: I18n.t('commons.french'),
      country: I18n.t('commons.France'),
      isAvailable: false
    },
    {
      abbreviation: 'es_MX',
      name: I18n.t('commons.spanish'),
      country: I18n.t('commons.Mexico'),
      isAvailable: false
    },
    {
      abbreviation: 'es_AR',
      name: I18n.t('commons.spanish'),
      country: I18n.t('commons.Argentina'),
      isAvailable: false
    },
    {
      abbreviation: 'es_ES',
      name: I18n.t('commons.spanish'),
      country: I18n.t('commons.Spain'),
      isAvailable: false
    },
    {
      abbreviation: 'ar_EG',
      name: I18n.t('commons.arabic'),
      country: I18n.t('commons.Egypt'),
      isAvailable: false
    },
    {
      abbreviation: 'ar_SA',
      name: I18n.t('commons.arabic'),
      country: I18n.t('commons.Saudi_Arabia'),
      isAvailable: false
    },
    {
      abbreviation: 'ca_ES',
      name: I18n.t('commons.catalan'),
      country: I18n.t('commons.Spain'),
      isAvailable: false
    },
    {
      abbreviation: 'gl_ES',
      name: I18n.t('commons.galician'),
      country: I18n.t('commons.Spain'),
      isAvailable: false
    },
    {
      abbreviation: 'de_DE',
      name: I18n.t('commons.german'),
      country: I18n.t('commons.Germany'),
      isAvailable: false
    },
    {
      abbreviation: 'he_IL',
      name: I18n.t('commons.hebrew'),
      country: I18n.t('commons.Israel'),
      isAvailable: false
    },
    {
      abbreviation: 'hi_IN',
      name: I18n.t('commons.hindi'),
      country: I18n.t('commons.India'),
      isAvailable: false
    },
    {
      abbreviation: 'hu_HU',
      name: I18n.t('commons.hungarian'),
      country: I18n.t('commons.Hungary'),
      isAvailable: false
    },
    {
      abbreviation: 'it_IT',
      name: I18n.t('commons.italian'),
      country: I18n.t('commons.Italy'),
      isAvailable: false
    },
    {
      abbreviation: 'ko_KR',
      name: I18n.t('commons.korean'),
      country: I18n.t('commons.Korea'),
      isAvailable: false
    },
    {
      abbreviation: 'pl_PL',
      name: I18n.t('commons.polish'),
      country: I18n.t('commons.Poland'),
      isAvailable: false
    },
    {
      abbreviation: 'pt_BR',
      name: I18n.t('commons.portuguese'),
      country: I18n.t('commons.Brazil'),
      isAvailable: false
    },
    {
      abbreviation: 'pt_PT',
      name: I18n.t('commons.portuguese'),
      country: I18n.t('commons.Portugal'),
      isAvailable: false
    },
    {
      abbreviation: 'ja_JP',
      name: I18n.t('commons.japanese'),
      country: I18n.t('commons.Japon'),
      isAvailable: false
    },
    {
      abbreviation: 'ru_RU',
      name: I18n.t('commons.russian'),
      country: I18n.t('commons.Russia'),
      isAvailable: false
    },

    {
      abbreviation: 'ur_PK',
      name: I18n.t('commons.China'),
      country: I18n.t('commons.Pakistanxx'),
      isAvailable: false
    },
    {
      abbreviation: 'zh_CN',
      name: I18n.t('commons.chinese'),
      country: I18n.t('commons.China'),
      isAvailable: false
    },
    {
      abbreviation: 'th_TH',
      name: I18n.t('commons.thai'),
      country: I18n.t('commons.Thailand'),
      isAvailable: false
    },
  ]
  let renderList = []
  languages.forEach(language => {
    if (language.isAvailable) {
      renderList.push(
        <option value={language.abbreviation} key={language.abbreviation}>
          {language.name} - {language.country}
        </option>
      )
    }
  })
  return (renderList)
}
