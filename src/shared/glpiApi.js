import Glpi from '@glpi-project/javascript-library-glpi'
import appConfig from '../../public/config.json'

let glpi = new Glpi({ url: appConfig.glpiApiLink })
glpi.sessionToken = localStorage.getItem('sessionToken')

export default glpi