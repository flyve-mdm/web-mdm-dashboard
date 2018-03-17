import EmptyMessage from '../../components/EmptyMessage'
import FilesAdd from './components/FilesAdd'
import FilesEdit from './components/FilesEdit'
import FilesContent from './components/FilesContent'

const routes = [
    {
        path: '/',
        name: 'No selected',
        component: EmptyMessage,
        exact: true
    },
    {
        path: '/add',
        name: 'Add',
        component: FilesAdd,
        exact: true
    },
    {
        path: '/edit',
        name: 'Edit',
        component: FilesEdit,
        exact: true
    },
    {
        path: '/:id/edit',
        name: 'Edit one',
        component: FilesEdit,
        exact: true
    },
    {
        path: '/:id',
        name: 'Selected',
        component: FilesContent,
        exact: false
    }
]

export default routes