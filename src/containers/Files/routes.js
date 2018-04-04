import EmptyMessage from '../../components/EmptyMessage'
import FilesAdd from './components/FilesAdd'
import FilesEdit from './components/FilesEdit'
import FilesContent from './components/FilesContent'
import { I18n } from 'react-i18nify'

const routes = [
    {
        path: `${process.env.PUBLIC_URL}/`,
        name: I18n.t('commons.no_selection'),
        component: EmptyMessage,
        exact: true
    },
    {
        path: `${process.env.PUBLIC_URL}/add`,
        name: I18n.t('commons.add'),
        component: FilesAdd,
        exact: true
    },
    {
        path: `${process.env.PUBLIC_URL}/edit`,
        name: I18n.t('commons.edit'),
        component: FilesEdit,
        exact: true
    },
    {
        path: `${process.env.PUBLIC_URL}/:id/edit`,
        name: I18n.t('commons.edit_one'),
        component: FilesEdit,
        exact: true
    },
    {
        path: `${process.env.PUBLIC_URL}/:id`,
        name: I18n.t('commons.selected'),
        component: FilesContent,
        exact: false
    }
]

export default routes