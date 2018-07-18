import React from 'react'
import { AuthenticationConsumer } from '../../providers/AuthenticationProvider'

export default (WrappedComponent) => {
  const authentication = props => (
    <AuthenticationConsumer>
      {value => (
        <WrappedComponent
          {...props}
          {...value}
        />
      )}
    </AuthenticationConsumer>
  )

  return authentication
}
