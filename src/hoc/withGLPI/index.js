import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import glpi from '../../shared/glpiApi'

/**
 * 
 * @param { React Component } WrappedComponent 
 * @param { Object with method and parameters strings} fetch 
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