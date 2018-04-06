import React, { Component } from 'react'
import handleError from '../../shared/handleError'

/**
 * 
 * @param { React Component } WrappedComponent 
 * 
 */

const withHandleError = (WrappedComponent) => {
    class HandleError extends Component {

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    HandleError.defaultProps = {
        handleError: handleError
    }

    return HandleError
}

export default withHandleError