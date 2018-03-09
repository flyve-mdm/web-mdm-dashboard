import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/DevicesContent'
import Enroll from './components/Enroll'
import DevicesEditOne from './components/DevicesEditOne'

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
    path: '/:id/edit',
    name: 'EditOne',
    component: DevicesEditOne,
    exact: true
  },
  {
    path: '/:id',
    name: 'Selected',
    component: DevicesContent,
    exact: false
  }
]

export default routes