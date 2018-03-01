import Dashboard from '../../containers/HomeDashboard'
import About from '../../containers/About'
import Settings from '../../containers/Settings'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    exact: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    exact: false
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    exact: false
  }
]

export default routes