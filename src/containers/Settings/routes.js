import EmptyMessage from '../../components/EmptyMessage'
import Entity from './components/Entity'
import Profiles from './components/Profiles'
import Supervision from './components/Supervision'
import Security from './components/Security'
import Notifications from './components/Notifications'
import Display from './components/Display'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/entity',
    name: I18n.t('commons.entity'),
    component: Entity,
    exact: true
  },
  {
    path: '/profiles',
    name: I18n.t('commons.profiles'),
    component: Profiles,
    exact: false
  },
  {
    path: '/supervision',
    name: I18n.t('commons.supervision'),
    component: Supervision,
    exact: false
  },
  {
    path: '/security',
    name: I18n.t('commons.security'),
    component: Security,
    exact: false
  },
  {
    path: '/notifications',
    name: I18n.t('commons.notifications'),
    component: Notifications,
    exact: false
  },
  {
    path: '/display',
    name: I18n.t('commons.display'),
    component: Display,
    exact: false
  }
]

export default routes