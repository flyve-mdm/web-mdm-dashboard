import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/DevicesContent'
import Enroll from './components/Enroll'
import DevicesEditOne from './components/DevicesEditOne'
import DevicesEdit from './components/DevicesEdit'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/`,
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/add`,
    name: I18n.t('commons.add'),
    component: Enroll,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/edit`,
    name: I18n.t('commons.edit'),
    component: DevicesEdit,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/:id/edit`,
    name: I18n.t('commons.edit_one'),
    component: DevicesEditOne,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/:id`,
    name: I18n.t('commons.selected'),
    component: DevicesContent,
    exact: false
  }
]

export default routes