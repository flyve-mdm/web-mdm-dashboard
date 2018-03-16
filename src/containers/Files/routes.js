import EmptyMessage from '../../components/EmptyMessage'
import FilesAdd from './components/FilesAdd'

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
]

export default routes