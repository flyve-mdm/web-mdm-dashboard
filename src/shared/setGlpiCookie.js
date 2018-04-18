import glpi from './glpiApi'
import { setCookie } from './cookies'

export default async () => {
    const cookies = document.cookie.split(';')
    let glpiCookieName = undefined
    for (let index = 0; index < cookies.length; index++) {
        if(cookies[index].indexOf("glpi_") !== -1) {
            glpiCookieName = cookies[index].split("=")[0]
        }
    }
    setCookie(glpiCookieName, glpi.sessionToken)
}
