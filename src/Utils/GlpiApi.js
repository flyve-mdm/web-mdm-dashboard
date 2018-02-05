import Glpi from '@teclib/glpi-api-client'
import config from '../config.json'

let glpi = new Glpi({ url: config.URL_GLPI_API })
glpi.sessionToken = localStorage.getItem('sessionToken')

export default glpi