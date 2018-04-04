import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/`,
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/:id`,
    name: I18n.t('commons.fleet'),
    component: FleetsContent,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/add`,
    name: I18n.t('fleets.add'),
    component: FleetsContent,
    exact: false
  }
]

export default routes