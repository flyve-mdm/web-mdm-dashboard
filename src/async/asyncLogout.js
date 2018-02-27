import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncLogout = withAsyncComponent(() => {
  return import('../containers/Logout')
})

export default asyncLogout