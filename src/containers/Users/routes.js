import EmptyMessage from '../../components/EmptyMessage'
import UsersContent from './components/UsersContent'
import UsersEditOne from './components/UsersEditOne'
import UsersEdit from './components/UsersEdit'

const routes = [
  {
    path: '/',
    name: 'No selected',
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