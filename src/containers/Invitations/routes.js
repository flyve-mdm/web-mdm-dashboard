import EmptyMessage from '../../components/EmptyMessage'
import InvitationsPendingPage from './components/InvitationsPendingPage'
import Enroll from '../Devices/components/Enroll'
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
    component: Enroll,
    exact: true
  },
  {
    path: '/:id',
    name: 'Selected',
    component: InvitationsPendingPage,
    exact: true
  }
]

export default routes