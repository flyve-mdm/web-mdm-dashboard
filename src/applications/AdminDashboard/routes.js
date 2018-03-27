import Dashboard from '../../containers/HomeDashboard'
import Devices from '../../containers/Devices'
import Invitations from '../../containers/Invitations'
import Files from '../../containers/Files'
import Applications from '../../containers/Applications'
import Users from '../../containers/Users'
import SearchEngine from '../../containers/SearchEngine'
import About from '../../containers/About'
import Settings from '../../containers/Settings'
import Fleets from '../../containers/Fleets'

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
    exact: false
  },
  {
    path: '/invitations',
    name: 'Invitations',
    component: Invitations,
    exact: false
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    exact: false
  },
  {
    path: '/fleets',
    name: 'Fleets',
    component: Fleets,
    exact: false
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
    exact: false
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    exact: false
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchEngine,
    exact: false
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
  }
]

export default routes