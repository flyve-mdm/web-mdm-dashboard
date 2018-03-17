import EmptyMessage from '../../components/EmptyMessage'
import FilesAdd from './components/FilesAdd'
import FilesEdit from './components/FilesEdit'

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
    }
]

export default routes