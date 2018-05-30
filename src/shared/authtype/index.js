import { I18n } from 'react-i18nify'

const authtype = id => {
    switch (id) {
        case 1:
            return I18n.t('authtype.glpi_internal_database')
        case 2:
            return I18n.t('authtype.mail_server')
        case 3:
            return I18n.t('authtype.ldap_directory')
        case 4:
            return I18n.t('authtype.other')
        case 5:
            return I18n.t('authtype.cas')
        case 6:
            return I18n.t('authtype.certificate_authentication')
        case 7:
            return I18n.t('authtype.api')
        case 8:
            return I18n.t('authtype.cookie')
        case 0:
            return I18n.t('authtype.not_yet_authenticated')
        default:
            return I18n.t('commons.not_available')
    }
}


export default authtype