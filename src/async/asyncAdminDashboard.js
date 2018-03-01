import withAsyncComponent from '../hoc/withAsyncComponent';

const asyncAdminDashboard = withAsyncComponent(() => {
  return import('../applications/AdminDashboardApp')
})

export default asyncAdminDashboard