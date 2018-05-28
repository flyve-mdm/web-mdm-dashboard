import glpi from '../glpiApi'
import { setCookie } from '../cookies'

export default async (callback) => {
    const cookies = document.cookie.split(';')
    let glpiCookieName
    for (let index = 0; index < cookies.length; index++) {
        if(cookies[index].indexOf("glpi_") !== -1) {
            glpiCookieName = cookies[index].split("=")[0]
        }
    }
    setCookie (glpiCookieName, glpi.sessionToken)
    if (callback) callback()
    return ({[glpiCookieName]: glpi.sessionToken})
}
