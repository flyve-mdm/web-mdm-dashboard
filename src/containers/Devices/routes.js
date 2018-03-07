import EmptyMessage from '../../components/EmptyMessage'
import DevicesContent from './components/DevicesContent'

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
  }
]

export default routes