import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncValidateAccount = withAsyncComponent(() => {
  return import('../components/ValidateAccount')
})

export default asyncValidateAccount