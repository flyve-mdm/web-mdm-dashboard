import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/DevicesContent'
import Enroll from './components/Enroll'
import DevicesEditOne from './components/DevicesEditOne'
import DevicesEdit from './components/DevicesEdit'
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
    component: Enroll,
    exact: true
  },
  {
    path: '/edit',
    name: I18n.t('commons.edit'),
    component: DevicesEdit,
    exact: true
  },
  {
    path: '/:id/edit',
    name: I18n.t('commons.edit_one'),
    component: DevicesEditOne,
    exact: true
  },
  {
    path: '/:id',
    name: I18n.t('commons.selected'),
    component: DevicesContent,
    exact: false
  }
]

export default routes