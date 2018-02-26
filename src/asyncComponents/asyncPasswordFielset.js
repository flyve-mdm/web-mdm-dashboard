import withAsyncComponent from '../hoc/withAsyncComponent'

const asyncPasswordFieldset = withAsyncComponent(() => {
  return import('../containers/SignIn/components/PasswordFieldset.js')
})

export default asyncPasswordFieldset