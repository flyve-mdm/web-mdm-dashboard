import EmptyMessage from '../../components/EmptyMessage'
import InvitationsPendingPage from './components/InvitationsPendingPage'
import Enroll from '../Devices/components/Enroll'
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
    path: `${process.env.PUBLIC_URL}/:id`,
    name: I18n.t('commons.selected'),
    component: InvitationsPendingPage,
    exact: true
  }
]

export default routes