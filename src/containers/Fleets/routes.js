import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'
import DevicesAssociated from './components/DevicesAssociated'
import FleetsEdit from './components/FleetsEdit'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/edit',
    name: I18n.t('fleets.edit'),
    component: FleetsEdit,
    exact: true
  },
  {
    path: '/:id',
    name: I18n.t('commons.fleet'),
    component: FleetsContent,
    exact: true
  },
  {
    path: '/:id/list',
    name: I18n.t('commons.list'),
    component: DevicesAssociated,
    exact: true
  },
  {
    path: '/add',
    name: I18n.t('fleets.add'),
    component: FleetsContent,
    exact: true
  }
]

export default routes