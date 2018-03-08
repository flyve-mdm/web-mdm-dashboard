import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/DevicesContent'
import Enroll from './components/Enroll'

const routes = [
  {
    path: '/',
    name: 'No selected',
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/:id',
    name: 'Selected',
    component: DevicesContent,
    exact: false
  },
  {
    path: '/add',
    name: 'Add',
    component: Enroll,
    exact: false
  }
]

export default routes