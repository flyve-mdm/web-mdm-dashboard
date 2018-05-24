import { I18n } from "react-i18nify"
import logout from '../logout'

export default ({type='info', message, title}) => {
    let response = {
        type: type,
        title: (title || I18n.t(`commons.${(type !== 'alert') ? type : 'error'}`)),
        body: message ? (typeof message === 'string' || message instanceof String) ? message : message.statusText : ''
    }
    if (message) {
        switch (true) {
            case (message.status === 0):
                response.body = I18n.t('notifications.no_internet_connection')
                break
            case (message.status === 401):
                response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
                if (message.data[0][1] === 'session_token seems invalid') {
                    logout()
                }
                break
            case (message.status === 404):
                response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
                break
            case (message.status >= 400 && message.status < 500 && message.status !== 401):
                response.body = message.data[0][1] ? Array.isArray(message.data[1]) ? message.data[1][0].message : message.data[0][1] : message.statusText
                break
            default:
                break
        }
    }
    return response
}