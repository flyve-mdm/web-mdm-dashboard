import EmptyMessage from '../../components/EmptyMessage'
import UsersContent from './components/UsersContent'
import UsersEditOne from './components/UsersEditOne'
import UsersEdit from './components/UsersEdit'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/`,
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/edit`,
    name: I18n.t('commons.edit'),
    component: UsersEdit,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/:id/edit`,
    name: I18n.t('commons.edit_one'),
    component: UsersEditOne,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/:id`,
    name: I18n.t('commons.selected'),
    component: UsersContent,
    exact: true
  }
]

export default routes