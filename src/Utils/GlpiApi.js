import Glpi from '@glpi-project/javascript-library-glpi'
import config from '../config.json'

let glpi = new Glpi({ url: config.URL_GLPI_API })
glpi.sessionToken = localStorage.getItem('sessionToken')

export default glpi