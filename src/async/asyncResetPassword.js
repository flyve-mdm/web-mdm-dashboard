import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncResetPassword = withAsyncComponent(() => {
    return import('../containers/ResetPassword')
})

export default asyncResetPassword
