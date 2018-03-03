import React, { Component } from 'react'
import { withRouter } from 'react-router'
import glpi from '../../shared/glpiApi'

/**
 * 
 * @param { React Component } WrappedComponent 
 * @param { Object with method and parameters strings} fetch 
 */
const withGLPI = (WrappedComponent, fetch) => {
  class GLPIClient extends Component {
    constructor (props) {
      super(props)

      this.state = {
          data: null
      }
    }

    componentDidMount() {
      if (typeof(fetch) === 'object') {
        // TODO: Si GLPI Tiene el metodo dentro de fetch.method
        // TODO: Llamarlo usando los parametros de fetch.parameters
      }
    }

    render () { 
      return <WrappedComponent {...this.props} /> 
    }
  }

  GLPIClient.defaultProps = {
    glpi: glpi
  }

  return GLPIClient;
}



export default withGLPI