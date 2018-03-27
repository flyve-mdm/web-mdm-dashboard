import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/ApplicationsContent'
import ApplicationsAdd from './components/ApplicationsAdd'
import ApplicationsEdit from './components/ApplicationsEdit'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/add',
    name: 'Add',
    component: ApplicationsAdd,
    exact: true
  },
  {
    path: '/edit',
    name: 'Edit',
    component: ApplicationsEdit,
    exact: true
  },
  {
    path: '/:id/edit',
    name: 'Edit one',
    component: ApplicationsEdit,
    exact: true
  },
  {
    path: '/:id',
    name: 'Selected',
    component: DevicesContent,
    exact: true
  }
]

export default routes