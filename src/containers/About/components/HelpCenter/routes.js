import HelpCenterArticle from './HelpCenterArticle'
import HelpCenterList from './HelpCenterList'
import Feedback from './Feedback'

const routes = [
  {
    path: '/',
    name: 'Help Center Home',
    component: HelpCenterList,
    exact: true
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    exact: true
  },
  {
    path: '/:article',
    name: 'Article',
    component: HelpCenterArticle,
    exact: false
  }
]

export default routes