import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import glpi from '../../shared/glpiApi'

/**
 * 
 * @param { React Component } WrappedComponent 
 * @param { Object with method and parameters strings} fetch 
 */
const withGLPI = (WrappedComponent, fetch) => {
  class GLPIClient extends PureComponent {
    constructor (props) {
      super(props);

      this.state = {
          data: null
      }
    }

    componentDidMount() {
        if (typeof(fetch) !== 'object') {

        }
    }

    render () { 
      return <WrappedComponent {...this.props} /> 
    }
  }

  GLPIClient.defaultProps = {
    glpi: glpi
  }

  return withRouter(GLPIClient)
}



export default withGLPI