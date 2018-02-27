import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncForgotPassword = withAsyncComponent(() => {
  return import('../containers/ForgotPassword')
})

export default asyncForgotPassword