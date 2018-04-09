import React, { Component } from 'react'

const withAsyncComponent = importComponent => {
  return class AsyncComponent extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default})
        })
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null
    }
  }
}

export default withAsyncComponent