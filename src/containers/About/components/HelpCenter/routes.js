import HelpCenterArticle from './HelpCenterArticle'
import HelpCenterList from './HelpCenterList'
import Feedback from './Feedback'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('about.help_center.home'),
    component: HelpCenterList,
    exact: true
  },
  {
    path: '/feedback',
    name: I18n.t('commons.feedback'),
    component: Feedback,
    exact: true
  },
  {
    path: '/:article',
    name: I18n.t('commons.article'),
    component: HelpCenterArticle,
    exact: false
  }
]

export default routes