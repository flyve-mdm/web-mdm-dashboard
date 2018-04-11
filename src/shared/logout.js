import history from './history'
import glpi from './glpiApi'
import publicURL from './publicURL'

export default () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    if (glpi.sessionToken) {
        glpi.killSession()
    }
    history.push(`${publicURL}/`)
}