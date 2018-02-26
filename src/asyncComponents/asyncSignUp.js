import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncSignUp = withAsyncComponent(() => {
  return import('../containers/SignUp')
})

export default asyncSignUp