import Dashboard from '../../containers/HomeDashboard'
import Devices from '../../containers/Devices'
import Invitations from '../../containers/Invitations'
import Files from '../../containers/Files'
import Applications from '../../containers/Applications'
import Users from '../../containers/Users'
import SearchEngine from '../../containers/SearchEngine'
import About from '../../containers/About'
import Settings from '../../containers/Settings'
import Fleets from '../../containers/Fleets'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.home'),
    component: Dashboard,
    exact: true
  },
  {
    path: '/devices',
    name: I18n.t('commons.devices'),
    component: Devices,
    exact: false
  },
  {
    path: '/invitations',
    name: I18n.t('commons.invitations'),
    component: Invitations,
    exact: false
  },
  {
    path: '/files',
    name: I18n.t('commons.files'),
    component: Files,
    exact: false
  },
  {
    path: '/fleets',
    name: I18n.t('commons.fleets'),
    component: Fleets,
    exact: false
  },
  {
    path: '/applications',
    name: I18n.t('commons.applications'),
    component: Applications,
    exact: false
  },
  {
    path: '/users',
    name: I18n.t('commons.users'),
    component: Users,
    exact: false
  },
  {
    path: '/search',
    name: I18n.t('commons.search'),
    component: SearchEngine,
    exact: false
  },
  {
    path: '/about',
    name: I18n.t('commons.about'),
    component: About,
    exact: false
  },
  {
    path: '/settings',
    name: I18n.t('commons.settings'),
    component: Settings,
    exact: false
  }
]

export default routes