import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import glpi from '../../shared/glpiApi'

/**
 * Wrapper component to pass to the props the glpi object
 * @param { component } WrappedComponent - Component to wrap 
 */
const withGLPI = (WrappedComponent) => {
  class GLPIClient extends PureComponent {
    render () { 
      return <WrappedComponent glpi={glpi} {...this.props} /> 
    }
  }
  return withRouter(GLPIClient)
}

export default withGLPI