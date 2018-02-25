import withAsyncComponent from "../../../hoc/withAsyncComponent"

const asyncAdminDashboard = withAsyncComponent(() => {
  return import('../../../containers/AdminDashboard')
})

export default asyncAdminDashboard