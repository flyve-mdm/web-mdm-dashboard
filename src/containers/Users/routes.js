import EmptyMessage from '../../components/EmptyMessage'
import UsersContent from './components/UsersContent'
import UsersEditOne from './components/UsersEditOne'
import UsersEdit from './components/UsersEdit'
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
    name: 'Edit',
    component: UsersEdit,
    exact: true
  },
  {
    path: '/:id/edit',
    name: 'Edit one',
    component: UsersEditOne,
    exact: true
  },
  {
    path: '/:id',
    name: 'Selected',
    component: UsersContent,
    exact: true
  }
]

export default routes