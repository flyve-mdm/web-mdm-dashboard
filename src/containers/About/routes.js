import { I18n } from 'react-i18nify'
import EmptyMessage from '../../components/EmptyMessage'
import Overview from './components/Overview/'
import SystemInformation from './components/SystemInformation/'
import HelpCenter from './components/HelpCenter/'
import Contact from './components/Contact/'
import ReleaseNotes from './components/ReleaseNotes'
import TermsOfUse from './components/TermsOfUse'
import Licence from './components/License'

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/`,
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/overview`,
    name: I18n.t('about.overview.title'),
    component: Overview,
    exact: true
  },
  {
    path: `${process.env.PUBLIC_URL}/system`,
    name: I18n.t('about.system_information.title'),
    component: SystemInformation,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/help`,
    name: I18n.t('about.help_center.title'),
    component: HelpCenter,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/contact`,
    name: I18n.t('about.contact.title'),
    component: Contact,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/release`,
    name: I18n.t('about.release_notes.title'),
    component: ReleaseNotes,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/term`,
    name: I18n.t('about.term_of_use.title'),
    component: TermsOfUse,
    exact: false
  },
  {
    path: `${process.env.PUBLIC_URL}/license`,
    name: I18n.t('about.license.title'),
    component: Licence,
    exact: false
  }
]

export default routes