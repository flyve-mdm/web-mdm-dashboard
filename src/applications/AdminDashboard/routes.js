import Dashboard from '../../containers/HomeDashboard'
import Devices from '../../containers/Devices'
import Invitations from '../../containers/Invitations'
import Files from '../../containers/Files'
import Applications from '../../containers/Applications'
import Users from '../../containers/Users'
import About from '../../containers/About'
import Settings from '../../containers/Settings'
import Devices from '../../containers/Devices'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    exact: true
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices,
    exact: true
  },
  {
    path: '/invitations',
    name: 'Invitations',
    component: Invitations,
    exact: true
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    exact: true
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
    exact: true
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    exact: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    exact: false
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings,
    exact: false
  },
  {
    path: '/Devices',
    name: 'Devices',
    component: Devices,
    exact: false
  }
]

export default routes