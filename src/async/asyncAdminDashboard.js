import withAsyncComponent from '../hoc/withAsyncComponent';

const asyncAdminDashboard = withAsyncComponent(() => {
  return import('../applications/AdminDashboard')
})

export default asyncAdminDashboard