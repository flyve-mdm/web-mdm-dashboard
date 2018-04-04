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
    name: I18n.t('commons.add'),
    component: ApplicationsAdd,
    exact: true
  },
  {
    path: '/edit',
    name: I18n.t('commons.edit'),
    component: ApplicationsEdit,
    exact: true
  },
  {
    path: '/:id/edit',
    name: I18n.t('commons.edit_one'),
    component: ApplicationsEdit,
    exact: true
  },
  {
    path: '/:id',
    name: I18n.t('commons.edit_one'),
    component: DevicesContent,
    exact: true
  }
]

export default routes