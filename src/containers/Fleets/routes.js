import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/:id',
    name: 'Fleet',
    component: FleetsContent,
    exact: false
  },
  {
    path: '/add',
    name: 'Add Fleet',
    component: FleetsContent,
    exact: false
  }
]

export default routes