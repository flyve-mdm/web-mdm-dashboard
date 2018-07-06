import React from 'react'
import { I18nConsumer } from '../../providers/I18nProvider'

export default (WrappedComponent) => {
  const i18n = props => (
    <I18nConsumer>
      {value =>
        (<WrappedComponent
          {...props}
          {...value}
        />)}
    </I18nConsumer>
  )

  return i18n
}
