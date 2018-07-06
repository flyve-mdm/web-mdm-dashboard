import React from 'react'
import { NotificationsConsumer } from '../../providers/NotificationsProvider'

const withNotification = (WrappedComponent) => {
  const notification = props => (
    <NotificationsConsumer>
      {value => <WrappedComponent {...props} toast={value.toast} />}
    </NotificationsConsumer>
  )

  return notification
}

export default withNotification
