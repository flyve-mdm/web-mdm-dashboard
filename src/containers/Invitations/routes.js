import EmptyMessage from '../../components/EmptyMessage'
import InvitationsPendingPage from './components/InvitationsPendingPage'
import Enroll from '../Devices/components/Enroll'

const routes = [
  {
    path: '/',
    name: 'No selected',
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